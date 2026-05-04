import {
  DESKTOP_CARD_SCALE,
  MOBILE_BREAKPOINT,
  MOBILE_CARD_SCALE,
  TABLET_BREAKPOINT,
  TABLET_CARD_SCALE,
} from '@/lib/constants/businessCard'

export function getCardScale(width: number) {
  if (width < MOBILE_BREAKPOINT) return MOBILE_CARD_SCALE
  if (width < TABLET_BREAKPOINT) return TABLET_CARD_SCALE
  return DESKTOP_CARD_SCALE
}
