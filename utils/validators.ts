import { z } from 'zod'
import type { Address } from '@/types'


function firstError(schema: z.ZodTypeAny, value: string): string {
  const result = schema.safeParse(value)
  if (!result.success) return result.error.issues[0]?.message ?? ''
  return ''
}


const nameSchema = z
  .string()
  .trim()
  .min(1, 'Ce champ est requis')
  .min(2, 'Minimum 2 caractères')
  .max(60, 'Maximum 60 caractères')
  .regex(/^[-A-Za-zÀ-ÖØ-öø-ÿ\s']+$/, 'Lettres uniquement (pas de chiffres ni symboles)')

const emailSchema = z
  .string()
  .trim()
  .min(1, 'Email requis')
  .max(254, 'Email trop long')
  .email('Adresse email invalide')

const phoneSchema = z
  .string()
  .trim()
  .min(1, 'Téléphone requis')
  .regex(/^[+\d\s()\-.]{6,20}$/, 'Numéro invalide (6–20 chiffres, + autorisé)')

const addressLineSchema = z
  .string()
  .trim()
  .min(1, 'Adresse requise')
  .min(5, 'Adresse trop courte (min. 5 caractères)')
  .max(100, 'Maximum 100 caractères')

const citySchema = z
  .string()
  .trim()
  .min(1, 'Ville requise')
  .min(2, 'Minimum 2 caractères')
  .max(60, 'Maximum 60 caractères')

const zipSchema = z
  .string()
  .min(1, 'Code postal requis')
  .refine(
    (v) => /^\d{4,10}$/.test(v.replace(/\s/g, '')),
    'Code postal invalide (4–10 chiffres)',
  )

const countrySchema = z
  .string()
  .trim()
  .min(1, 'Pays requis')
  .min(2, 'Minimum 2 caractères')
  .max(60, 'Maximum 60 caractères')

const ibanSchema = z
  .string()
  .min(1, 'IBAN requis')
  .refine(
    (v) => v.replace(/\s/g, '').length <= 34,
    'IBAN trop long (max 34 caractères sans espaces)',
  )
  .refine(
    (v) => /^[A-Z]{2}\d{2}[A-Z0-9]{4,30}$/.test(v.replace(/\s/g, '').toUpperCase()),
    'Format IBAN invalide (ex: FR76 3000 4000 …)',
  )

const bicSchema = z
  .string()
  .trim()
  .min(1, 'BIC / SWIFT requis')
  .refine(
    (v) => /^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(v.toUpperCase()),
    'Format BIC invalide (8 ou 11 caractères, ex: BNPAFRPP)',
  )

const chequeNameSchema = z
  .string()
  .trim()
  .min(1, 'Nom sur le chèque requis')
  .max(80, 'Maximum 80 caractères')


export const validateName = (v: string): string => firstError(nameSchema, v)
export const validateEmail = (v: string): string => firstError(emailSchema, v)
export const validatePhone = (v: string): string => firstError(phoneSchema, v)
export const validateAddressLine = (v: string): string => firstError(addressLineSchema, v)
export const validateCity = (v: string): string => firstError(citySchema, v)
export const validateZip = (v: string): string => firstError(zipSchema, v)
export const validateCountry = (v: string): string => firstError(countrySchema, v)
export const validateIban = (v: string): string => firstError(ibanSchema, v)
export const validateBic = (v: string): string => firstError(bicSchema, v)
export const validateChequeName = (v: string): string => firstError(chequeNameSchema, v)

export const validateAddress = (addr: Address): Record<keyof Address, string> => ({
  firstName: validateName(addr.firstName),
  lastName: validateName(addr.lastName),
  email: validateEmail(addr.email),
  phone: validatePhone(addr.phone),
  address: validateAddressLine(addr.address),
  city: validateCity(addr.city),
  zipCode: validateZip(addr.zipCode),
  country: validateCountry(addr.country),
})

export const hasErrors = (errors: Record<string, string>): boolean =>
  Object.values(errors).some((e) => e !== '')


export const schemas = {
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  addressLine: addressLineSchema,
  city: citySchema,
  zip: zipSchema,
  country: countrySchema,
  iban: ibanSchema,
  bic: bicSchema,
  chequeName: chequeNameSchema,
} as const
