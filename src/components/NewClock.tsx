// NewClock removed — kept as a stub for compatibility
export default function NewClock(): null {
	if (typeof window !== 'undefined') console.warn('NewClock removed during cleanup')
	return null
}
