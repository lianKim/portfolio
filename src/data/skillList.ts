import Html5Logo from '@public/static/images/skill/html5.png'
import Css3Logo from '@public/static/images/skill/css3.png'
import JavaScriptLogo from '@public/static/images/skill/javascript.png'
import TypeScriptLogo from '@public/static/images/skill/typescript.png'
import ReactLogo from '@public/static/images/skill/react.png'
import NextjsLogo from '@public/static/images/skill/nextjs.png'
import StyledComponentsLogo from '@public/static/images/skill/styled-components-outline.png'
import JotaiLogo from '@public/static/images/skill/jotai.png'
import ReactQueryLogo from '@public/static/images/skill/react-query.png'
import StorybookLogo from '@public/static/images/skill/storybook.png'
import JestLogo from '@public/static/images/skill/jest.png'
import ViteLogo from '@public/static/images/skill/vite.png'
import GitLogo from '@public/static/images/skill/git.png'
import GitHubLogo from '@public/static/images/skill/github.png'
import GithubActionsLogo from '@public/static/images/skill/github-actions.png'
import AwsLogo from '@public/static/images/skill/aws.png'
import AwsS3Logo from '@public/static/images/skill/aws-s3.png'
import AwsEc2Logo from '@public/static/images/skill/aws-ec2.png'
import AwsCodeDeployLogo from '@public/static/images/skill/aws-code-deploy.png'
import AwsRoute53Logo from '@public/static/images/skill/aws-route53.png'
import NginxLogo from '@public/static/images/skill/nginx.png'
import PostmanLogo from '@public/static/images/skill/postman.png'
import SwaggerLogo from '@public/static/images/skill/swagger.png'
import FigmaLogo from '@public/static/images/skill/figma.png'
import IllustratorLogo from '@public/static/images/skill/adobe-illustrator.png'
import PhotoshopLogo from '@public/static/images/skill/adobe-photoshop.png'
import PremiereProLogo from '@public/static/images/skill/adobe-premiere-pro.png'
import AffterEffectsLogo from '@public/static/images/skill/adobe-after-effects.png'
import { StaticImageData } from 'next/image'

type SkillItemType = {
  name: string
  image: StaticImageData
}

export const SKILL_LIST: SkillItemType[] = [
  { name: 'HTML5', image: Html5Logo },
  { name: 'CSS3', image: Css3Logo },
  { name: 'JavaScript', image: JavaScriptLogo },
  { name: 'TypeScript', image: TypeScriptLogo },
  { name: 'React', image: ReactLogo },
  { name: 'Next.js', image: NextjsLogo },
  { name: 'styled components', image: StyledComponentsLogo },
  { name: 'Jotai', image: JotaiLogo },
  { name: 'React Query', image: ReactQueryLogo },
  { name: 'Storybook', image: StorybookLogo },
  { name: 'Jest', image: JestLogo },
  { name: 'Vite', image: ViteLogo },
  { name: 'Git', image: GitLogo },
  { name: 'GitHub', image: GitHubLogo },
  { name: 'GitHub Actions', image: GithubActionsLogo },
  { name: 'AWS', image: AwsLogo },
  // { name: 'AWS S3', image: AwsS3Logo },
  // { name: 'AWS EC2', image: AwsEc2Logo },
  // { name: 'AWS Code Deploy', image: AwsCodeDeployLogo },
  // { name: 'AWS Route 53', image: AwsRoute53Logo },
  { name: 'NGINX', image: NginxLogo },
  { name: 'Postman', image: PostmanLogo },
  { name: 'Swagger', image: SwaggerLogo },
  { name: 'Figma', image: FigmaLogo },
  { name: 'Adobe Illustrator', image: IllustratorLogo },
  { name: 'Adobe Photoshop', image: PhotoshopLogo },
  { name: 'Adobe Premiere Pro', image: PremiereProLogo },
  { name: 'Adobe After Effects', image: AffterEffectsLogo },
]
