function Home() {
  function scrollToWelfare() {
    const anchor = document.getElementById('welfare-cta')
    if (anchor) anchor.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero">
      <div>
        <h1>Department of Food Science & Nutrition</h1>
        <p className="muted">
          Advancing food science, human nutrition, and public health through
          research, education, and community impact.
        </p>
      </div>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button onClick={scrollToWelfare}>Learn about Welfare</button>
        <a href="/welfare"><button>Go to Welfare Page</button></a>
      </div>

      <div id="welfare-cta" style={{ marginTop: '2rem' }}>
        <h2>What we do</h2>
        <ul>
          <li>Academic programs and student resources</li>
          <li>Research initiatives and publications</li>
          <li>Community outreach and collaborations bla bla bla</li>
        </ul>
      </div>
    </section>
  )
}

export default Home


