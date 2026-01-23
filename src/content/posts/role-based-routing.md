---
title: 'React Router 기반 역할별 동적 라우팅 시스템 구축'
description: '역할별로 다른 메뉴 구조를 가진 Admin 시스템에서 라우트 정의와 사이드바 메뉴를 일원화하고, 중첩 라우트 평탄화를 통해 유지보수가 용이한 동적 라우팅 시스템을 구축한 과정'
date: '2025-04-20'
lastModified: '2025-04-20'
category: 'development'
tags: ['React', 'React Router', 'TypeScript', 'Admin', 'RBAC']
---

Admin 시스템을 개발하다 보면 사용자 역할에 따라 접근 가능한 페이지를 다르게 구성해야 하는 경우가 많다. 단순히 특정 페이지의 접근을 막는 수준이 아니라, 역할별로 상당히 다른 메뉴 구조와 기능을 제공해야 할 때도 있다.

현재 개발 중인 Admin 시스템이 그런 경우였다. 세 가지 역할이 존재하고, 각 역할은 고유한 메뉴를 가지면서도 일부 메뉴는 공유하는 구조다. A 역할은 콘텐츠 생성과 주문을, B 역할은 문서 관리를, C 역할은 주문 내역 조회를 담당하는데, 주문 관련 메뉴는 A와 C가 함께 사용하는 식이다.

이런 구조에서 라우팅을 어떻게 설계해야 유지보수가 쉽고 확장 가능한 시스템을 만들 수 있을지 고민이 필요했다. React Router 기반으로 역할별 동적 라우팅 시스템을 구축하면서 적용했던 방법들을 기록해보려 한다.

## 해결해야 할 문제

### 역할마다 다른 접근 권한

가장 먼저 고려해야 했던 건 역할별 접근 권한이었다. 로그인한 사용자의 역할에 따라 볼 수 있는 페이지가 달라야 하고, 권한이 없는 페이지에 URL로 직접 접근하면 적절히 처리해야 한다. 단순히 조건문으로 분기하는 방식은 역할이 늘어날수록 복잡해질 게 뻔했다.

### 라우트와 사이드바 메뉴의 동기화

라우트 정의와 사이드바 메뉴를 별도로 관리하면 동기화 문제가 생긴다. 새 페이지를 추가할 때 라우트도 등록하고, 사이드바 메뉴 배열에도 추가하고, 역할별 접근 권한도 따로 설정해야 한다. 수정해야 할 곳이 분산되면 실수할 여지가 늘어난다. 한쪽만 수정하고 다른 쪽을 빠뜨리는 경우가 생기기 쉽다.

### 확장성

당장은 세 가지 역할이지만, 새로운 역할이 추가될 가능성도 열어둬야 했다. 역할이 추가될 때마다 여러 파일을 수정해야 한다면 유지보수 비용이 계속 늘어난다. 가능하면 한 곳만 수정하면 나머지가 따라오는 구조가 필요했다.

## 설계 방향

앞서 정리한 문제들을 해결하기 위해 세 가지 방향을 잡았다.

### 역할별 라우트 독립 관리

각 역할의 라우트를 별도 파일로 분리한다. 역할 간 의존성을 없애고, 특정 역할의 라우트를 수정할 때 다른 역할에 영향을 주지 않도록 한다.

### 라우트 정의 일원화

라우트를 정의할 때 경로와 컴포넌트뿐 아니라 사이드바 메뉴 정보(메뉴명, 아이콘 등)까지 함께 선언한다. 이렇게 하면 라우트 정의 하나만 수정해도 라우터와 사이드바 메뉴가 동시에 반영된다.

### 런타임 동적 라우트 구성

로그인 시점에 사용자의 역할을 확인하고, 해당 역할에 맞는 라우트만 동적으로 구성한다. 권한이 없는 라우트는 아예 등록되지 않기 때문에 별도의 접근 제어 로직을 최소화할 수 있다.

## 구현: 역할 기반 동적 라우팅

### Route 타입 정의

먼저 라우트 객체의 타입을 정의했다. React Router의 `RouteObject`를 확장해서 사이드바 메뉴에 필요한 정보를 담을 수 있는 `handle` 속성을 추가했다.

```tsx
import { ReactNode } from 'react';
import { RouteObject } from 'react-router-dom';

export type Route = RouteObject & {
  path?: string;
  handle?: {
    label?: string;      // 사이드바에 표시될 메뉴명
    iconName?: string;   // 메뉴 아이콘 이름
  };
  element?: ReactNode;
  children?: Route[];
};
```

handle 속성이 있는 라우트만 사이드바 메뉴에 표시된다. 상세 페이지나 생성 페이지처럼 페이지는 존재하지만 메뉴에는 노출하고 싶지 않은 경우 handle을 생략하면 된다.

