---
title: 'FSD 도입기: 아키텍처 설계부터 ESLint 자동화까지'
description: '프론트엔드 프로젝트에 Feature-Sliced Design을 도입하고, ESLint로 아키텍처 규칙을 자동화한 과정'
date: '2025-03-06'
lastModified: '2025-03-06'
category: 'development'
tags: ['React', 'FSD']
readingTime: 8
---

프로젝트 초기에는 기능 단위로 폴더를 나누는 정도로 충분했었지만, 프로젝트가 성장하면서 상황이 달라졌다. 새로운 도메인이 추가되고, 기능이 복잡해지면서 코드베이스는 점점 뒤엉키기 시작했다.

가장 큰 문제는 의존성 방향이 명확하지 않다는 점이었다. 어떤 컴포넌트가 어떤 모듈을 참조해도 되는지, 공통 로직은 어디에 두어야 하는지에 대한 기준이 없었다. 팀원마다 파일을 배치하는 방식도 조금씩 달랐고, 새로운 기능을 추가할 때마다 코드를 어디에 넣어야 할지 고민하는 시간이 길어졌다. 신규 팀원이 합류했을 때 프로젝트 구조를 설명하는 데에도 적지 않은 시간이 들었다.

이런 문제를 해결하기 위해 여러 아키텍처 방법론을 검토했고, 최종적으로 Feature-Sliced Design(FSD)을 도입하기로 결정했다. 단순히 폴더 구조를 정하는 것을 넘어서, ESLint를 활용해 아키텍처 규칙을 코드 레벨에서 강제하고, 계층별로 import문이 자동 정렬되도록 설정하는 등 코드 품질 유지에도 신경썼다.

## 왜 FSD를 선택했는가

아키텍처를 정립하기로 결정한 후, 몇 가지 방법론을 검토했다. 현재 문제점을 해결하기에 적합한 방법론으로 Feature-Sliced Design(FSD)과 Micro-Frontends가 후보에 올랐다. 프로젝트가 커지긴 했지만, Micro-Frontends는 여전히 우리 규모에 비해 과하다고 판단했다.
FSD 공식 문서를 살펴보면서 이 방법론이 우리 상황에 적합하겠다는 확신이 생겼다. 공식 문서에서는 FSD의 목적을 요구사항이 바뀌어도 코드 구조가 무너지지 않고, 새 기능을 쉽게 추가할 수 있는 프로젝트를 만드는 것이라고 설명한다. 또한 다음과 같은 상황에서 FSD가 도움이 된다고 언급하고 있었는데, 당시 우리 팀이 겪고 있던 문제와 정확히 일치했다.

> - 프로젝트가 커지면서 구조가 얽히고, 유지보수 속도가 느려졌을 때 
> - 새로 합류한 팀원이 폴더 구조를 이해하기 힘들어할 때

### FSD의 핵심 구조

FSD는 세 가지 개념으로 구성된다.

 ![FSD의 계층 구조](/blog/images/fsd-with-eslint/visual-schema.webp)

**Layers**는 역할에 따른 수직적 계층 구분이다. app, pages, features, entities, shared 순으로 나뉘며, 상위 레이어는 하위 레이어만 참조할 수 있다. 이 단방향 의존성 원칙이 FSD의 핵심이다.

**Slices**는 비즈니스 도메인별 수평적 구분이다. user, product, article처럼 도메인 단위로 코드를 나눈다.

**Segments**는 슬라이스 내부의 기술적 목적에 따른 세부 구분이다. ui, api, model 등으로 나뉜다.

```
src/
├── app/          # 앱 초기화, 라우팅, Provider 설정
├── pages/        # 페이지 컴포넌트
├── features/     # 사용자 행위 중심 기능
├── entities/     # 비즈니스 도메인 객체
└── shared/       # 공통 UI, 유틸리티
```

FSD는 공식적으로 widgets 레이어를 포함한 7개 레이어를 정의한다. 하지만 모든 레이어를 사용할 필요는 없으며, 프로젝트 특성에 맞게 조정할 수 있다. 우리 프로젝트에서는 widgets 레이어를 생략하고 5개 레이어로 운영하고 있는데, 그 이유는 아래에서 설명할 Atomic Design과의 조합에 있다.

### FSD와 Atomic Design의 조합

