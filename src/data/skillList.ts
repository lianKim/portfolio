import Html5Logo from '@images/skill/html5.png'
import Css3Logo from '@images/skill/css3.png'
import JavaScriptLogo from '@images/skill/javascript.png'
import TypeScriptLogo from '@images/skill/typescript.png'
import ReactLogo from '@images/skill/react.png'
import NextjsLogo from '@images/skill/nextjs.png'
import StyledComponentsLogo from '@images/skill/styled-components-outline.png'
import JotaiLogo from '@images/skill/jotai.png'
import ReactQueryLogo from '@images/skill/react-query.png'
import StorybookLogo from '@images/skill/storybook.png'
import JestLogo from '@images/skill/jest.png'
import ViteLogo from '@images/skill/vite.png'
import GitLogo from '@images/skill/git.png'
import GitHubLogo from '@images/skill/github.png'
import GithubActionsLogo from '@images/skill/github-actions.png'
import AwsLogo from '@images/skill/aws.png'
import AwsS3Logo from '@images/skill/aws-s3.png'
import AwsEc2Logo from '@images/skill/aws-ec2.png'
import AwsCodeDeployLogo from '@images/skill/aws-code-deploy.png'
import AwsRoute53Logo from '@images/skill/aws-route53.png'
import NginxLogo from '@images/skill/nginx.png'
import PostmanLogo from '@images/skill/postman.png'
import SwaggerLogo from '@images/skill/swagger.png'
import FigmaLogo from '@images/skill/figma.png'
import IllustratorLogo from '@images/skill/adobe-illustrator.png'
import PhotoshopLogo from '@images/skill/adobe-photoshop.png'
import PremiereProLogo from '@images/skill/adobe-premiere-pro.png'
import AffterEffectsLogo from '@images/skill/adobe-after-effects.png'
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
