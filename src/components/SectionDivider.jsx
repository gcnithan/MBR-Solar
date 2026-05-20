export default function SectionDivider() {
  return (
    <div className="section-divider-wrap" aria-hidden="true">
      <span className="section-divider-orb" />
      <div className="section-divider max-w-3xl mx-auto opacity-60" />
      <span className="section-divider-orb section-divider-orb--delay" />
    </div>
  )
}
