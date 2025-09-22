import { PostCard } from '@/components/blog/PostCard'

export default function BlogPage() {
  return (
    <div className="py-12">
      <div className="space-y-8">
        <PostCard
          title="Next.js 블로그 만들기: 왜 직접 만들기로 했을까?"
          description="최근에 커리어를 정리하면서 여러 개발자들의 이력서를 들여다보는데, 생각보다 많은 사람들이 개인 블로그를 운영하고 있었다. 자기만의 공간에서 프로젝트나 기술 글을 잘 정리해둔 걸 보면서 나도 이런 공간 하나쯤은 있어야 하지 않을까..."
          date="2025. 03. 27"
          tags={['nextjs', 'blog', '개발']}
        />

        <PostCard
          title="웹 페이지가 로드되는 방식, CSR과 SSR 차이를 알아보자!"
          description="웹 애플리케이션을 개발할 때 어떤 렌더링 방식을 선택하느냐에 따라 성능과 사용자 경험이 크게 달라질 수 있습니다. 대표적인 렌더링 방식으로 CSR(ClientSide Rendering)과 SSR(ServerSide Rendering)이 있으며, 각각의 방식..."
          date="2025. 02. 11"
          tags={['CSR', 'SSR', '렌더링']}
        />

        <PostCard
          title="클립보드의 숨겨진 비밀"
          description="클립보드에 데이터를 복사할 때 실제로 어떤 일이 일어나는지, 그리고 환경에 따라 불편한 동작이 달라지는 이유를 살펴봅니다."
          date="2025. 08. 28"
          tags={['클립보드', '웹API', 'UX']}
        />
      </div>
    </div>
  )
}