FSD만으로는 공통 UI 컴포넌트를 체계적으로 분류하기 어려웠다. shared/ui 안에 Button, Modal, Calendar가 뒤섞여 있으면 찾기도 어렵고, 어떤 컴포넌트가 어떤 수준의 복잡도를 가지는지 파악하기 힘들다. 이 부분은 Atomic Design을 적용해 보완했다.
shared/ui 하위에 @atoms, @molecules, @organisms 폴더를 두고, 컴포넌트의 복잡도와 성격에 따라 분류했다.

```
src/
└── shared/
    └── ui/
        ├── @atoms/       # Button, Input, Checkbox 등
        ├── @molecules/   # Tooltip, Modal 등
        └── @organisms/   # Calendar, BrandSelector 등
```

**atoms**는 더 이상 쪼갤 수 없는 최소 단위다. Button, Input, Checkbox처럼 그 자체로 완결된 기본 요소들이 여기에 속한다.

**molecules**와 **organisms**는 둘 다 여러 atom을 조합한 컴포넌트지만, 구분 기준은 맥락의 유무로 잡았다. Tooltip이나 Modal처럼 children이나 사용 상황에 따라 성격이 크게 달라지는 컴포넌트, 혹은 그 자체로 뚜렷한 맥락을 갖지 않는 컴포넌트는 molecules에 넣었다. 반면 Calendar나 BrandSelector처럼 어디에서 사용하든 컴포넌트의 역할과 성격이 명확하게 유지되는 것들은 organisms에 배치했다.

이렇게 구성하면서 organisms가 FSD의 widgets 레이어 역할을 일부 대체하게 되었다. widgets는 주로 독립적인 UI 블록을 담당하는 레이어인데, organisms에서 이미 그 역할을 수행하고 있어 별도의 widgets 레이어를 두는 것이 오히려 중복이라고 판단했다.

FSD가 레이어 간 코드 배치 기준을 제공한다면, Atomic Design은 공통 UI 컴포넌트 분류 기준을 제공한다. 서로 다른 문제를 해결하기 때문에 함께 사용하기에 적합했다.

### 선택의 이유

FSD가 해결해주는 문제는 분명했다. 

첫째, 의존성 방향이 레이어 구조에 의해 자연스럽게 정해진다. features는 entities를 참조할 수 있지만, 그 반대는 불가능하다. 이런 제약이 있으면 순환 참조나 얽힌 의존성 문제를 원천적으로 방지할 수 있다.

둘째, 새로운 코드를 어디에 배치할지 고민할 필요가 줄어든다. 사용자 행위와 관련된 기능이면 features, 도메인 데이터 모델이면 entities, 공통으로 쓰이는 유틸리티면 shared. 기준이 명확하니 팀원 간 배치 방식의 차이도 줄어든다.

셋째, 신규 팀원의 온보딩이 수월해진다. 레이어별 역할이 정해져 있으니, 구조만 이해하면 코드의 위치를 예측할 수 있다.

## 핵심 설계: features와 entities 구분하기

FSD를 도입하면서 가장 많이 고민한 부분이 features와 entities의 경계였다. 공식 문서를 읽어도 개념적으로는 이해가 되는데, 막상 실제 코드를 어디에 둘지 결정하려면 애매한 경우가 많았다.

### 기본 개념
**features**는 사용자 행위 중심으로 구성된다. 등록, 수정, 삭제, 조회처럼 사용자가 실제로 수행하는 동작 단위로 폴더를 나눈다. 해당 기능에 필요한 UI, API 호출, 폼 상태 등이 하나의 슬라이스 안에 모인다.

**entities**는 도메인 객체 중심으로 구성된다. User, Product, Brand처럼 비즈니스에서 다루는 핵심 개념을 기준으로 폴더를 나눈다. 타입 정의, 여러 기능에서 공통으로 사용하는 API, 전역 상태 등이 여기에 속한다.

말로 하면 단순한 것 같은데, 실제로 적용하다 보면 경계가 모호해지는 순간이 온다.

### 판단 기준

팀 내에서 논의 끝에 몇 가지 판단 기준을 정리했다.

| 질문 | 해당하면 |
| --- | --- |
| 사용자 흐름(등록, 수정, 조회)에 종속적인가? | features |
| 도메인 객체 자체의 정의, 상태, enum인가? | entities |
| 여러 기능(등록/수정/조회)에서 반복 재사용되는가? | entities |
| 특정 기능 안에서만 사용되는가? | features |

