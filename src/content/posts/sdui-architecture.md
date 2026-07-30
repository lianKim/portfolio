---
title: 'SDUI 시스템 구축기 (1): JSON 기반 UI 렌더링 설계'
description: '브랜드마다 완전히 다른 UI를 단일 코드베이스로 관리하기 위해 Server-Driven UI를 도입한 과정'
date: '2025-06-02'
lastModified: '2025-07-28'
category: 'development'
tags: ['React', 'TypeScript', 'SDUI']
---

제품에 부착된 QR 코드를 스캔하면 나타나는 제품 인증 페이지. 이 페이지에서 사용자는 제품 정보 확인, 브랜드 스토리 열람, 소유자 등록과 해제까지 한 번에 처리할 수 있다.

문제는 브랜드마다 요구하는 UI가 완전히 다르다는 점이었다.

색상이나 폰트만 다른 것이 아니었다. 어떤 브랜드는 제품 이미지를 상단에 크게 배치하길 원했고, 어떤 브랜드는 로고를 중앙에 두길 원했고, 어떤 브랜드는 정보를 리스트로 정리해 달라고 했다. 레이아웃 구조, 정보 배치, 상호작용 방식까지 브랜드마다 달랐다.

```tsx
// 브랜드별 분기 처리의 현실
function ProductPage({ brand, product }) {
  if (brand === 'sports') {
    return <SportsProductPage product={product} />;
  } else if (brand === 'luxury') {
    return <LuxuryProductPage product={product} />;
  } else if (brand === 'casual') {
    return <CasualProductPage product={product} />;
  } else if (brand === 'outdoor') {
    return <OutdoorProductPage product={product} />;
  }
  // ... 브랜드가 추가될 때마다 분기문 증가
}
```

새로운 브랜드가 추가될 때마다 새로운 컴포넌트를 만들고, 기존 로직을 수정하고, 번들 크기는 계속 커졌다. 이 방식으로는 확장에 한계가 있다고 판단해 새로운 해결책을 찾기 시작했다.

## 테마 시스템 검토

처음에는 기존 방식을 크게 바꾸지 않는 쪽으로, 테마 기반 접근부터 검토했다.

```tsx
// 테마 기반 접근
const brandATheme = {
  primaryColor: '#000000',
  font: 'bold',
  layout: 'dynamic'
};

const brandBTheme = {
  primaryColor: '#f5f5dc',
  font: 'serif',
  layout: 'classic'
};
```

그러나 테마는 구조가 같고 겉모습만 다를 때 유효한 방식이다. 우리는 컬러나 폰트 수준이 아니라 레이아웃 구조 자체가 브랜드마다 달랐기 때문에, 테마 시스템만으로는 해결할 수 없었다.

## UI를 데이터로 표현하기

구조 자체가 브랜드마다 다르다면, 구조를 코드에 고정하지 않는 방법이 필요했다. React는 데이터를 받아서 UI를 렌더링한다. 이 특성을 활용해 UI 구조 자체를 JSON 데이터로 표현하면 어떨까 하는 아이디어가 떠올랐다.

```tsx
// 기존 방식: JSX로 직접 UI 정의
<div className="container">
  <h1>제품명</h1>
  <img src="product.jpg" />
</div>
```

```tsx
// 새로운 방식: JSON으로 UI 구조 표현
{
  "type": "div",
  "role": "container",
  "children": [
    {
      "type": "h1", 
      "role": "text",
      "content": "제품명"
    },
    {
      "type": "img",
      "role": "image", 
      "src": "product.jpg"
    }
  ]
}
```

서버에서 브랜드별 UI 구조를 JSON으로 내려주고, 클라이언트에서는 이를 해석해 렌더링하는 방식이다. Server-Driven UI(SDUI)를 설계하기로 했다. 왜 이 선택이었는지에 대한 판단은 따로 정리했고, 이 글에서는 구현 과정을 다룬다.
 
