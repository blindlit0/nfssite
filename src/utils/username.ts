const adjectives = ['Bright', 'Caring', 'Diligent', 'Earnest', 'Friendly', 'Gentle', 'Hopeful', 'Kind', 'Lively', 'Noble', 'Patient', 'Quick', 'Resolute', 'Sincere', 'Steady', 'Vibrant']
const nouns = ['Scholar', 'Researcher', 'Analyst', 'Mentor', 'Leader', 'Innovator', 'Pioneer', 'Guardian', 'Ally', 'Navigator']

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function generateNfssUsername(seed?: number): string {
  const rand = seed ?? Math.floor(Math.random() * 10000)
  const adj = randomItem(adjectives)
  const noun = randomItem(nouns)
  const code = String(rand).padStart(4, '0')
  return `NFSS-${adj}${noun}-${code}`
}


