---
title: 'SDUI 시스템 구축기 (2): 스타일 시스템 확장'
description: 'Server-Driven UI에서 상태별 스타일과 CSS 의사선택자를 JSON으로 제어하기 위한 스타일 시스템 설계 과정'
date: '2025-06-11'
lastModified: '2025-06-11'
category: 'development'
tags: ['React', 'TypeScript', 'SDUI', 'CSS-in-JS', 'Emotion']
---

[이전 글](/blog/sdui-architecture)에서는 `ElementBase` 인터페이스와 `role` 기반 컴포넌트 매핑으로 브랜드별 UI를 JSON으로 구성하는 기본 구조를 만들었다. 스타일은 React의 `CSSProperties`를 그대로 사용하는 단순한 형태였다.

```tsx
// 초기 스타일 구조
export interface ElementBase {
  // ...
  style?: CSSProperties;
}
```

```json
{
  "type": "button",
  "role": "button",
  "style": { "backgroundColor": "black", "color": "white" }
}
```

정적인 UI를 렌더링하는 데는 문제가 없었다. 하지만 실제 제품 요구사항을 구현하면서 한계가 드러났다.

소유자 등록 폼의 제출 버튼을 예로 들면, 필수 입력 필드가 모두 채워지기 전까지는 비활성화 상태로, 모두 채워지면 활성화 상태로 보여야 했다. 단순히 `style` 하나로는 이런 상태 분기를 표현할 수 없었다.

입력 필드도 마찬가지였다. 포커스 시 테두리가 강조되는 효과, 힌트 텍스트 색상 지정처럼 CSS 의사선택자로 처리해야 하는 스타일이 필요했지만, `CSSProperties`로는 `:focus`나 `::placeholder` 같은 의사선택자를 정의할 수 없었다.

기존의 단순한 `CSSProperties` 구조로는 이런 요구사항들을 충족할 수 없었다. 스타일 시스템 자체를 확장해야 했다.

## 1차 확장: 상태별 스타일

Part 1에서 만든 Container 컴포넌트는 단순히 자식 요소들을 렌더링하는 역할만 했다. 하지만 실제 제품을 개발하다 보면 이것만으로는 부족한 경우가 있다.

휴대폰 인증처럼 JSON만으로는 표현할 수 없는 별도의 로직이 필요하거나, 자식 요소마다 서로 다른 조건에 따라 렌더링되어야 하거나, 재사용이 많은데 매번 JSON으로 작성하기엔 길고 복잡해지는 경우가 그렇다. 이런 경우를 위해 별도의 복합 컴포넌트를 만들어 사용했다.

복합 컴포넌트에서 마주한 문제는 자식 요소의 상태 제어였다. 예를 들어, 휴대폰 인증 컴포넌트에서는 인증 코드 전송 버튼을 누른 후에야 타이머가 나타나야 했다. 서명 패드 컴포넌트에서는 서명이 완료된 후에야 초기화 버튼이 보여야 했다. 기존의 단일 `style` 객체로는 이처럼 다른 요소와의 상호작용에 따라 달라지는 조건부 스타일을 표현할 수 없었다.

이를 해결하기 위해 `active`라는 상태 개념을 도입했다. 부모 컴포넌트가 자식 요소의 활성화 여부를 판단하고, 그 결과를 `isActive` 플래그로 전달한다. 자식 요소는 이 값에 따라 `default` 또는 `active` 스타일을 적용받는다.

```tsx
type ElementStyleStatus = 'default' | 'active';

type ElementStyle = Partial<Record<ElementStyleStatus, CSSProperties>>;
```

### 인증 컴포넌트

인증 코드가 전송되면 인증 코드 입력 필드와 타이머가 나타나고, 인증이 완료되면 완료 메시지가 표시된다.

![인증 컴포넌트 상태 변화](/blog/images/sdui-style-system/verification.webp)

```tsx
function Verification({ data, style }: VerificationProps) {
  const { verificationType, children = [] } = data;
  const config = verificationRegistry[verificationType];

  // 인증 상태 구독
  const isCodeSent = useAtomValue(config.codeSentAtom);
  const isVerified = useAtomValue(config.verifiedAtom);

  // 자식 요소의 role에 따라 활성화 조건 결정
  const getIsActive = (element: Element): boolean => {
    const { role } = element;

    if (role === 'message') return isVerified; // 인증 완료 시
    if (role === 'timer') return isCodeSent && !isVerified; // 코드 전송 후, 인증 전

    return isCodeSent;
  };

  return (
    <div css={style}>
      {children.map((child, index) => (
        <ElementRenderer
          key={index}
          element={child}
          isActive={getIsActive(child)}
        />
      ))}
    </div>
  );
}
```

### 서명 패드 컴포넌트

서명이 완료되면 초기화 버튼이 나타난다.

![서명 패드 상태 변화](/blog/images/sdui-style-system/signature.webp)

