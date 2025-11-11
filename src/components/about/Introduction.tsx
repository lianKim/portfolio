import type { Introduction } from '@/types/about'
import { Fragment } from 'react'

interface IntroductionProps {
  data: Introduction
}

export default function Introduction({ data }: IntroductionProps) {
  // return (
  //   <header className="grid grid-cols-1 md:grid-cols-12 gap-x-5">
  //     <div className="md:col-span-5">
  //       {/* 타이틀 */}
  //       <h1 className="text-3xl font-bold leading-tight mb-1">{data.title}</h1>
  //       {/* 서브타이틀 */}
  //       <div className="flex items-center gap-2 mb-8 font-medium text-muted-foreground">
  //         {data.subtitles.map((subtitle, index) => (
  //           <Fragment key={`subtitle-${index}`}>
  //             <span>{subtitle}</span>
  //             {index !== data.subtitles.length - 1 && (
  //               <span className="font-normal">|</span>
  //             )}
  //           </Fragment>
  //         ))}
  //       </div>
  //     </div>
  //     {/* 소개글 */}
  //     <p className="md:col-span-7 flex flex-col gap-4">
  //       {data.description.map((line, index) => (
  //         <span key={`description-line-${index}`}>{line}</span>
  //       ))}
  //     </p>
  //   </header>
  // )
}
