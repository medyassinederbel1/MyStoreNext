const sk = (h: number, mb = 0, radius = 4) => ({
  height: h,
  background: '#f0f0f0',
  borderRadius: radius,
  marginBottom: mb,
  animation: 'pulse 1.5s ease-in-out infinite',
})

export default function HomeSkeleton() {
  return (
    <>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}`}</style>

      {/* Carousel skeleton */}
      <div style={sk(350, 0)}  />

      {/* PromoBar skeleton */}
      <div style={{ ...sk(60, 0), marginBottom: 0 }} />

      {/* Brands skeleton */}
      <div style={{ padding: '30px 0', background: '#fafafa' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} style={sk(50, 0, 8)} className="brand-skeleton" />
            ))}
          </div>
        </div>
        <style>{`.brand-skeleton{width:120px}`}</style>
      </div>

      {/* Widgets skeleton */}
      <div className="product-widget-area">
        <div className="zigzag-bottom" />
        <div className="container">
          <div className="row">
            {Array.from({ length: 3 }, (_, col) => (
              <div key={col} className="col-md-4">
                <div style={sk(24, 16, 4)} />
                {Array.from({ length: 4 }, (_, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
                    <div style={{ ...sk(70, 0, 4), width: 70, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={sk(14, 8, 4)} />
                      <div style={sk(14, 8, 4)} />
                      <div style={{ ...sk(14, 0, 4), width: '60%' }} />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
