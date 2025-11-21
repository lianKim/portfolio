declare namespace NodeJS {
  interface ProcessEnv {
    // 사이트 주소
    NEXT_PUBLIC_SITE_URL: string
    // 구글 인증코드
    NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: string
    // 네이버 인증코드
    NEXT_PUBLIC_NAVER_SITE_VERIFICATION: string
  }
}