```tsx
function SignaturePad({ data }: SignaturePadProps) {
  const { name, children } = data;
  const { canvasRef, onEnd, onBegin, hasSignature } = useSignaturePad(name);

  return (
    <>
      <SignatureCanvas
        ref={canvasRef}
        onEnd={onEnd}
        onBegin={onBegin}
        penColor={data.penColor ?? 'black'}
        canvasProps={{ className: 'canvas' }}
      />
      {/* 서명 완료 시 자식 요소(초기화 버튼 등) 활성화 */}
      {children?.map((child, index) => (
        <ElementRenderer
          key={index}
          element={child}
          isActive={hasSignature}
        />
      ))}
    </>
  );
}
```

`hasSignature`가 true가 되면 자식 요소들이 활성화되어 초기화 버튼이 보이게 된다.

### ElementRenderer 수정

`isActive`를 전달받아 처리하도록 `ElementRenderer`도 수정했다.

```tsx
function ElementRenderer({ element, isActive }: ElementRendererProps) {
  // 자식 요소 렌더링 (isActive 전파)
  const children = useMemo(
    () =>
      (element.children ?? []).map((child, idx) => (
        <ElementRenderer key={idx} element={child} isActive={isActive} />
      )),
    [element.children, isActive]
  );

  const Renderer = COMPONENT_MAP[element.role] || COMPONENT_MAP.container;

  return (
    <Renderer data={element} isActive={isActive}>
      {children}
    </Renderer>
  );
}
```

`isActive`가 props로 추가되었고, 자식 요소에도 동일하게 전달된다. children 생성 로직은 불필요한 재생성을 방지하기 위해 `useMemo`로 감쌌다.

## 2차 확장: 의사선택자 지원

상태별 스타일로 복합 컴포넌트 문제는 해결했지만, 개발을 진행하면서 또 다른 요구사항들이 생겼다.

첫 번째는 서버 데이터 바인딩 시 단위 표시 문제였다. 제품 정보 중 일부 수치 데이터는 서버에서 `number` 타입으로 내려왔는데, 화면에는 '%'나 'cm' 같은 단위를 붙여서 보여줘야 했다. 단위를 별도 요소로 분리하는 방법도 있었지만, 값이 없을 때 데이터 바인딩 요소가 렌더링되지 않도록 구현해둔 상태였다. 단위 요소가 따로 있으면 값은 없는데 '%'만 화면에 남는 문제가 생겼다. `::after` 의사 요소로 단위를 붙이면 값이 없을 때 단위도 함께 사라지므로 이 문제를 해결할 수 있었다.

두 번째는 브라우저 기본 스타일 제어였다. 입력 필드의 자동완성 스타일은 브랜드별로 사용된 색상이 달라서 공통으로 제거할 수 없었고, `:-webkit-autofill` 선택자로 브랜드별 스타일에 맞게 개별 처리해야 했다. `::placeholder` 색상도 브랜드마다 달랐다. 일부 브랜드에서는 `::-webkit-scrollbar`로 스크롤바 스타일링이 필요한 경우도 있었다.

세 번째는 인터랙션 스타일이었다. 입력 필드가 포커스되었을 때 테두리 색상이 변경되거나, 체크박스가 체크되었을 때 스타일이 바뀌는 등의 효과가 필요했다.

기존 구조에 `pseudo` 필드를 추가해 의사선택자를 지원하도록 확장했다:

```tsx
// 의사선택자 스타일
type ElementPseudoStyle = Record<string, CSSProperties>;

// 기본 스타일 + 의사선택자 스타일
type ElementStyleItem = {
  base?: CSSProperties;
  pseudo?: ElementPseudoStyle;
};

// 상태별 스타일 (1차 확장의 CSSProperties가 ElementStyleItem으로 변경)
type ElementStyle = Partial<Record<ElementStyleStatus, ElementStyleItem>>;
```

1차 확장에서 `CSSProperties`를 직접 사용했던 부분이 `ElementStyleItem`으로 바뀌었다. 기존 스타일은 `base`에, 의사선택자 스타일은 `pseudo`에 정의한다.

### 입력 필드

`:focus`로 포커스 시 테두리 색상을 변경하고, `::placeholder`로 힌트 텍스트 색상을 지정한다. `:-webkit-autofill` 관련 선택자로 브라우저 자동완성 시 적용되는 기본 스타일을 브랜드 스타일에 맞게 덮어썼다.

![입력 필드 상태 변화](/blog/images/sdui-style-system/input.webp)

```json
{
  "type": "input",
  "role": "input",
  "placeholder": "이름을 입력해 주세요",
  "style": {
    "default": {
      "base": {
        "backgroundColor": "#ffffff",
        "border": "1px solid #dbdbdb",
        "color": "#111111",
      },
      "pseudo": {
        ":focus": {
          "borderColor": "#111111"
        },
        "::placeholder": {
          "color": "#9c9c9c"
        },
        ":-webkit-autofill, :-webkit-autofill:hover, :-webkit-autofill:focus, :-webkit-autofill:active": {
          "WebkitTextFillColor": "#111111",
          "WebkitBoxShadow": "0 0 0px 1000px #ffffff inset"
        }
      }
    }
  }
}
```

### 체크박스

