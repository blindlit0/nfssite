
export default function EyeIcon({ visible }: { visible: boolean }) {
  return (
    <>
      {visible ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5 0-9.27-3-11-7a11.28 11.28 0 0 1 5.7-6.01"/><path d="M1 1l22 22"/></svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1.05 12a11 11 0 0 1 21.9 0 11 11 0 0 1-21.9 0z"/><circle cx="12" cy="12" r="3"/></svg>
      )}
    </>
  )
}
