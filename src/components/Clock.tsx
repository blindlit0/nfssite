import React from 'react'

// Clock component removed. Keep a harmless stub so imports don't break.
export default function Clock(): null {
  // If any code still imports this, warn in dev
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.warn('Clock component has been removed.')
  }
  return null
}