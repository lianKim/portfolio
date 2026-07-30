---
title: 'React Router 라우팅 재설계기'
description: '중첩 정의를 평탄화해 등록하던 라우팅을 재설계해, 정의를 변환 없이 그대로 등록하고 사이드바 메뉴와 접근 범위, 기본 진입 경로까지 하나의 정의에서 파생하는 구조를 별도 프로젝트로 검증한 과정'
date: '2026-07-19'
lastModified: '2026-07-19'
category: 'development'
tags: ['React', 'React Router', 'TypeScript', 'Admin', 'RBAC', 'Nested Routes']
---

## 이전 이야기

역할 기반 어드민의 라우팅을 단일 정의로 통합한 과정을 이전 글에서 다뤘다. 라우트 정의에 사이드바 메뉴 정보를 함께 선언하고, 라우터와 메뉴와 접근 가능 화면이 전부 그 정의에서 파생되는 구조다. 다만 그 구현에는 한 가지 변환이 있었다. 중첩으로 작성한 정의를 등록 시점에 평탄화해서 `useRoutes`에 넘겼다.

→ [이전 글: React Router 기반 역할별 동적 라우팅 시스템 구축]

처음부터 라우트 정의는 React Router의 관례와 같은 모양으로 쓰려고 했다. 그런데 구현을 다시 보면 이상한 왕복이 있다. 중첩으로 정의한 것을 등록 시점에 평탄화하고, 사이드바에서는 평탄해진 경로 문자열을 첫 세그먼트 기준으로 다시 그룹화한다. 계층을 부수고 다시 조립하는 셈이다. 돌아보면 사이드바가 메뉴를 만들기 위해 전체 경로 목록을 필요로 해서 평탄화 함수가 먼저 있었고, 라우터 등록까지 그 배열에 얹히면서 굳어진 구조였다.

이 왕복을 보면서 의문이 들었다. 평탄화 없이 중첩 정의를 그대로 등록할 수는 없을까. 이 글은 그 재설계를 별도 프로젝트로 검증한 기록이다. 왜 이 재설계가 필요했는지에 대한 판단은 따로 정리했고, 이 글은 구현 과정을 다룬다.

→ [설계 기록: 라우트, 메뉴, 권한을 따로 관리하지 않은 이유]

## 중첩 그대로 등록하면 어떻게 되는가

먼저 왜 평탄화가 있었는지부터 확인한다. 당시 정의 형태 그대로, 목록과 상세를 부모 자식으로 선언하고 중첩 그대로 등록해 보면 이렇게 된다.

```tsx
const routes = [
  {
    path: 'products',
    element: <ProductListPage />,          // 목록 화면
    children: [
      { path: ':productId', element: <ProductDetailPage /> }, // 상세 화면
    ],
  },
];
```

`/products`는 잘 나온다. 그런데 `/products/1`로 이동하면 화면에는 여전히 목록이 있다. 상세는 어디에도 그려지지 않는다.

React Router에서 자식 라우트의 `element`는 부모 컴포넌트가 렌더링하는 `Outlet` 안에 그려진다. `ProductListPage`는 `Outlet`을 가진 레이아웃이 아니라 일반 페이지 컴포넌트이기 때문에 상세가 그려질 자리 자체가 없는 것이다. 즉 React Router의 중첩은 URL의 계층만 뜻하지 않는다. 레이아웃의 중첩을 함께 뜻한다.

이전 구현의 평탄화는 이 결합을 우회하는 방법이었다. 중첩 정의를 순회해 전체 경로 문자열을 만들고, 모든 페이지를 형제로 등록한다.

```tsx
// 평탄화 후 등록되는 형태
[
  { path: 'products', element: <ProductListPage /> },
  { path: 'products/:productId', element: <ProductDetailPage /> },
]
```

