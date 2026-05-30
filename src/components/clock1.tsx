import React from 'react'

// Legacy clock removed; stub to avoid import errors.
export default function Clock1(): null {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.warn('Clock1 component has been removed.')
  }
  return null
}