→ [프로젝트 기록: 브랜드마다 컴포넌트를 만들지 않은 이유](https://www.liankim.kr/projects/sdui)

## SDUI 아키텍처 핵심 설계

<Callout title={undefined}>이 글의 코드 예시에서 React key는 index로 단순화했다.</Callout>

### ElementBase 인터페이스 설계

모든 UI 요소의 기반이 되는 공통 구조부터 정의했다.

```tsx
export interface ElementBase {
  // 개발자를 위한 설명 (JSON 내 주석 용도)
  description?: string;
  // 실제 렌더링될 HTML 태그 (div, span, button 등)
  type: ElementType;
  // 어떤 React 컴포넌트로 렌더링할지 결정하는 key
  role: ElementRole;
  // 인라인 스타일 정의
  style?: CSSProperties;
  // 자식 요소들 (재귀 구조로 중첩 가능)
  children?: Element[];
}
```

여기서 가장 중요한 건 `role` 속성이다. `type`은 실제 DOM 태그를 결정하고, `role`은 어떤 React 컴포넌트로 렌더링할지를 결정한다. 예를 들면 이렇다.
 
- `type: "div"` + `role: "container"` → div 태그의 `<Container>` 컴포넌트
- `type: "span"` + `role: "text"` → span 태그의 `<Text>` 컴포넌트
- `type: "p"` + `role: "text"` → p 태그의 `<Text>` 컴포넌트

### role 기반 컴포넌트 시스템

`ElementRole` 타입에는 시스템에서 사용할 수 있는 모든 컴포넌트 역할이 정의되어 있다.

```tsx
export type ElementRole =
  | 'container'            // 다른 요소들을 그룹화
  | 'text'                 // 텍스트 콘텐츠 표시
  | 'image'                // 이미지 표시
  | 'button'               // 버튼 요소
  // ...
```

### 동적 컴포넌트 매핑

JSON Element를 실제 React 컴포넌트로 변환하는 핵심 로직이다.

```tsx
// role 값을 key로, 실제 React 컴포넌트를 값으로 가지는 매핑 테이블
export const COMPONENT_MAP = {
  container: Container,
  text: Text,
  image: Image,
  button: Button,
  // ...
};

// JSON Element를 받아 해당하는 React 컴포넌트로 렌더링
function ElementRenderer({ element }: { element: Element }) {
  // element.role 값으로 COMPONENT_MAP에서 컴포넌트를 찾음
  // 매핑되지 않은 role은 기본값으로 Container 사용
  const Renderer = COMPONENT_MAP[element.role] || COMPONENT_MAP.container;
  
  return <Renderer {...element} />;
}
```

이게 SDUI의 핵심이다. `ElementRenderer`가 JSON의 `role` 값을 보고 `COMPONENT_MAP`에서 해당하는 React 컴포넌트를 찾아 렌더링한다.

브랜드별로 다른 UI가 필요하다면 서버에서 다른 JSON 구조를 내려주기만 하면 된다.
 
```tsx
// 브랜드 A: 제품 이미지를 상단에 크게 배치하는 레이아웃
{
  "role": "container",
  "children": [
    {
      "type": "img",
      "role": "image",
      "style": { "width": "100%", "height": "400px" }
    },
    {
      "type": "h1",
      "role": "text",
      "content": "제품명"
    }
  ]
}
 
// 브랜드 B: 로고를 중앙에 두는 레이아웃
{
  "role": "container",
  "children": [
    {
      "type": "h1",
      "role": "text",
      "content": "브랜드명",
      "style": { "textAlign": "center", "fontFamily": "serif" }
    },
    {
      "type": "img",
      "role": "image",
      "style": { "width": "60%", "margin": "0 auto" }
    }
  ]
}
```

### 타입 안전성 확보

Element 유니온 타입을 통해 각 `role`에 맞는 속성만 허용하도록 설계했다.

```tsx
// TextElement: content 속성 필수
export interface TextElement extends ElementBase {
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  role: 'text';
  content: ElementContent;
}

// ImageElement: src, alt 속성 사용 가능
export interface ImageElement extends ElementBase {
  type: 'img';
  role: 'image';
  src?: string;
  alt?: string;
}

// ButtonElement: buttonType으로 버튼 종류 지정
export interface ButtonElement extends ElementBase {
  type: 'button';
  role: 'button';
  buttonType?: 'submit' | 'reset' | 'button';
}

// 모든 Element 타입의 유니온
export type Element = 
  | TextElement 
  | ImageElement 
  | ButtonElement
  // ...
```

이렇게 하면 TypeScript가 각 `role`에 맞는 속성만 허용한다. `text` role에는 `content`가 필수이고, `image` role에는 `src`를 사용할 수 있다.

### 렌더링 파이프라인

전체 과정을 정리하면 다음과 같다.

 ![SDUI 렌더링 파이프라인 흐름도](/images/posts/sdui-architecture/flow-chart.webp)

```tsx
// 1. 서버 응답을 Element 배열로 파싱
const elements: Element[] = parseJsonToElements(serverResponse);

// 2. 페이지에서 Element 배열을 순회하며 렌더링
function JsonRenderPage({ elements }: { elements: Element[] }) {
  return (
    <>
      {elements.map((element, index) => (
        <ElementRenderer key={index} element={element} />
      ))}
    </>
  );
}

// 3. ElementRenderer가 role에 맞는 컴포넌트를 선택하고, children을 재귀적으로 처리
function ElementRenderer({ element }: { element: Element }) {
  const Renderer = COMPONENT_MAP[element.role] || COMPONENT_MAP.container;

  return (
    <Renderer data={element} style={element.style}>
      {element.children?.map((child, index) => (
        <ElementRenderer key={index} element={child} />
      ))}
    </Renderer>
  );
}
```

이제 서버에서 JSON만 변경해도 완전히 다른 UI가 즉시 반영된다. 이전에는 작은 수정에도 클라이언트 배포가 필요했지만, 더 이상 그럴 필요가 없어졌다.

## 초기 구현의 시행착오

실제 구현을 시작하자 예상하지 못한 문제들이 나타났다.

### JSON 스키마 설계의 딜레마

가장 고민됐던 부분은 평면적 구조 vs 중첩 구조의 균형이었다.

```tsx
// 평면적 구조: 단순하지만 확장성 부족
{
  "type": "div",
  "role": "container",
  "child1Type": "h1",
  "child1Content": "제목",
  "child2Type": "img", 
  "child2Src": "image.jpg"
}

// 중첩 구조: 유연하지만 복잡성 증가
{
  "type": "div",
  "role": "container",
  "children": [
    {
      "type": "h1",
      "role": "text",
      "content": "제목"
    },
    {
      "type": "img", 
      "role": "image",
      "src": "image.jpg"
    }
  ]
}
```

평면적 구조는 간단하지만 확장성이 떨어졌고, 중첩 구조는 유연하지만 JSON이 복잡해졌다. 결국 중첩 구조를 선택했다. 복잡성보다 확장성이 더 중요했기 때문이다.

### 속성 필수 여부 결정

`ElementBase`는 공통 구조였지만, 실제 컴포넌트들은 각각 고유한 속성이 필요했다. 이 과정에서 어떤 속성을 필수로 할 것인 지가 고민이었다. 

```tsx
// src를 필수로 하면 안전하지만, 동적 데이터 바인딩이 필요한 경우는?
export interface ImageElement extends ElementBase {
  type: 'img';
  role: 'image';
  src: string;    // 필수로 하면 타입 안전성은 높아지지만
  alt: string;    // 서버 데이터를 바인딩해야 하는 경우 문제가 된다
}
```

서버 데이터를 동적으로 바인딩해야 할 가능성이 있는 속성들은 대부분 optional로 설계했다. 그 대신 필수 값이 없는 요소는 그 요소만 렌더링에서 제외해, 일부 데이터가 잘못돼도 나머지 화면은 그려지게 했다.

### 컴포넌트 구현

가장 단순해 보였던 `Container`부터 시작했다.

```tsx
function Container({ data, style, children }: ContainerProps) {
  const Tag = data.type; // 'div', 'section', 'article' 등

  return <Tag style={style}>{children}</Tag>;
}
```

`Container`는 `ElementRenderer`로부터 이미 처리된 `children`을 받아서 렌더링한다. `children` 재귀 처리는 `ElementRenderer`에서 담당하기 때문에 각 컴포넌트는 자신의 역할에만 집중하면 된다.

Text 컴포넌트는 `type`에 따라 적절한 HTML 태그를 렌더링한다.

```tsx
function Text({ data, style }: TextProps) {
  const Tag = data.type; // 'h1', 'h2', 'p', 'span' 등

  return <Tag style={style}>{data.content}</Tag>;
}
```

이렇게 기본적인 컴포넌트들을 하나씩 구현해 나갔다.

## 마치며

첫 번째 프로토타입에서, `ElementBase` 인터페이스와 `role` 기반 시스템만으로 브랜드별로 다른 UI를 JSON으로 구성할 수 있다는 것을 확인했다.

하지만 정적인 UI 렌더링만으로는 실제 제품 요구사항을 충족할 수 없었다. 제품의 사이즈, 컬러 같은 정보는 서버 데이터를 바인딩해서 보여줘야 했고, 소유자 등록처럼 폼을 제출하는 기능은 버튼 클릭 같은 사용자 상호작용 처리가 필요했다. 또, 더 나은 사용자 경험을 위해 인터랙션에 따른 애니메이션이나 상태별로 다른 UI를 보여주고 싶었고, 그러려면 스타일 시스템부터 확장해야 했다. 그 과정은 다음 글에 정리했다.

→ [다음 글: SDUI 시스템 구축기 (2): 스타일 시스템 확장](https://www.liankim.kr/blog/sdui-style-system)