import { PERSONAL_INFO } from './personal'

// 폰트
export const FONT_EN = "'mundial-narrow-variable', sans-serif"
export const FONT_DEFAULT =
  "'Pretendard Variable', Pretendard, 'mundial-narrow-variable', sans-serif"

// 텍스처
export const TEXTURE_PATH = '/images/card-texture.webp'

// 반응형 브레이크포인트
export const TABLET_BREAKPOINT = 1024
export const MOBILE_BREAKPOINT = 768

// 카드 스케일
export const MOBILE_CARD_SCALE = 3.5
export const TABLET_CARD_SCALE = 5
export const DESKTOP_CARD_SCALE = 7
export const CARD_ASPECT_RATIO_W = 9
export const CARD_ASPECT_RATIO_H = 5

// 연락처 정보
export const CONTACT_INFO = {
  name: PERSONAL_INFO.name,
  job: 'Front-End Developer',
  phone: PERSONAL_INFO.phone,
  email: PERSONAL_INFO.email,
} as const
