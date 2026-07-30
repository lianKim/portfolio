/**
 * 홈 3D 명함(BusinessCard) 번들 로딩 동안 표시되는 로고 모션.
 * favicon 로고(세로 막대·가로 막대·빨간 점)를 순차로 그리고 점을 펄스시킨다.
 * 모션 정의는 globals.css의 `.bc-loader` 참고.
 */
export function CardLoadingMotion() {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-background">
      <svg
        className="bc-loader size-24"
        viewBox="0 0 512 512"
        fill="none"
        role="img"
        aria-label="로딩 중"
      >
        <rect className="bar-v" x="90" y="90" width="68" height="200" rx="12" />
        <rect
          className="bar-h"
          x="222"
          y="354"
          width="200"
          height="68"
          rx="12"
        />
        <circle className="dot" cx="124" cy="386" r="34" />
      </svg>
    </div>
  )
}