동작한다. 개발 당시 공유해야 할 레이아웃은 전체를 감싸는 최상위 레이아웃 하나뿐이었기 때문에 문제도 없었다. 다만 이 구조에서는 어떤 화면 그룹도 따로 레이아웃을 가질 수 없다. 전부 형제이기 때문이다. 여러 화면이 레이아웃을 공유하는 요구는 언제든 생길 수 있어서, 요구가 생기기 전에 준비해둘 필요가 있다고 생각했다.

## element 없는 부모, index 라우트

React Router가 이미 가진 index 라우트를 활용하면 되겠다는 생각이 들었다. index 라우트는 부모 경로 자체의 화면을 맡는 자식이다.

```tsx
<Route index element={<ProductListPage />} />

// useRoutes 객체 표기로는
{ index: true, element: <ProductListPage /> }
```

여기에 규칙이 하나 더 있다. `element`가 없는 부모 라우트는 `Outlet`만 렌더링한다. 두 규칙을 합치면 목록과 상세를 이렇게 선언할 수 있다.

```tsx
{
  path: 'products',
  children: [
    { index: true, element: <ProductListPage /> },           // /products
    { path: ':productId', element: <ProductDetailPage /> },  // /products/1
  ],
}
```

바뀐 것은 하나다. 목록 화면이 부모의 `element`에서 index 자식으로 내려왔다. 부모는 화면을 갖지 않으므로 자식들이 각자 독립적으로 그려지고, 목록과 상세는 URL로는 부모 자식이지만 화면으로는 형제가 된다.

레이아웃 공유가 필요한 그룹은 부모에 `element`를 주면 된다.

```tsx
{
  path: 'settings',
  element: <SettingsLayout />,   // 탭 UI + <Outlet />
  children: [
    { index: true, element: <Navigate to="profile" replace /> },
    { path: 'profile', element: <SettingsProfilePage /> },
    { path: 'security', element: <SettingsSecurityPage /> },
  ],
}
```

독립적으로 그려지는 화면과 레이아웃을 공유하는 화면을 같은 방식으로 선언할 수 있다. 정의의 형태를 바꾸면 평탄화 자체가 필요 없어진다는 뜻이다.

## 중첩 그대로 등록하기

이 방향이 실무 규모의 요구들과 함께 성립하는지 별도 프로젝트로 검증했다. react-router-dom 7 기준이고, 인증은 세 가지 역할을 가진 목 인증으로 대신했다. 검증 범위는 라우팅 구조까지다. 전체 코드 → [admin-nested-routing-poc]

라우트 정의는 `RouteObject`를 확장한 타입으로 작성한다.

```ts
export type AppRoute = RouteObject & {
  handle?: { label?: string; iconName?: IconName };  // 사이드바 메뉴 정보
  disabled?: boolean;    // 사이드바에 준비 중으로 표시, 라우터에는 미등록
  isLanding?: boolean;   // 역할당 하나. 로그인 후 기본 진입 화면
  children?: AppRoute[];
};
```

등록은 변환 없이 스프레드로 끝난다.

```tsx
export default function AppRoutes() {
  const { role } = useAuth();

  const routes: AppRoute[] = useMemo(() => {
    if (!role) {
      return [
        { path: 'login', element: <LoginPage /> },
        { path: '*', element: <Navigate to="/login" replace /> },
      ];
    }

    return [
      { path: 'login', element: <Navigate to={DEFAULT_PATH_BY_ROLE[role]} replace /> },
      {
        path: '/',
        element: (
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <Navigate to={DEFAULT_PATH_BY_ROLE[role]} replace /> },
          ...excludeDisabledRoutes(ROLE_ROUTE_MAP[role]),  // 중첩 그대로
          { path: '*', element: <NotFoundPage /> },
        ],
      },
    ];
  }, [role]);

  return useAppRoutes(routes);
}
```

한 가지 TypeScript 마찰이 있었다. `RouteObject`는 `IndexRouteObject`와 `NonIndexRouteObject`의 판별 유니온이라, 확장 타입 배열을 `useRoutes`에 그대로 넘기면 구조적 호환 판정이 막힌다. 확장 타입이 `RouteObject`의 상위집합임은 보장되므로, 타입 단언을 얇은 래퍼 한 곳에 격리했다.

