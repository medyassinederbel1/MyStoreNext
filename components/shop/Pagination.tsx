'use client'

import { memo } from 'react'

interface Props {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default memo(function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null

  return (
    <nav aria-label="Pagination" style={{ marginTop: 24 }}>
      <ul className="pagination justify-content-center">
        <li className={`page-item${currentPage === 1 ? ' disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Page précédente"
          >
            Précédent
          </button>
        </li>

        {Array.from({ length: totalPages }, (_, i) => (
          <li key={i + 1} className={`page-item${currentPage === i + 1 ? ' active' : ''}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(i + 1)}
              aria-label={`Page ${i + 1}`}
              aria-current={currentPage === i + 1 ? 'page' : undefined}
            >
              {i + 1}
            </button>
          </li>
        ))}

        <li className={`page-item${currentPage === totalPages ? ' disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Page suivante"
          >
            Suivant
          </button>
        </li>
      </ul>
    </nav>
  )
})