핵심은 해당 코드가 특정 사용자 행위에 묶여 있는지, 아니면 도메인 개념 자체를 정의하는지를 구분하는 것이다.

### 실제 예시

brand 도메인을 예로 들어보면 이렇게 나뉜다.

```
src/
├── features/
│   └── brand/
│       ├── upload/           # 브랜드 등록 기능
│       │   ├── api/
│       │   ├── ui/
│       │   └── hooks/
│       ├── update/           # 브랜드 수정 기능
│       └── list/             # 브랜드 목록 조회 기능
│
└── entities/
    └── brand/
        ├── types/            # Brand 타입 정의
        ├── api/              # 여러 기능에서 공통 사용하는 API
        ├── constants/        # 브랜드 상태 enum 등
        └── ui/               # BrandStatusBadge 등 공통 UI
```

`BrandStatusBadge` 컴포넌트를 예로 들면, 이 컴포넌트는 브랜드 목록에서도, 상세 페이지에서도, 수정 화면에서도 동일하게 사용된다. 특정 기능에 종속되지 않고 "브랜드 상태를 뱃지로 보여준다"는 역할 자체가 명확하다. 그래서 entities/brand/ui에 배치했다.

반면 `BrandUploadForm`은 브랜드 등록이라는 특정 흐름에서만 사용된다. 등록 단계, 유효성 검사, 제출 로직 등이 모두 등록 기능에 묶여 있다. 그래서 features/brand/upload/ui에 배치했다.

### features 내부의 shared

features 내부에서도 여러 기능 간에 공유되는 코드가 생긴다. 예를 들어 브랜드 등록과 수정에서 동일한 폼 컴포넌트를 쓴다면, features/brand/shared에 두는 방식을 택했다.

```
src/
└── features/
    └── brand/
        ├── upload/
        ├── update/
        └── shared/           # 등록/수정에서 공통 사용
            ├── ui/
            │   └── BrandForm.tsx
            └── constants/
                └── brandFormSteps.ts
```

entities에 넣기엔 도메인 객체 자체와 관련이 없고, 그렇다고 upload나 update 한쪽에만 두기엔 중복이 생기는 경우다. 이런 코드는 features 레이어 안에서만 공유되도록 features/brand/shared에 모았다.

### 애매한 경우
모든 코드가 깔끔하게 나뉘진 않는다. 판단이 어려운 경우엔 일단 features에 두고, 나중에 재사용 필요성이 생기면 entities로 옮기는 방식을 택했다. 처음부터 완벽하게 나누려고 하면 오히려 시간이 더 걸린다. 구조는 코드와 함께 진화하는 것이라고 생각하고, 어느 정도 유연하게 접근했다.

## ESLint로 아키텍처 규칙 자동화하기

아키텍처를 정의하는 것과 그것을 지키는 것은 별개의 문제다. 문서로 정리해두어도 바쁜 일정 속에서 규칙이 흐려지기 쉽다. 결국 사람의 기억에 의존하는 규칙은 언젠가 깨진다. 그래서 ESLint를 활용해 아키텍처 규칙을 코드 레벨에서 강제하기로 했다.

### 단방향 참조 원칙 자동화

FSD의 핵심은 단방향 의존성이다. 상위 레이어는 하위 레이어만 참조할 수 있고, 그 반대는 허용되지 않는다.

| 레이어 | 참조 가능 | 참조 금지 |
| --- | --- | --- |
| pages | features, entities, shared | app |
| features | entities, shared | pages, app |
| entities | shared | features, pages, app |
| shared | 없음 (최하위) | entities, features, pages, app |

이 규칙을 `eslint-plugin-import`의 `no-restricted-paths` 옵션으로 강제했다.

```bash
yarn add -D eslint-plugin-import
```

```javascript
// .eslintrc.js
module.exports = {
  plugins: ['import'],
  rules: {
    'import/no-restricted-paths': [
      'error',
      {
        zones: [
          // features는 app, pages 참조 금지
          { target: './src/features/**', from: './src/app/**' },
          { target: './src/features/**', from: './src/pages/**' },

          // entities는 app, pages, features 참조 금지
          { target: './src/entities/**', from: './src/app/**' },
          { target: './src/entities/**', from: './src/pages/**' },
          { target: './src/entities/**', from: './src/features/**' },

          // shared는 모든 상위 레이어 참조 금지
          { target: './src/shared/**', from: './src/app/**' },
          { target: './src/shared/**', from: './src/pages/**' },
          { target: './src/shared/**', from: './src/features/**' },
          { target: './src/shared/**', from: './src/entities/**' },
        ],
      },
    ],
  },
};
```