```ts
export const useAppRoutes = (routes: AppRoute[]) =>
  useRoutes(routes as RouteObject[]);
```

단언이 코드 곳곳에 흩어져 있으면 각각이 안전한지 따져 보기 어렵다. 두 타입이 만나는 함수 한 곳에만 두고 주석을 달아 설명을 남겼다.

## 사이드바 메뉴는 순회로 파생한다

이전 구현에서 사이드바 메뉴는 평탄화된 배열로 만들었다. 평탄화가 사라졌으니 이제 중첩 정의를 직접 순회해 만든다.

```ts
export const joinPath = (parentPath: string, path?: string) => {
  if (!path) return parentPath;
  return parentPath ? `${parentPath}/${path}` : `/${path}`;
};
```

```ts
export const buildSidebarMenuItems = (
  routes: AppRoute[],
  parentPath = ''
): SidebarMenuItem[] => {
  const items: SidebarMenuItem[] = [];

  routes.forEach((route) => {
    // index 라우트는 부모 경로를 그대로 쓴다
    const fullPath = route.index ? parentPath : joinPath(parentPath, route.path);

    if (route.handle?.label) {
      items.push({
        label: route.handle.label,
        iconName: route.handle.iconName,
        fullPath,
        disabled: route.disabled,
      });
    }

    if (route.children) {
      items.push(...buildSidebarMenuItems(route.children, fullPath));
    }
  });

  return items;
};
```

메뉴는 첫 경로 세그먼트 기준으로 그룹화하고, active 판정에는 규칙이 하나 필요했다. `/products/orders/9001`에 있을 때 상품 관리(`/products`)와 발주 내역(`/products/orders`)이 모두 현재 경로의 prefix라서, 둘 다 켜지는 문제가 있다. 현재 경로의 prefix인 메뉴들 중 가장 깊은 것 하나만 켜는 것으로 정리했다.

```ts
export const findActiveMenuPath = (items: SidebarMenuItem[], pathname: string) =>
  items
    .filter((item) => !item.disabled && isPathPrefix(item.fullPath, pathname))
    .reduce<string | null>(
      (deepest, item) =>
        !deepest || item.fullPath.length > deepest.length ? item.fullPath : deepest,
      null
    );
```

## 볼 수는 있지만 접근할 수는 없는 메뉴

준비 중인 기능은 사이드바에 보이되 접근은 막아야 한다는 요구사항이 있었다. 이전 구현에서 `disabled`는 사이드바 표시에만 관여했는데, 이번에는 라우터 등록 제외까지 한 속성이 담당하도록 일원화했다.

```ts
export const excludeDisabledRoutes = (routes: AppRoute[]): AppRoute[] =>
  routes
    .filter((route) => !route.disabled)
    .map((route) =>
      route.children
        ? { ...route, children: excludeDisabledRoutes(route.children) }
        : route
    );
```

사이드바에서는 준비 중으로 회색 표시되고, URL로 직접 진입하면 404가 나온다. 노출 정책과 접근 정책이 한 속성에서 파생된다.

## 기본 경로를 정의 안으로

로그인 직후 역할마다 이동할 첫 화면이 다르다. 남은 문제는 그 기본 경로를 어디에 정의해둘 것인가였다.

기본 경로를 상수로 두면 `/products` 같은 문자열이 라우트 정의와 별도로 관리된다. 라우트 경로를 바꾸면 기본 경로는 404를 가리키게 된다.

개발 단계에서 Claude Code가 두 가지를 제안했다. 하나는 dev 모드에서 기본 경로가 실제 라우트에 존재하는지 검사하는 가드를 두는 방법, 다른 하나는 경로 리터럴을 상수 파일로 빼서 라우트 정의와 기본 경로가 같은 상수를 참조하게 하는 방법이다.

