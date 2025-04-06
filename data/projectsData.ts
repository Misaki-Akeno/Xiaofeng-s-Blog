interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'Synthesizer Flow',
    description: `SynthesizerFlow 是一个基于流程图交互的模块化音频合成器。简单来说，它让你像搭积木一样组合各类音频模块，而不再需要复杂的代码或繁琐的参数配置。`,
    imgSrc: '/static/images/SynthesizerFlow/QQ20250406-162010.png',
    href: 'https://synthesizer-flow.misakif.uk',
  },
  {
    title: 'The Time Machine',
    description: `Imagine being able to travel back in time or to the future. Simple turn the knob
    to the desired date and press "Go". No more worrying about lost keys or
    forgotten headphones with this simple yet affordable solution.`,
    imgSrc: '/static/images/time-machine.jpg',
    href: '/blog/the-time-machine',
  },
]

export default projectsData