이제 entities에서 features를 import하려고 하면 에디터에서 바로 에러가 표시된다. 빌드 단계까지 가지 않아도 잘못된 의존성을 즉시 알 수 있다.

### import 정렬 자동화

import문이 뒤죽박죽 섞여 있으면 코드를 읽기가 불편하다. 어떤 파일은 외부 라이브러리가 먼저 오고, 어떤 파일은 내부 모듈이 먼저 온다. 이것도 사람이 신경 써서 하나하나 맞추기엔 한계가 있어서 자동화했다.

`eslint-plugin-simple-import-sort`를 사용하면 저장 시 import문이 자동으로 정렬된다.

```bash
yarn add -D eslint-plugin-simple-import-sort
```

```javascript
// .eslintrc.js
module.exports = {
  plugins: ['simple-import-sort'],
  rules: {
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // 1. React 및 외부 라이브러리
          ['^react', '^@?\\w'],

          // 2. 전역 shared
          ['^@/shared'],

          // 3. entities
          ['^@/entities'],

          // 4. features
          ['^@/features'],

          // 5. pages
          ['^@/pages'],

          // 6. app
          ['^@/app'],

          // 7. 상대 경로 import
          ['^\\.\\./'],
          ['^\\./'],
        ],
      },
    ],
  },
};
```

정렬 순서는 FSD의 의존성 계층을 반영했다. 가장 기초적인 shared부터 시작해서, 점점 구체적인 상위 레이어 순으로 배치된다. 파일을 열었을 때 import문만 봐도 이 파일이 어떤 레이어들에 의존하고 있는지 한눈에 파악할 수 있다.

### 적용 후


설정을 적용하고 나니 몇 가지가 달라졌다.

우선 잘못된 import를 작성하는 순간 에디터에서 빨간 줄이 뜬다. 별도로 기억하거나 문서를 찾아볼 필요 없이, 코드를 작성하면서 자연스럽게 규칙을 따르게 된다.

저장할 때마다 import문이 자동 정렬되니 코드 스타일이 일관되게 유지된다. 어떤 파일을 열어도 같은 패턴으로 import가 정렬되어 있어서 읽기 편하다.

무엇보다 아키텍처 규칙을 지키는 게 더 이상 의지의 문제가 아니게 됐다. 규칙을 어기면 빌드가 실패하기 때문에 자연스럽게 구조를 지키면서 개발하게 된다.

## 마치며

FSD를 도입하고 ESLint로 규칙을 자동화한 뒤, 가장 크게 달라진 점은 구조에 대한 논의가 줄었다는 것이다. 예전에는 새로운 기능을 추가할 때마다 코드 배치 위치에 대한 고민이 있었는데, 이제는 레이어와 슬라이스 기준에 따라 자연스럽게 위치가 정해진다.

신규 팀원 온보딩도 수월해졌다. 프로젝트 구조를 설명할 때 features는 사용자 행위 단위, entities는 도메인 객체 단위라는 원칙만 공유하면, 나머지는 폴더 구조를 보면서 파악할 수 있다. 모든 슬라이스가 같은 패턴을 따르기 때문에, 하나를 이해하면 나머지도 예측 가능하다.

물론 완벽하진 않다. features와 entities의 경계가 여전히 애매한 경우가 있고, 프로젝트가 커지면서 슬라이스 간 공유 로직을 어디에 둘지 새로운 고민이 생기기도 한다. 하지만 이전처럼 구조 자체가 뒤엉키는 문제는 확실히 줄었다. 의존성 방향이 ESLint로 강제되니까, 잘못된 참조가 슬금슬금 늘어나는 일은 없다.

아키텍처는 한 번 정하면 끝나는 게 아니라 계속 다듬어가는 것이라고 생각한다. FSD도 우리 프로젝트에 맞게 일부 변형해서 사용하고 있고, 앞으로도 필요에 따라 조정해 나갈 예정이다.