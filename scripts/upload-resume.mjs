/**
 * 이력서 PDF를 Vercel Blob에 업로드
 *
 * 고정 경로('resume.pdf') + 덮어쓰기 방식이라, 업로드해도 공개 URL은 항상 동일
 * 따라서 파일 내용을 바꿔도 재배포 없이 다운로드에 즉시 반영
 *
 * 사용법:
 *   node --env-file=.env.local scripts/upload-resume.mjs <PDF 경로>
 *   (경로 생략 시 ./resume.pdf 사용)
 *
 * 필요 환경변수: BLOB_READ_WRITE_TOKEN (.env.local)
 */
import { put } from '@vercel/blob'
import { readFile } from 'node:fs/promises'

const filePath = process.argv[2] ?? 'resume.pdf'

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error(
    'BLOB_READ_WRITE_TOKEN 이 없습니다. `node --env-file=.env.local ...` 로 실행하세요.',
  )
  process.exit(1)
}

let file
try {
  file = await readFile(filePath)
} catch {
  console.error(`파일을 찾을 수 없습니다: ${filePath}`)
  process.exit(1)
}

const blob = await put('LianKim-Resume.pdf', file, {
  access: 'public',
  addRandomSuffix: false, // 공개 URL 고정
  allowOverwrite: true, // 같은 경로 덮어쓰기 허용
  contentType: 'application/pdf',
  cacheControlMaxAge: 60, // 짧은 캐시(초) → 교체 후 빠르게 반영
})

console.log('업로드 완료')
console.log('URL(inline):', blob.url)
console.log('다운로드 URL:', blob.downloadUrl)
