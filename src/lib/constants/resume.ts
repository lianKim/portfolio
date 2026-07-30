/**
 * 이력서 PDF 다운로드 URL (Vercel Blob)
 *
 * 고정 URL이며, Blob에 같은 경로로 덮어쓰면 재배포 없이 내용이 교체된다.
 * `?download=1` 은 크로스 오리진에서도 브라우저가 파일을 내려받도록(attachment) 강제한다.
 * (Blob URL은 다른 도메인이라 `<a download>` 속성이 무시되므로 필요)
 *
 * 교체 방법:
 *   node --env-file=.env.local scripts/upload-resume.mjs <PDF 경로>
 */
export const RESUME_PDF_URL =
  'https://ydmalhsaojhlf9yc.public.blob.vercel-storage.com/LianKim-Resume.pdf?download=1'
