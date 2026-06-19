export const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'

export const TECH_SECTIONS = [
  {
    title: 'Languages',
    icon: 'code',
    count: '10 skills',
    chips: [
      { name: 'Python', icon: `${DEVICON}/python/python-original.svg` },
      { name: 'JavaScript', icon: `${DEVICON}/javascript/javascript-original.svg` },
      { name: 'HTML5', icon: `${DEVICON}/html5/html5-original.svg` },
      { name: 'CSS3', icon: `${DEVICON}/css3/css3-original.svg` },
      { name: 'PostgreSQL', icon: `${DEVICON}/postgresql/postgresql-original.svg` },
      { name: 'TailwindCSS', icon: `${DEVICON}/tailwindcss/tailwindcss-original.svg` },
      { name: 'Shell Script', icon: `${DEVICON}/bash/bash-original.svg` },
      { name: 'TypeScript', icon: `${DEVICON}/typescript/typescript-original.svg`, learning: true, dashed: true },
      { name: 'React', icon: `${DEVICON}/react/react-original.svg` },
      { name: 'Node.js', icon: `${DEVICON}/nodejs/nodejs-original.svg`, learning: true },
      { name: 'PHP', icon: `${DEVICON}/php/php-original.svg` },
    ],
  },
  {
    title: 'Data Science & AI',
    icon: 'analytics',
    count: '9 skills',
    chips: [
      { name: 'NumPy', icon: `${DEVICON}/numpy/numpy-original.svg` },
      { name: 'Pandas', icon: `${DEVICON}/pandas/pandas-original.svg` },
      { name: 'Matplotlib', icon: `${DEVICON}/matplotlib/matplotlib-original.svg` },
      { name: 'Scikit-learn', icon: `${DEVICON}/scikitlearn/scikitlearn-original.svg` },
      { name: 'Jupyter / Colab', icon: `${DEVICON}/jupyter/jupyter-original.svg` },
      { name: 'Kaggle', custom: 'kaggle' },
      { name: 'Hugging Face', icon: `${DEVICON}/huggingface/huggingface-original.svg` },
      { name: 'KNIME', icon: `${DEVICON}/googlecloud/googlecloud-original.svg` },
      { name: 'Orange', custom: 'orange' },
    ],
  },
  {
    title: 'DevOps & Systems',
    icon: 'settings',
    count: '7 tools',
    chips: [
      { name: 'Linux', icon: `${DEVICON}/linux/linux-original.svg` },
      { name: 'Ubuntu', icon: `${DEVICON}/ubuntu/ubuntu-original.svg` },
      { name: 'VirtualBox', icon: `${DEVICON}/virtualbox/virtualbox-original.svg` },
      { name: 'Git', icon: `${DEVICON}/git/git-original.svg` },
      { name: 'GitHub', icon: `${DEVICON}/github/github-original.svg`, bright: true },
      { name: 'VS Code', icon: `${DEVICON}/vscode/vscode-original.svg` },
      { name: 'Networking', icon: `${DEVICON}/ssh/ssh-original.svg` },
    ],
  },
]

export const WEB_PLATFORMS = [
  { name: 'Firebase', icon: `${DEVICON}/firebase/firebase-original.svg` },
  { name: 'Vercel', icon: `${DEVICON}/vercel/vercel-original.svg`, bright: true },
  { name: 'Netlify', icon: `${DEVICON}/netlify/netlify-original.svg` },
  { name: 'Node.js', icon: `${DEVICON}/nodejs/nodejs-original.svg` },
  { name: 'Express', icon: `${DEVICON}/express/express-original.svg`, bright: true },
  { name: 'Groq API', custom: 'groq' },
  { name: 'LLaMA 3.1', icon: `${DEVICON}/meta/meta-original.svg` },
]

export const CYBERSECURITY = [
  { name: 'Kali Linux', icon: `${DEVICON}/linux/linux-original.svg` },
  { name: 'Burp Suite', custom: 'burp' },
  { name: 'OWASP', custom: 'owasp' },
  { name: 'Cryptography', icon: `${DEVICON}/python/python-original.svg` },
]

export const AI_TOOLS_TABLE = [
  { cat: 'LLMs & Assistants', tools: ['ChatGPT', 'Gemini', 'Claude', 'Perplexity', 'Grok', 'DeepSeek', 'LMArena', 'Chat Sutra'] },
  { cat: 'Developer Tools', tools: ['Cursor', 'Windsurf', 'Loveable', 'CodePen', 'Replit', 'Bolt', 'PythonTutor'] },
  { cat: 'Viz & Math', tools: ['Flourish', 'GeoGebra', 'CalcPlot3D'] },
  { cat: 'Creative & Media', tools: ['Canva', 'Midjourney', 'NapkinAI', 'VEED', 'Gamma', 'Eraser', 'Suno AI'] },
  { cat: 'Logic & Workflow', tools: ['Flowgorithm', 'Manas', 'Prompt Cowboy'] },
]
