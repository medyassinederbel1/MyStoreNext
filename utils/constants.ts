export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'
export const PRODUCTS_PER_PAGE = 12
export const TAX_RATE = 0.20

export const PAYMENT_METHODS = [
  { value: 'bacs', label: 'Virement bancaire (BACS)' },
  { value: 'cheque', label: 'Paiement par chèque' },
  { value: 'paypal', label: 'PayPal' },
] as const

export const SORT_OPTIONS = [
  { value: '', label: 'Défaut' },
  { value: 'price_asc', label: 'Prix croissant' },
  { value: 'price_desc', label: 'Prix décroissant' },
  { value: 'review_desc', label: 'Meilleures notes' },
] as const
