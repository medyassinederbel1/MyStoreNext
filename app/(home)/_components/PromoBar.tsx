const PROMOS = [
  { icon: 'fa-refresh', label: 'Retour 30 jours', className: 'promo1' },
  { icon: 'fa-truck', label: 'Livraison gratuite', className: 'promo2' },
  { icon: 'fa-lock', label: 'Paiement sécurisé', className: 'promo3' },
  { icon: 'fa-gift', label: 'Nouveaux produits', className: 'promo4' },
] as const

export default function PromoBar() {
  return (
    <section className="promo-area" aria-label="Nos avantages">
      <div className="zigzag-bottom" />
      <div className="container">
        <div className="row">
          {PROMOS.map(({ icon, label, className }) => (
            <div key={label} className="col-md-3 col-sm-6">
              <div className={`single-promo ${className}`}>
                <i className={`fa ${icon}`} aria-hidden="true" />
                <p>{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
