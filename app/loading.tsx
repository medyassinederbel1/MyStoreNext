export default function Loading() {
  return (
    <main
      style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <i
          className="fa fa-spinner fa-spin"
          style={{ fontSize: 48, color: '#e84c3d', display: 'block', marginBottom: 16 }}
        />
        <p style={{ color: '#6b7280', fontSize: '1rem', fontWeight: 500, margin: 0 }}>
          Chargement en cours…
        </p>
      </div>
    </main>
  )
}