둘 다 동작하는 안이었지만 기각했다. 두 안에는 공통 전제가 있다. 기본 경로가 라우트 정의 바깥에 존재한다는 것이다. 가드는 이중 관리를 감시하는 안이고 상수는 이중 관리를 정돈하는 안일 뿐, 출처가 둘이라는 점은 그대로다.

내가 원한 것은 출처를 하나로 만드는 것이었다. 기본 경로라는 정보 자체를 라우트 정의 안에 선언하고, 경로는 파생한다. 라우트 노드에 `isLanding`을 선언하면 트리를 순회해 그 노드의 누적 경로를 계산한다.

```ts
export const findLandingPath = (
  routes: AppRoute[],
  parentPath = ''
): string | null => {
  for (const route of routes) {
    const fullPath = route.index ? parentPath : joinPath(parentPath, route.path);

    if (route.isLanding) return fullPath;

    if (route.children) {
      const childLanding = findLandingPath(route.children, fullPath);
      if (childLanding) return childLanding;
    }
  }

  return null;
};
```

```ts
export const DEFAULT_PATH_BY_ROLE = Object.fromEntries(
  (Object.entries(ROLE_ROUTE_MAP) as [AdminRole, AppRoute[]][]).map(
    ([role, routes]) => [role, findLandingPath(routes) ?? '/']
  )
) as Record<AdminRole, string>;
```

경로 세그먼트를 리네임해도 기본 경로가 자동으로 따라오고, 정의와 어긋나지 않는다. 실제로 products를 catalog로 바꿔봤을 때, 라우트 정의의 `path` 하나만 고쳤는데 기본 화면 이동과 사이드바 링크가 함께 갱신됐다.

## 순수 함수 테스트

이 구조의 파생 로직들은 전부 입력과 출력만 있는 순수 함수다. 경로 누적, 메뉴 빌드, `disabled` 제외, landing 파생 어디에도 DOM이나 렌더링이 없다. 그래서 라우팅 코드인데도 브라우저 없이 테스트된다.

라우팅 구조 자체의 검증에는 React Router가 내보내는 `matchRoutes`를 썼다. 이것도 순수 함수라서, 파생된 기본 경로가 실제 라우트 트리에서 해석되는지를 DOM 없이 확인할 수 있다.

```ts
it('파생된 기본 경로는 실제 라우트로 해석된다', () => {
  const landing = findLandingPath(brandRoutes);
  expect(matchRoutes(brandRoutes as RouteObject[], landing!)).not.toBeNull();
});

it('역할마다 landing은 정확히 하나다', () => {
  Object.values(ROLE_ROUTE_MAP).forEach((routes) => {
    expect(countLandingNodes(routes)).toBe(1);
  });
});
```

두 번째 테스트가 확인하는 것은 `isLanding` 설계의 불변식이다. 여러 노드에 선언되면 순회에서 먼저 만나는 것이 사용되고 나머지는 무시된다. 코드가 이를 막아주지 않기 때문에, 역할당 하나라는 규칙은 테스트로 검사한다.

## 결과

검증 시나리오는 모두 통과했다. 역할별 로그인과 기본 화면 진입, 목록과 상세의 독립 렌더링, 레이아웃 그룹의 `Outlet` 전환, 타 역할 경로의 404, 역할 전환 시 라우트와 사이드바 갱신까지.

이 재설계로 작성한 중첩 구조가 변환 없이 그대로 등록되고, 하나의 정의에서 라우트, 메뉴, 접근 범위, 기본 진입 경로 네 가지가 파생된다. 공유 레이아웃이 가능해졌고, 파생 로직은 순수 함수로 남아 유닛 테스트로 검증된다.

트레이드오프는 하나 있다. 기본 경로가 정의 안에 선언되므로, 역할별 첫 화면을 한 파일에서 바로 읽기는 어려워졌다. 파악하려면 라우트 트리에서 `isLanding`을 찾아야 한다. 대신 기본 경로는 정의와 항상 일치한다.

→ 코드 전체와 검증 시나리오: [admin-nested-routing-poc]