### 역할별 라우트 정의

각 역할의 라우트는 별도 파일에서 관리한다. 예를 들어 A 역할의 라우트는 다음과 같이 정의한다.

```tsx
export const roleARoutes: Route[] = [
  {
    path: 'content',
    handle: { label: '콘텐츠 관리', iconName: 'Document' },
    element: <ContentManagePage />,
    children: [
      {
        path: 'create',
        element: <ContentCreatePage />,  // handle 없음 → 메뉴에 미노출
      },
      {
        path: ':id',
        element: <ContentDetailPage />,
      },
    ],
  },
  {
    path: 'order',
    handle: { label: '주문 관리', iconName: 'Order' },
    element: <OrderManagePage />,
  },
];
```

### 역할별 라우트 맵

정의한 라우트들을 역할별로 매핑하는 객체를 만든다.

```tsx
import { roleARoutes } from '@/admin/roleA/routes';
import { roleBRoutes } from '@/admin/roleB/routes';
import { roleCRoutes } from '@/admin/roleC/routes';

export const ROLE_ROUTE_MAP = {
  roleA: roleARoutes,
  roleB: roleBRoutes,
  roleC: roleCRoutes,
};
```

새 역할이 추가되면 라우트 파일을 만들고 이 맵에 한 줄만 추가하면 된다.

### 중첩 라우트 평탄화

라우트를 중첩 구조로 정의하면 코드의 가독성도 좋아지고, 사이드바에서 관련 메뉴들을 그룹으로 묶어 표시할 수 있다. 예를 들어 `content` 하위의 메뉴들은 하나의 그룹으로 묶이고, 구분선 아래에 `order` 관련 메뉴들이 또 다른 그룹으로 표시되는 식이다.

다만 React Router에 등록할 때는 평탄화된 경로가 필요하다. 이를 위한 유틸 함수를 만들었다.

```tsx
/**
 * 중첩된 라우트 배열을 평탄화하여 단일 레벨 배열로 변환
 * @example
 * [{ path: 'a', children: [{ path: 'b' }] }] → [{ path: 'a' }, { path: 'a/b' }]
 */
export const flattenNestedRoutes = (
  routes: Route[],
  parentPath = ''
): Route[] => {
  const result: Route[] = [];

  routes.forEach((route) => {
    // 부모 경로가 있으면 결합하여 전체 경로 생성
    const fullPath = parentPath ? `${parentPath}/${route.path}` : route.path;

// element가 있는 라우트만 결과에 포함 (카테고리용 래퍼 라우트 제외)
    if (route.element) {
      result.push({
        ...route,
        path: fullPath,
      });
    }

    // 자식 라우트가 있으면 재귀적으로 평탄화
    if (route.children) {
      result.push(...flattenNestedRoutes(route.children, fullPath));
    }
  });

  return result;
};
```

이 함수를 거치면 중첩 구조가 다음과 같이 변환된다.

```tsx
// 변환 전
[
  {
    path: 'content',
    children: [
      { path: 'create', element: <ContentCreatePage /> },
      { path: ':id', element: <ContentDetailPage /> }
    ]
  }
]

// 변환 후
[
  { path: 'content/create', element: <ContentCreatePage /> },
  { path: 'content/:id', element: <ContentDetailPage /> }
]
```

### 동적 라우트 생성

마지막으로 로그인한 사용자의 역할에 따라 라우트를 동적으로 구성하는 컴포넌트다.

```tsx
export default function AdminRoutes() {
  const { role } = useAuth();

  const routes: Route[] = useMemo(() => {
    // 인증되지 않은 사용자는 로그인 페이지만 접근 가능
    if (!role) {
      return [{ path: 'login', element: <LoginPage /> }];
    }

    // 현재 역할에 해당하는 라우트를 평탄화하여 가져옴
    const flattenRoutes = getFlattenedRoutesByRole(role);

    return [
      { path: 'login', element: <LoginPage /> },
      {
        path: '/',
        element: (
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        ),
        children: [
          // 역할별 라우트를 동적으로 생성
          ...flattenRoutes.map(({ path, element }) => ({ path, element })),
          { path: '*', element: <NotFoundPage /> },
        ],
      },
    ];
  }, [role]);

  return useRoutes(routes);
}
```

`role`이 변경될 때만 라우트를 재계산하도록 `useMemo`로 감싸고, `react-router-dom`의 `useRoutes` 훅으로 라우트 객체를 렌더링한다.

라우트 정의에 메뉴 정보까지 포함했으니, 이를 기반으로 사이드바 메뉴를 자동 생성하는 로직이 필요하다.

## 구현: 라우트 기반 사이드바 메뉴 생성

### 메뉴로 표시할 라우트 필터링

평탄화된 라우트 중에서 `handle` 속성이 있는 것만 사이드바에 표시한다.

