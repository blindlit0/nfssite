// ParticleBackground removed during cleanup.
export function ParticleBackground(): null {
  if (typeof window !== 'undefined') console.warn('ParticleBackground removed during cleanup')
  return null
}
