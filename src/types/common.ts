// object를 string으로 접근할 경우
export type ObjectIndexable<T> = {
  [key: string | number]: T
}