```tsx
export const filterRoutesWithHandle = (routes: Route[]) => {
  return routes.filter((route) => route.handle);
};
```

상세 페이지나 생성 페이지처럼 메뉴에 노출할 필요 없는 라우트는 handle을 생략했기 때문에, 이 필터 하나로 메뉴용 라우트만 추려낼 수 있다.

### 경로 기반 메뉴 그룹화

사이드바 UI 시안을 보니 관련 메뉴들을 그룹으로 묶어서 표시해야 했다. 첫 번째 경로 세그먼트를 기준으로 그룹화하는 함수를 만들었다.

```tsx
/**
 * 라우트를 첫 번째 경로 세그먼트(basePath) 기준으로 그룹화
 * 사이드바에서 메뉴 카테고리별로 묶어서 표시할 때 사용
 * 
 * @example
 * ['content/create', 'content/:id', 'user/list']
 * → { content: [...], user: [...] }
 */
export const groupRoutesByBasePath = (routes: Route[]) => {
  const groups: { [key: string]: Route[] } = {};

  routes.forEach((route) => {
    const basePath = route.path?.split('/')[0] || '';
    if (!groups[basePath]) {
      groups[basePath] = [];
    }
    groups[basePath].push(route);
  });

  return groups;
};
```

이 함수를 거치면 다음과 같이 그룹화된다.

```tsx
// 입력
[
  { path: 'content', handle: { label: '콘텐츠 관리', ... } },
  { path: 'content/list', handle: { label: '콘텐츠 목록', ... } },
  { path: 'order', handle: { label: '주문 관리', ... } },
  { path: 'order/history', handle: { label: '주문 내역', ... } }
]

// 출력
{
  'content': [
    { path: 'content', handle: { label: '콘텐츠 관리', ... } },
    { path: 'content/list', handle: { label: '콘텐츠 목록', ... } }
  ],
  'order': [
    { path: 'order', handle: { label: '주문 관리', ... } },
    { path: 'order/history', handle: { label: '주문 내역', ... } }
  ]
}
```

### SideBar 컴포넌트

위에서 만든 유틸 함수들을 조합해서 사이드바를 렌더링한다.

```tsx
export default function SideBar() {
  const { role } = useAuth();

  // 1. 역할에 해당하는 라우트를 평탄화해서 가져온다
  const flattenRoutes = getFlattenedRoutesByRole(role);
  // 2. handle이 있는 라우트만 필터링한다
  const routesWithHandle = filterRoutesWithHandle(flattenRoutes);
  // 3. 첫 번째 경로 세그먼트 기준으로 그룹화한다
  const groupedRoutes = groupRoutesByBasePath(routesWithHandle);

  return (
    <nav>
      {/* 그룹별로 메뉴 렌더링 */}
      {Object.entries(groupedRoutes).map(([basePath, routes]) => (
        <div key={basePath} className="menu-group">
          {routes.map(({ path, handle }) => (
            // NavLink로 렌더링하여 현재 경로와 일치하면 active 스타일 적용
            <NavLink key={path} to={path} className="menu-item">
              {({ isActive }) => (
                <div className={isActive ? 'active' : ''}>
                  <Icon name={handle.iconName} />
                  <span>{handle.label}</span>
                </div>
              )}
            </NavLink>
          ))}
        </div>
      ))}
    </nav>
  );
}
```

`react-rotuer-dom`의 `NavLink`를 사용하면 현재 활성화된 메뉴를 쉽게 구분할 수 있다. `isActive` 값에 따라 스타일을 다르게 적용하면 된다.

### 흐름 정리

전체 흐름을 정리하면 다음과 같다.

 ![](/images/posts/role-based-routing/flow-chart.webp)

라우트 정의 한 곳만 수정하면 라우터와 사이드바 메뉴가 동시에 반영되는 구조가 완성됐다.

## 마치며

이 구조를 적용한 뒤 실제로 새로운 역할이 추가되는 상황이 있었다. 라우트 파일 하나를 만들고 `ROLE_ROUTE_MAP`에 한 줄 추가하는 것만으로 작업이 끝났다. 기존이라면 라우터 설정, 사이드바 메뉴 배열, 접근 권한 로직을 각각 수정해야 했을 텐데, 수정 포인트가 한 곳으로 모이니 작업 시간도 줄고 실수 여지도 줄었다.

다만 현재 구조에서는 역할 간 공유되는 라우트가 각 파일에 중복 정의되어 있다. 지금은 공유 메뉴가 많지 않아 큰 문제가 없지만, 공유 라우트가 늘어나면 중복 코드가 부담이 될 수 있다. 그때는 공통 라우트를 별도 모듈로 분리하고 역할별로 조합하는 방식을 검토할 예정이다.