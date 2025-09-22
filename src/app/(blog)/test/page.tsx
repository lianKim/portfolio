'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Check, ChevronDown, Moon, Palette, Sun } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'

export default function TestPage() {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div
      className={
        darkMode
          ? 'min-h-screen p-8 transition-colors duration-300 dark'
          : 'min-h-screen p-8 transition-colors duration-300'
      }
    >
      <div className="max-w-6xl mx-auto space-y-8">
        {/* 헤더 */}
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            🧪 Tailwind & shadcn/ui 테스트
          </h1>
          <p className="text-lg text-muted-foreground">
            모든 컴포넌트와 스타일이 제대로 동작하는지 확인해보세요
          </p>

          {/* 다크모드 토글 */}
          <div className="flex justify-center">
            <Button onClick={toggleDarkMode} variant="outline" size="sm">
              {darkMode ? (
                <Sun className="w-4 h-4 mr-2" />
              ) : (
                <Moon className="w-4 h-4 mr-2" />
              )}
              {darkMode ? '라이트 모드' : '다크 모드'}
            </Button>
          </div>
        </header>

        <Separator />

        {/* Tailwind CSS 기본 테스트 */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">
            🎨 Tailwind CSS 기본 스타일
          </h2>

          <Card>
            <CardHeader>
              <CardTitle>색상 & 타이포그래피</CardTitle>
              <CardDescription>
                Tailwind의 기본 유틸리티 클래스들
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* 색상 팔레트 */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
                {[
                  'slate',
                  'gray',
                  'red',
                  'orange',
                  'yellow',
                  'green',
                  'blue',
                  'purple',
                ].map((color) => (
                  <div key={color} className="text-center">
                    <div
                      className={`w-full h-16 rounded-lg bg-${color}-500 mb-2`}
                    />
                    <p className="text-sm capitalize">{color}</p>
                  </div>
                ))}
              </div>

              <Separator />

              {/* 텍스트 크기 */}
              <div className="space-y-2">
                <p className="text-xs">Extra Small Text (text-xs)</p>
                <p className="text-sm">Small Text (text-sm)</p>
                <p className="text-base">Base Text (text-base)</p>
                <p className="text-lg">Large Text (text-lg)</p>
                <p className="text-xl">Extra Large Text (text-xl)</p>
                <p className="text-2xl font-bold">2XL Bold Text (text-2xl)</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* shadcn/ui 컴포넌트 테스트 */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">🧩 shadcn/ui 컴포넌트</h2>

          {/* 버튼 테스트 */}
          <Card>
            <CardHeader>
              <CardTitle>Button 컴포넌트</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button>Default Button</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button size="sm">Small</Button>
                <Button size="lg">Large</Button>
                <Button disabled>Disabled</Button>
              </div>
            </CardContent>
          </Card>

          {/* 카드 & 배지 테스트 */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>블로그 포스트 샘플</CardTitle>
                  <Badge variant="secondary">Tech</Badge>
                </div>
                <CardDescription>
                  이것은 블로그 포스트 카드의 샘플입니다
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Next.js와 Tailwind CSS를 사용한 블로그 시스템 구축에 대한
                  포스트입니다...
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Next.js</Badge>
                  <Badge variant="outline">React</Badge>
                  <Badge variant="outline">TypeScript</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>스크롤 영역</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-32 w-full border rounded p-4">
                  <div className="space-y-2">
                    {Array.from({ length: 20 }, (_, i) => (
                      <p key={i} className="text-sm">
                        스크롤 가능한 컨텐츠 {i + 1}
                      </p>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* 드롭다운 & 툴팁 테스트 */}
          <Card>
            <CardHeader>
              <CardTitle>드롭다운 & 툴팁</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 items-center">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">
                        <Palette className="w-4 h-4 mr-2" />
                        툴팁 테스트
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>이것은 툴팁입니다!</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      드롭다운 메뉴
                      <ChevronDown className="w-4 h-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>카테고리</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Check className="mr-2 h-4 w-4" />
                      기술 블로그
                    </DropdownMenuItem>
                    <DropdownMenuItem>회고</DropdownMenuItem>
                    <DropdownMenuItem>튜토리얼</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Tailwind Typography 테스트 */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">📝 Tailwind Typography</h2>

          <Card>
            <CardHeader>
              <CardTitle>Prose 스타일링 테스트</CardTitle>
              <CardDescription>
                블로그 포스트에서 사용될 Typography 스타일
              </CardDescription>
            </CardHeader>
            <CardContent>
              <article className="prose prose-lg max-w-none dark:prose-invert">
                <h1>Typography Heading 1</h1>
                <h2>Typography Heading 2</h2>
                <h3>Typography Heading 3</h3>

                <p>
                  이것은 <strong>굵은 텍스트</strong>와 <em>기울임 텍스트</em>가
                  포함된 일반적인 문단입니다. <code>인라인 코드</code>도
                  포함되어 있습니다.
                </p>

                <blockquote>
                  이것은 인용문입니다. 블로그 포스트에서 중요한 내용을 강조할 때
                  사용됩니다.
                </blockquote>

                <ul>
                  <li>첫 번째 목록 항목</li>
                  <li>두 번째 목록 항목</li>
                  <li>세 번째 목록 항목</li>
                </ul>

                <ol>
                  <li>순서가 있는 첫 번째 항목</li>
                  <li>순서가 있는 두 번째 항목</li>
                  <li>순서가 있는 세 번째 항목</li>
                </ol>

                <pre>
                  <code>{`// 코드 블록 테스트
function hello() {
  console.log("Hello, World!");
}

hello();`}</code>
                </pre>

                <p>
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    이것은 링크입니다
                  </a>
                </p>
              </article>
            </CardContent>
          </Card>
        </section>

        {/* 반응형 테스트 */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">📱 반응형 디자인 테스트</h2>

          <Card>
            <CardHeader>
              <CardTitle>그리드 레이아웃</CardTitle>
              <CardDescription>
                다양한 화면 크기에서의 레이아웃 테스트
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 8 }, (_, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-4 text-white text-center"
                  >
                    <p className="font-semibold">카드 {i + 1}</p>
                    <p className="text-sm opacity-80">반응형 테스트</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 테스트 결과 요약 */}
        <section className="space-y-4">
          <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
            <CardHeader>
              <CardTitle className="text-green-800 dark:text-green-200">
                ✅ 테스트 완료!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p>✓ Tailwind CSS v4 정상 동작</p>
                <p>✓ shadcn/ui 컴포넌트 정상 렌더링</p>
                <p>✓ 다크모드 토글 기능 작동</p>
                <p>✓ Tailwind Typography 스타일링 적용</p>
                <p>✓ 반응형 디자인 정상 작동</p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