브라우저 기본 체크박스 스타일을 `appearance: none`으로 제거하고 직접 디자인한 스타일을 적용했다. `:checked`로 체크 시 테두리 색상을 변경하고, `:checked::after`로 체크 표시를 CSS로 그린다. 체크박스가 선택되지 않은 상태에서는 연한 테두리의 빈 사각형이 보이고, 선택하면 테두리가 진해지면서 사각형 안에 체크 표시가 나타난다.

![체크박스 상태 변화](/blog/images/sdui-style-system/checkbox.webp)

```json
{
  "type": "input",
  "role": "checkbox",
  "style": {
    "default": {
      "base": {
        "appearance": "none",
        "display": "inline-block",
        "position": "relative",
        "width": "18px",
        "height": "18px",
        "backgroundColor": "transparent",
        "border": "2px solid #dbdbdb",
        "borderRadius": "4px",
        "cursor": "pointer"
      },
      "pseudo": {
        ":checked": {
          "borderColor": "#111111"
        },
        ":checked::after": {
          "content": "''",
          "display": "block",
          "position": "absolute",
          "left": "3px",
          "bottom": "6px",
          "width": "8px",
          "height": "5px",
          "borderLeft": "2px solid #111111",
          "borderBottom": "2px solid #111111",
          "transform": "rotate(-45deg)"
        }
      }
    }
  }
}
```

### 단위 표시

`::after`로 수치 뒤에 '%' 단위를 붙인다. 서버 데이터 바인딩 요소는 값이 없으면 렌더링되지 않으므로, 단위도 함께 나타나지 않는다.

```json
{
  "type": "span",
  "role": "variable",
  "dataPath": ["ratio"],
  "style": {
    "default": {
      "pseudo": {
        "::after": {
          "content": "'%'"
        }
      }
    }
  }
}
```

## 최종 구조와 병합 로직

1차 확장에서 상태별 스타일을, 2차 확장에서 의사선택자 지원을 추가했다. 최종 스타일 구조는 다음과 같다.

![ElementStyle 구조 다이어그램](/blog/images/sdui-style-system/diagram.webp)

상태(`default`, `active`)와 적용 방식(`base`, `pseudo`)의 조합으로 구성된다. 타입 정의는 다음과 같다:

```tsx
// 의사선택자 스타일
type ElementPseudoStyle = Record<string, CSSProperties>;

// 기본 스타일 + 의사선택자 스타일
type ElementStyleItem = {
  base?: CSSProperties;
  pseudo?: ElementPseudoStyle;
};

// 상태 종류
type ElementStyleStatus = 'default' | 'active';

// 최종 스타일 타입
type ElementStyle = Partial<Record<ElementStyleStatus, ElementStyleItem>>;
```

### 스타일 병합

`isActive` 값에 따라 적절한 스타일을 병합하는 훅을 만들었다. `default` 스타일을 기본으로 적용하고, `isActive`가 true이면 `active` 스타일을 덮어쓴다.

```tsx
function useElementCss(
  style?: ElementStyle,
  isActive: boolean = false
): SerializedStyles {
  return useMemo(() => {
    // 상태별 스타일 추출
    const defaultStyle = style?.default ?? { base: {}, pseudo: {} };
    const activeStyle = style?.active ?? { base: {}, pseudo: {} };

    // 우선순위에 따라 병합: default → active
    const mergedBase = {
      ...defaultStyle.base,
      ...(isActive ? activeStyle.base : {})
    };

    const mergedPseudo = {
      ...defaultStyle.pseudo,
      ...(isActive ? activeStyle.pseudo : {})
    };

    // Emotion css 객체로 변환
    return css({
      ...mergedBase,
      ...mergedPseudo
    });
  }, [style, isActive]);
}
```

스프레드 연산자로 객체를 펼치면 뒤에 오는 속성이 앞의 속성을 덮어쓴다. 이 특성을 활용해 `default` 스타일 위에 `active` 스타일을 병합했다.

## 마치며

단일 `CSSProperties`로 처리하던 스타일 시스템을 두 단계에 걸쳐 확장했다. 1차 확장에서는 복합 컴포넌트의 상태 제어를 위해 `default`/`active` 구조를 도입했고, 2차 확장에서는 의사선택자 지원을 위해 `base`/`pseudo` 구조를 추가했다. 이제 상태에 따른 조건부 스타일링부터 `:hover`, `:focus`, `::after` 같은 인터랙션 스타일까지 JSON으로 제어할 수 있게 되었다.

처음 설계할 때 `base`와 `pseudo`를 분리한 건 타입 안전성과 가독성 때문이었다. 기본 스타일과 의사선택자 스타일을 명시적으로 구분하면 JSON이 길어져도 구조를 파악하기 쉬울 거라 생각했다. 하지만 실제로 사용해보니 한 단계 더 중첩해야 하는 게 번거롭게 느껴졌다. Emotion의 css 함수는 의사선택자를 기본 스타일과 같은 레벨에 작성해도 동일하게 처리하기 때문에, 다시 설계한다면 분리 없이 flat하게 작성하는 방식을 선택할 것 같다.