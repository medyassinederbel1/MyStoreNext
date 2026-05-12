'use client'

import type { CheckoutAddress } from '@/types'

const errStyle: React.CSSProperties = {
  color: '#e84c3d',
  fontSize: 11,
  marginTop: 3,
  display: 'block',
}

const invalidInputStyle: React.CSSProperties = {
  borderColor: '#e84c3d',
  boxShadow: '0 0 0 2px rgba(232,76,61,0.18)',
  outline: 'none',
}

interface Props {
  prefix: string
  data: CheckoutAddress
  onChange: (field: keyof CheckoutAddress, value: string) => void
  errors?: Partial<Record<keyof CheckoutAddress, string>>
  showContactFields?: boolean
}

export default function AddressFields({
  prefix,
  data,
  onChange,
  errors = {},
  showContactFields = false,
}: Props) {
  return (
    <>
      <div className="row">
        <div className="col-sm-4">
          <p className="form-row validate-required">
            <label htmlFor={`${prefix}_civility`}>
              Civilité <abbr title="obligatoire" className="required">*</abbr>
            </label>
            <select
              id={`${prefix}_civility`}
              className="input-text"
              value={data.civility}
              onChange={(e) => onChange('civility', e.target.value)}
              required
              aria-required="true"
              aria-invalid={!!errors.civility}
              style={errors.civility ? invalidInputStyle : undefined}
            >
              <option value="">-- Choisir --</option>
              <option value="Mr">M.</option>
              <option value="Mrs">Mme</option>
              <option value="Ms">Mx</option>
            </select>
            {errors.civility && <span role="alert" style={errStyle}>{errors.civility}</span>}
          </p>
        </div>
        <div className="col-sm-4">
          <p className="form-row validate-required">
            <label htmlFor={`${prefix}_first_name`}>
              Prénom <abbr title="obligatoire" className="required">*</abbr>
            </label>
            <input
              type="text"
              id={`${prefix}_first_name`}
              className="input-text"
              value={data.firstName}
              maxLength={60}
              onChange={(e) => onChange('firstName', e.target.value)}
              required
              aria-required="true"
              aria-invalid={!!errors.firstName}
              style={errors.firstName ? invalidInputStyle : undefined}
            />
            {errors.firstName && <span role="alert" style={errStyle}>{errors.firstName}</span>}
          </p>
        </div>
        <div className="col-sm-4">
          <p className="form-row validate-required">
            <label htmlFor={`${prefix}_last_name`}>
              Nom <abbr title="obligatoire" className="required">*</abbr>
            </label>
            <input
              type="text"
              id={`${prefix}_last_name`}
              className="input-text"
              value={data.lastName}
              maxLength={60}
              onChange={(e) => onChange('lastName', e.target.value)}
              required
              aria-required="true"
              aria-invalid={!!errors.lastName}
              style={errors.lastName ? invalidInputStyle : undefined}
            />
            {errors.lastName && <span role="alert" style={errStyle}>{errors.lastName}</span>}
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12">
          <p className="form-row">
            <label htmlFor={`${prefix}_company`}>Société (optionnel)</label>
            <input
              type="text"
              id={`${prefix}_company`}
              className="input-text"
              placeholder="Nom de la société"
              value={data.companyName}
              maxLength={80}
              onChange={(e) => onChange('companyName', e.target.value)}
            />
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12">
          <p className="form-row validate-required">
            <label htmlFor={`${prefix}_address`}>
              Adresse <abbr title="obligatoire" className="required">*</abbr>
            </label>
            <input
              type="text"
              id={`${prefix}_address`}
              className="input-text"
              placeholder="Numéro et nom de rue"
              value={data.street}
              maxLength={100}
              onChange={(e) => onChange('street', e.target.value)}
              required
              aria-required="true"
              aria-invalid={!!errors.street}
              style={errors.street ? invalidInputStyle : undefined}
            />
            {errors.street && <span role="alert" style={errStyle}>{errors.street}</span>}
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-4">
          <p className="form-row validate-required">
            <label htmlFor={`${prefix}_city`}>
              Ville <abbr title="obligatoire" className="required">*</abbr>
            </label>
            <input
              type="text"
              id={`${prefix}_city`}
              className="input-text"
              value={data.city}
              maxLength={60}
              onChange={(e) => onChange('city', e.target.value)}
              required
              aria-required="true"
              aria-invalid={!!errors.city}
              style={errors.city ? invalidInputStyle : undefined}
            />
            {errors.city && <span role="alert" style={errStyle}>{errors.city}</span>}
          </p>
        </div>
        <div className="col-sm-4">
          <p className="form-row validate-required">
            <label htmlFor={`${prefix}_county`}>
              Région <abbr title="obligatoire" className="required">*</abbr>
            </label>
            <input
              type="text"
              id={`${prefix}_county`}
              className="input-text"
              value={data.county}
              maxLength={60}
              onChange={(e) => onChange('county', e.target.value)}
              required
              aria-required="true"
              aria-invalid={!!errors.county}
              style={errors.county ? invalidInputStyle : undefined}
            />
            {errors.county && <span role="alert" style={errStyle}>{errors.county}</span>}
          </p>
        </div>
        <div className="col-sm-4">
          <p className="form-row validate-required">
            <label htmlFor={`${prefix}_zip`}>
              Code postal <abbr title="obligatoire" className="required">*</abbr>
            </label>
            <input
              type="text"
              id={`${prefix}_zip`}
              className="input-text"
              placeholder="Ex : 75001"
              value={data.zipCode}
              maxLength={10}
              onChange={(e) => onChange('zipCode', e.target.value)}
              required
              aria-required="true"
              aria-invalid={!!errors.zipCode}
              style={errors.zipCode ? invalidInputStyle : undefined}
            />
            {errors.zipCode && <span role="alert" style={errStyle}>{errors.zipCode}</span>}
          </p>
        </div>
      </div>

      {showContactFields && (
        <div className="row">
          <div className="col-sm-6">
            <p className="form-row validate-required validate-email">
              <label htmlFor={`${prefix}_email`}>
                Email <abbr title="obligatoire" className="required">*</abbr>
              </label>
              <input
                type="email"
                id={`${prefix}_email`}
                className="input-text"
                value={data.email}
                maxLength={254}
                onChange={(e) => onChange('email', e.target.value)}
                required
                aria-required="true"
                aria-invalid={!!errors.email}
                style={errors.email ? invalidInputStyle : undefined}
              />
              {errors.email && <span role="alert" style={errStyle}>{errors.email}</span>}
            </p>
          </div>
          <div className="col-sm-6">
            <p className="form-row validate-required validate-phone">
              <label htmlFor={`${prefix}_phone`}>
                Téléphone <abbr title="obligatoire" className="required">*</abbr>
              </label>
              <input
                type="tel"
                id={`${prefix}_phone`}
                className="input-text"
                value={data.phone}
                maxLength={20}
                onChange={(e) => onChange('phone', e.target.value)}
                required
                aria-required="true"
                aria-invalid={!!errors.phone}
                style={errors.phone ? invalidInputStyle : undefined}
              />
              {errors.phone && <span role="alert" style={errStyle}>{errors.phone}</span>}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
