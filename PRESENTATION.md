# MyStore — Présentation Jury PFE 2026

> Projet e-commerce Next.js 15 — Smartphones, Tablettes & Montres connectées  
> Architecture App Router · SSR · ISR · Server/Client Components · Redux Toolkit

---

## Table des matières

1. [Vue d'ensemble du projet](#1-vue-densemble-du-projet)
2. [Architecture du projet](#2-architecture-du-projet)
3. [Stratégies de rendu — SSR, ISR, CSR](#3-stratégies-de-rendu--ssr-isr-csr)
4. [Tableau complet des fichiers SSR et pourquoi](#4-tableau-complet-des-fichiers-ssr-et-pourquoi)
5. [Server Components vs Client Components](#5-server-components-vs-client-components)
6. [Performance & Lazy Loading](#6-performance--lazy-loading)
7. [Routing — App Router Next.js 15](#7-routing--app-router-nextjs-15)
8. [Gestion d'état — Redux Toolkit](#8-gestion-détat--redux-toolkit)
9. [SEO & Metadata](#9-seo--metadata)
10. [Qualité du code](#10-qualité-du-code)
11. [Questions possibles du jury — avec réponses complètes](#11-questions-possibles-du-jury--avec-réponses-complètes)

---

## 1. Vue d'ensemble du projet

**MyStore** est une boutique en ligne complète construite avec **Next.js 15 App Router**.

| Élément | Technologie |
|---|---|
| Framework | Next.js 15 (App Router) |
| Langage | TypeScript |
| Gestion d'état | Redux Toolkit |
| Validation | Zod |
| Backend mock | json-server (port 3001) |
| CSS | Bootstrap + CSS custom |
| Déploiement | GitHub (`medyassinederbel1/MyStoreNext`) |

### Pages disponibles

| URL | Description |
|---|---|
| `/` | Page d'accueil — carousel, promotions, marques, widgets |
| `/shop` | Catalogue complet avec filtres |
| `/shop/[categoryId]` | Catalogue par marque (Apple, Samsung…) |
| `/product/[id]` | Fiche produit détaillée |
| `/search?q=...` | Résultats de recherche |
| `/cart` | Panier d'achat |
| `/checkout` | Tunnel de commande (adresse + paiement) |

---

## 2. Architecture du projet

```
nextjs/
├── app/
│   ├── layout.tsx                     ← Layout racine (Server Component)
│   ├── loading.tsx                    ← Fallback Suspense global
│   ├── error.tsx                      ← Error Boundary global
│   ├── not-found.tsx                  ← Page 404 personnalisée
│   │
│   ├── (home)/                        ← Route Group (pas de segment URL)
│   │   ├── page.tsx                   ← SSR/ISR — Page d'accueil
│   │   └── _components/              ← Dossier privé (convention Next.js)
│   │       ├── Carousel.tsx           ← Server Component
│   │       ├── CarouselSlider.tsx     ← Client Component ('use client')
│   │       ├── Brands.tsx             ← Server Component
│   │       ├── PromoBar.tsx           ← Server Component
│   │       ├── ProductWidgetCard.tsx  ← Server Component
│   │       └── HomeClientWidgets.tsx  ← Client Component
│   │
│   ├── product/[id]/
│   │   ├── page.tsx                   ← SSR/ISR — Fiche produit
│   │   ├── error.tsx
│   │   └── _components/
│   │       ├── ProductInfo.tsx        ← Server Component
│   │       ├── ProductSidebar.tsx     ← Server Component
│   │       ├── ProductAddToCartClient.tsx  ← Client Component
│   │       └── RecentlyViewedSidebarClient.tsx ← Client Component
│   │
│   ├── shop/
│   │   ├── page.tsx                   ← Server Component (wrapper Suspense)
│   │   ├── error.tsx
│   │   ├── [categoryId]/
│   │   │   ├── page.tsx               ← SSR/ISR — Catalogue catégorie
│   │   │   └── error.tsx
│   │   └── _components/
│   │       ├── ShopContent.tsx        ← Client Component (filtres URL)
│   │       ├── ProductGrid.tsx        ← Client Component
│   │       └── ShopSidebar.tsx        ← Client Component
│   │
│   ├── search/
│   │   ├── page.tsx                   ← Server Component (wrapper Suspense)
│   │   └── _components/
│   │       └── SearchContent.tsx      ← Client Component
│   │
│   ├── cart/
│   │   ├── page.tsx                   ← Server Component (shell)
│   │   └── _components/
│   │       ├── CartContent.tsx        ← Client Component
│   │       ├── CartTable.tsx          ← Client Component
│   │       ├── CartItem.tsx           ← Client Component
│   │       └── CartSummary.tsx        ← Client Component
│   │
│   └── checkout/
│       ├── page.tsx                   ← Server Component (shell)
│       └── _components/
│           ├── CheckoutContent.tsx    ← Client Component
│           ├── CheckoutStepper.tsx    ← Server Component
│           ├── Step1Address.tsx       ← Client Component
│           ├── Step2Payment.tsx       ← Client Component
│           ├── AddressFields.tsx      ← Client Component
│           ├── PaymentMethodSelector.tsx ← Client Component
│           └── OrderSummaryTable.tsx  ← Server Component
│
├── components/                        ← Composants PARTAGÉS
│   ├── layout/
│   │   ├── Header.tsx                 ← Server Component
│   │   ├── Navigation.tsx             ← Server Component
│   │   ├── NavLinks.tsx               ← Client Component (pathname actif)
│   │   ├── HeaderSearch.tsx           ← Client Component (input search)
│   │   ├── HeaderCart.tsx             ← Client Component (Redux store)
│   │   ├── Footer.tsx                 ← Server Component
│   │   └── FooterNewsletter.tsx       ← Client Component (formulaire)
│   └── shop/
│       ├── ProductShopCard.tsx        ← Server Component
│       ├── ProductShopCardActions.tsx ← Client Component (panier)
│       └── Pagination.tsx             ← Client Component (onClick)
│
├── hooks/
│   ├── useAsync.ts                    ← Hook data fetching générique
│   ├── useCart.ts                     ← Hook Redux cart
│   ├── useDebounce.ts                 ← Hook debounce recherche
│   ├── useShopFilters.ts              ← Hook filtres URL complexe
│   └── useViewedProducts.ts           ← Utilitaire localStorage
│
├── store/
│   ├── index.ts                       ← Store Redux + typed hooks
│   └── cartSlice.ts                   ← Slice cart (CRUD async thunks)
│
├── api/
│   ├── client.ts                      ← apiFetch avec gestion erreurs
│   ├── products.ts                    ← GET /products, GET /products/:id
│   ├── categories.ts                  ← GET /categories
│   ├── slides.ts                      ← GET /slides
│   └── orders.ts                      ← POST /orders
│
├── providers/
│   └── Providers.tsx                  ← Redux Provider + CartInitializer
│
├── types/index.ts                     ← Tous les types TypeScript
└── utils/
    ├── constants.ts                   ← PRODUCTS_PER_PAGE, SORT_OPTIONS…
    └── validators.ts                  ← Schémas Zod + fonctions validate*
```

---

## 3. Stratégies de rendu — SSR, ISR, CSR

### Définitions clés

| Stratégie | Sigle | Quand le HTML est généré |
|---|---|---|
| **Server-Side Rendering** | SSR | À chaque requête, sur le serveur |
| **Incremental Static Regeneration** | ISR | Statique, régénéré toutes les N secondes |
| **Client-Side Rendering** | CSR | Dans le navigateur, après chargement JS |
| **Static Site Generation** | SSG | Au build, une seule fois |

### Ce qu'on utilise dans ce projet

```
ISR (revalidate = 60)   →  app/(home)/page.tsx
                        →  app/product/[id]/page.tsx
                        →  app/shop/[categoryId]/page.tsx

Server Component pur    →  app/layout.tsx
                        →  app/shop/page.tsx
                        →  app/search/page.tsx
                        →  app/cart/page.tsx
                        →  app/checkout/page.tsx
                        →  components/layout/Header.tsx
                        →  components/layout/Footer.tsx
                        →  components/shop/ProductShopCard.tsx

Client Component        →  Tout composant avec 'use client'
('use client')          →  (interactions, useState, useEffect, Redux)
```

### Schéma du flux ISR

```
1ère visite           →  Next.js génère le HTML sur le serveur
                         et le met en cache

Visites suivantes     →  Le cache est servi instantanément
(< 60 secondes)          (0ms de génération)

Après 60 secondes     →  Prochain visiteur reçoit l'ancien cache
(revalidate = 60)        Next.js régénère en arrière-plan
                         Le suivant reçoit le nouveau contenu
```

---

## 4. Tableau complet des fichiers SSR et pourquoi

### Pages avec `export const revalidate = 60` (ISR)

| Fichier | Stratégie | Données fetchées | Pourquoi ISR et pas SSR pur ? |
|---|---|---|---|
| `app/(home)/page.tsx` | **ISR 60s** | slides, categories, produits nouveaux | La page d'accueil est visitée par des milliers d'utilisateurs. Avec SSR pur, chaque visite recharge l'API. Avec ISR, le HTML est mis en cache 60 secondes — performance maximale. Les données changent rarement en moins d'une minute. |
| `app/product/[id]/page.tsx` | **ISR 60s** | product, categories | Une fiche produit est identique pour tous les visiteurs. Inutile de la recalculer à chaque requête. Avec `generateStaticParams`, les 100 fiches sont pré-générées au build et régénérées toutes les 60s si le prix ou le stock change. |
| `app/shop/[categoryId]/page.tsx` | **ISR 60s** | categories (pour metadata) | Le shell de la page est statique. Le contenu produit est chargé côté client via `ShopContent` (filtres dynamiques). On évite de bloquer le rendu serveur sur des données de filtres volatiles. |

### Pages Server Components sans revalidate (SSG implicite)

| Fichier | Stratégie | Pourquoi ? |
|---|---|---|
| `app/shop/page.tsx` | **SSG** | Shell pur, pas de données propres. Le contenu est entièrement délégué à `ShopContent` (CSR). |
| `app/search/page.tsx` | **SSG** | La recherche dépend du paramètre `?q=` — impossible à pré-générer. Le shell est statique, le contenu est CSR via `SearchContent`. |
| `app/cart/page.tsx` | **SSG** | Le panier est 100% côté client (localStorage + Redux). Le serveur ne connaît pas l'état du panier de l'utilisateur. |
| `app/checkout/page.tsx` | **SSG** | Même raison que le panier. Les données de commande sont privées et éphémères. |
| `app/layout.tsx` | **SSG** | Layout racine partagé par toutes les pages. Metadata globale, Providers Redux, import CSS. |
| `app/not-found.tsx` | **SSG** | Page 404 statique, même contenu pour tous. |

### Composants Server (sans 'use client')

| Fichier | Pourquoi Server Component ? |
|---|---|
| `components/layout/Header.tsx` | Pas d'interactivité. Rendu HTML pur, zéro JS côté client. Contient le logo et structure générale. |
| `components/layout/Navigation.tsx` | Wrapper sémantique `<nav>`. Les liens actifs sont gérés par `NavLinks.tsx` (client). |
| `components/layout/Footer.tsx` | Contenu statique. Le formulaire newsletter est isolé dans `FooterNewsletter.tsx` (client). |
| `components/shop/ProductShopCard.tsx` | La carte produit est un composant d'affichage pur. L'interactivité (panier) est déléguée à `ProductShopCardActions.tsx` (client). |
| `app/(home)/_components/Brands.tsx` | Affichage de logos. Aucune interactivité. |
| `app/(home)/_components/PromoBar.tsx` | Texte statique. Aucune interactivité. |
| `app/(home)/_components/ProductWidgetCard.tsx` | Affichage d'une vignette produit. Aucune interactivité. |
| `app/product/[id]/_components/ProductInfo.tsx` | Affiche le nom, prix, note, stock. Données reçues en props depuis la page SSR. |
| `app/product/[id]/_components/ProductSidebar.tsx` | Liste de catégories. Données statiques reçues en props. |

### Composants Client (avec 'use client')

| Fichier | Pourquoi Client Component ? |
|---|---|
| `components/layout/NavLinks.tsx` | Utilise `usePathname()` pour détecter la route active (hook Next.js). |
| `components/layout/HeaderSearch.tsx` | `useState` sur l'input, `useRouter` pour naviguer. |
| `components/layout/HeaderCart.tsx` | Lit le store Redux (`useSelector`). |
| `components/layout/FooterNewsletter.tsx` | `useState` pour le formulaire et le message de succès. |
| `components/shop/ProductShopCardActions.tsx` | `useCart()`, `useState` (viewed), `useEffect` pour localStorage. |
| `components/shop/Pagination.tsx` | `onClick` pour changer de page. |
| `app/(home)/_components/CarouselSlider.tsx` | react-slick accède à `window` — incompatible serveur. Importé via `dynamic({ ssr: false })`. |
| `app/(home)/_components/HomeClientWidgets.tsx` | `useAsync` + `useState` pour les onglets Top Sellers / Featured. |
| `app/shop/_components/ShopContent.tsx` | `useSearchParams`, `useRouter` pour les filtres URL. |
| `app/shop/_components/ShopSidebar.tsx` | `useState` pour les filtres actifs. |
| `app/shop/_components/ProductGrid.tsx` | `aria-busy={loading}` dynamique, skeleton loading. |
| `app/search/_components/SearchContent.tsx` | `useSearchParams()` pour lire `?q=`. |
| `app/cart/_components/CartContent.tsx` | `useSelector` Redux pour lire le panier. |
| `app/cart/_components/CartItem.tsx` | `useCart()` — dispatch updateCart, removeItem. |
| `app/cart/_components/CartSummary.tsx` | `useCart()` — affichage total. |
| `app/checkout/_components/Step1Address.tsx` | `useState` pour formulaire + validation Zod. |
| `app/checkout/_components/Step2Payment.tsx` | `useState`, `useDispatch`, appel API `postOrder`. |
| `app/product/[id]/_components/ProductAddToCartClient.tsx` | `useCart()` + `useState` quantité. |
| `app/product/[id]/_components/RecentlyViewedSidebarClient.tsx` | `useEffect` pour localStorage `viewedProducts`. |

---

## 5. Server Components vs Client Components

### Règle fondamentale

```
Par défaut dans App Router → tout est Server Component
Ajouter 'use client' uniquement quand nécessaire
```

### Quand mettre 'use client' ?

| Besoin | Hook / API utilisée |
|---|---|
| État local | `useState`, `useReducer` |
| Effets / lifecycle | `useEffect`, `useLayoutEffect` |
| Accès au navigateur | `window`, `localStorage`, `document` |
| Navigation client | `useRouter`, `usePathname`, `useSearchParams` |
| Accès au store Redux | `useSelector`, `useDispatch` |
| Événements DOM | `onClick`, `onChange`, `onSubmit` |

### Avantages des Server Components

- **Zéro JavaScript** envoyé au client pour ces composants
- Fetch direct côté serveur → pas de waterfall réseau
- Accès aux variables d'environnement serveur (`process.env`)
- Meilleur score **Lighthouse** (LCP, FID, CLS)

### Pattern "îlot d'interactivité"

```
ProductShopCard.tsx (Server)
    └── affiche nom, image, prix  →  HTML pur, 0 KB JS
    └── ProductShopCardActions.tsx (Client)
            └── bouton panier     →  JS minimal, seulement pour l'action
```

---

## 6. Performance & Lazy Loading

### Images — next/image

Tous les composants utilisent `<Image>` de Next.js :

```tsx
// Images non critiques → lazy loading automatique
<Image loading="lazy" ... />

// Image principale produit → priorité haute (LCP)
<Image priority ... />  // app/product/[id]/page.tsx
```

**Avantages** :
- Redimensionnement automatique selon l'écran (srcset)
- Conversion WebP/AVIF automatique
- Prévention du CLS (réserve l'espace avant chargement)
- Lazy loading natif (`loading="lazy"`)

### Carousel — dynamic import avec ssr: false

```tsx
// app/(home)/components/Carousel.tsx
const CarouselSlider = dynamic(() => import('./CarouselSlider'), {
  ssr: false,
  loading: () => <div aria-label="Chargement du carousel…" />,
})
```

**Pourquoi `ssr: false` ?**  
react-slick utilise `window.matchMedia` au chargement. Cette API n'existe pas dans l'environnement Node.js. Sans `ssr: false`, le build plante avec `ReferenceError: window is not defined`.

### optimizePackageImports — next.config.ts

```ts
experimental: {
  optimizePackageImports: ['react-slick'],
}
```

Réduit le bundle JavaScript en n'important que les fonctions réellement utilisées de react-slick (tree-shaking amélioré).

### Debounce sur la recherche

```ts
// hooks/useDebounce.ts
export function useDebounce<T>(value: T, delay = 500): T
```

L'utilisateur tape → on attend 500ms d'inactivité → on déclenche l'API. Sans debounce : 1 requête par touche clavier.

### Suspense + Loading

```tsx
// app/shop/page.tsx
<Suspense fallback={<Loading />}>
  <ShopContent />
</Suspense>
```

Pendant que `ShopContent` charge, Next.js affiche le skeleton `loading.tsx` — l'UI reste réactive.

---

## 7. Routing — App Router Next.js 15

### Structure des routes

| Dossier | URL générée | Type |
|---|---|---|
| `app/(home)/page.tsx` | `/` | Route Group (pas de segment) |
| `app/shop/page.tsx` | `/shop` | Route statique |
| `app/shop/[categoryId]/page.tsx` | `/shop/Apple` | Route dynamique |
| `app/product/[id]/page.tsx` | `/product/42` | Route dynamique |
| `app/search/page.tsx` | `/search` | Route statique |
| `app/cart/page.tsx` | `/cart` | Route statique |
| `app/checkout/page.tsx` | `/checkout` | Route statique |

### Route Groups `(home)`

```
app/
  (home)/          ← les parenthèses excluent ce dossier de l'URL
    page.tsx       → accessible à "/"
    components/    → co-localisation des composants de la home
```

**Pourquoi ?** Permet de co-localiser les composants avec leur page sans créer de segment URL parasite (`/home/...`).

### generateStaticParams — pré-génération des pages dynamiques

```ts
// app/product/[id]/page.tsx
export async function generateStaticParams() {
  const { products } = await getProducts({ _limit: 100 })
  return products.map((p) => ({ id: String(p.id) }))
}
```

Au moment du `npm run build`, Next.js appelle cette fonction et **pré-génère les 100 pages produit en HTML statique**. Aucune requête API n'est nécessaire à la visite — vitesse maximale.

Même principe pour `app/shop/[categoryId]/page.tsx` avec les 5 catégories.

### Fichiers spéciaux App Router

| Fichier | Rôle |
|---|---|
| `layout.tsx` | Shell partagé, rendu autour de toutes les pages enfants |
| `page.tsx` | Contenu de la route |
| `loading.tsx` | Skeleton affiché pendant le streaming SSR |
| `error.tsx` | Error Boundary React (doit être Client Component) |
| `not-found.tsx` | Page 404 personnalisée |

### Gestion des erreurs par route

Chaque route a son propre `error.tsx` :
```
app/error.tsx                   ← Global
app/cart/error.tsx              ← Erreur spécifique cart
app/checkout/error.tsx
app/shop/error.tsx
app/shop/[categoryId]/error.tsx
app/search/error.tsx
app/product/[id]/error.tsx
```

Un crash dans `/product/42` n'affecte pas `/cart`.

---

## 8. Gestion d'état — Redux Toolkit

### Pourquoi Redux et pas Context ?

| Critère | Context API | Redux Toolkit |
|---|---|---|
| Re-renders | Tous les consommateurs re-render | Seulement les composants abonnés à la slice concernée |
| DevTools | Non | Oui (Redux DevTools Extension) |
| Middleware async | Non natif | `createAsyncThunk` intégré |
| Persistance | Manuel | Facile (localStorage + `Providers.tsx`) |

### cartSlice — opérations asynchrones

```
createCart   →  POST /carts     (panier inexistant)
loadCart     →  GET  /carts/:id (restauration localStorage)
updateCart   →  PUT  /carts/:id (ajout, modification quantité)
deleteCart   →  DELETE /carts/:id (vidage panier)
```

Chaque thunk gère ses états `pending / fulfilled / rejected` :
```ts
builder.addCase(createCart.pending,   (state) => { state.loading = true })
builder.addCase(createCart.fulfilled, (state, action) => {
  state.loading = false
  state.cart = action.payload
})
```

### Persistance du panier

```ts
// providers/Providers.tsx — CartInitializer
useEffect(() => {
  const storedCartId = localStorage.getItem('cartId')
  if (storedCartId) void dispatch(loadCart(storedCartId))
}, [dispatch])
```

À chaque rechargement de page, si un `cartId` existe en localStorage, le panier est rechargé depuis l'API.

### Typed hooks (store/index.ts)

```ts
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
```

Évite les erreurs TypeScript et l'import répété des types dans chaque composant.

---

## 9. SEO & Metadata

### Metadata statique (layout racine)

```ts
// app/layout.tsx
export const metadata: Metadata = {
  title: { default: 'MyStore', template: '%s | MyStore' },
  description: '...',
  keywords: ['smartphone', 'tablette'...],
  openGraph: { type: 'website', locale: 'fr_FR', siteName: 'MyStore' },
}
```

Le template `'%s | MyStore'` permet à chaque page de définir seulement son titre court :  
`"iPhone 11" → "iPhone 11 | MyStore"` dans l'onglet navigateur.

### generateMetadata — SEO dynamique

```ts
// app/product/[id]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const product = await getProductById(Number(id))
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      images: [`/images/products/${product.categoryName}/${product.imageName}`],
    },
  }
}
```

Chaque fiche produit a une meta description et une image OG unique → meilleur référencement Google et partage réseau social.

### Viewport

```ts
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}
```

Séparé de `metadata` depuis Next.js 14 — obligatoire pour éviter les warnings.

---

## 10. Qualité du code

### TypeScript strict

- Tous les fichiers en `.tsx` / `.ts`
- Types centralisés dans `types/index.ts`
- Pas de `any` dans le code

### Accessibilité (ARIA)

- Éléments sémantiques : `<header>`, `<nav>`, `<footer>`, `<aside>`, `<article>`, `<section>`
- `aria-label` sur tous les boutons sans texte visible
- `aria-live="polite"` sur les zones mises à jour dynamiquement
- `aria-busy={loading}` sur les grilles de produits
- `aria-current="step"` sur le stepper checkout
- `role="alert"` sur les messages d'erreur de formulaire
- `aria-required`, `aria-invalid` sur les champs de formulaire

### Hooks personnalisés

| Hook | Rôle |
|---|---|
| `useAsync` | Fetch générique avec états loading/error/data + refetch |
| `useCart` | Abstraction Redux cart — addItem, removeItem, setQuantity |
| `useDebounce` | Retarde la valeur d'un state (recherche) |
| `useShopFilters` | Synchronise filtres ↔ URL (useSearchParams + useRouter) |

### Validation Zod

Tous les formulaires utilisent des schémas Zod avec messages en français :
```ts
const nameSchema = z.string()
  .min(2, 'Minimum 2 caractères')
  .regex(/^[-A-Za-zÀ-ÖØ-öø-ÿ\s']+$/, 'Lettres uniquement')
```

---

## 11. Questions possibles du jury — avec réponses complètes

---

### BLOC SSR / RENDU

**Q : Quelle est la différence entre SSR et SSG ?**

> **SSR** (Server-Side Rendering) : le HTML est généré à chaque requête, au moment où l'utilisateur visite la page. Les données sont toujours fraîches mais chaque requête a un coût serveur.
>
> **SSG** (Static Site Generation) : le HTML est généré une seule fois au moment du `npm run build`. Très rapide à servir, mais les données ne se mettent pas à jour sans un nouveau build.

---

**Q : Qu'est-ce que l'ISR et pourquoi l'avez-vous choisi ?**

> **ISR** (Incremental Static Regeneration) est un hybride entre SSR et SSG. On définit `export const revalidate = 60` dans la page. La page est générée statiquement comme en SSG, mais elle est **régénérée automatiquement en arrière-plan** toutes les 60 secondes si quelqu'un la visite.
>
> On l'a choisi pour les pages d'accueil, fiche produit et catégorie car :
> - Les données (prix, stock, nouveaux produits) changent, mais rarement en moins d'une minute
> - Des milliers d'utilisateurs peuvent visiter en même temps → le cache évite de surcharger l'API
> - Meilleure performance que SSR pur, données plus fraîches que SSG pur

---

**Q : Pourquoi la page cart est un Server Component alors que le panier est côté client ?**

> La page `app/cart/page.tsx` est un **shell vide** — elle rend seulement le Header, Footer et importe `CartContent`. Elle-même n'a aucune donnée à fetcher côté serveur car le panier est privé à l'utilisateur (stocké dans localStorage + Redux).
>
> `CartContent` est marqué `'use client'` et lit le store Redux. Le Server Component sert uniquement de layout stable et rapide à servir.

---

**Q : Pourquoi utiliser `generateStaticParams` ?**

> Sans `generateStaticParams`, Next.js génère les pages dynamiques `/product/[id]` à la première visite (SSR à la demande). Avec `generateStaticParams`, on lui dit **quelles valeurs de `id` exister** au moment du build.
>
> Résultat : les 100 fiches produit sont **pré-compilées en HTML** au build. La visite `/product/42` répond instantanément depuis le cache CDN — aucune requête API n'est faite.

---

**Q : Pourquoi `ssr: false` pour le Carousel ?**

> La librairie **react-slick** accède à `window.matchMedia` et `document` au moment de son initialisation. Ces APIs n'existent pas dans Node.js (environnement serveur).
>
> Sans `ssr: false`, le rendu serveur plante avec `ReferenceError: window is not defined`.
>
> `dynamic(() => import('./CarouselSlider'), { ssr: false })` indique à Next.js de charger ce composant **uniquement dans le navigateur**, après l'hydratation.

---

### BLOC ARCHITECTURE

**Q : Pourquoi utiliser le App Router et pas le Pages Router ?**

> Le **App Router** (Next.js 13+) est l'architecture recommandée par Vercel. Il apporte :
> - **Server Components** par défaut → moins de JS envoyé au client
> - **Layouts imbriqués** → le Header ne se remonte pas à chaque navigation
> - **Streaming SSR** avec Suspense → l'utilisateur voit du contenu progressivement
> - **Route Groups** `(home)` → co-localisation des composants sans pollution de l'URL
> - `generateMetadata` async → SEO dynamique par route
>
> Le Pages Router ne supporte pas les Server Components.

---

**Q : Pourquoi co-localiser les composants dans `app/<route>/_components/` ?**

> C'est une **architecture feature-based** (recommandée par Next.js). Les composants qui ne sont utilisés que par une seule route vivent à côté de cette route dans un dossier `_components/`. Le préfixe `_` est une **convention Next.js App Router** qui marque le dossier comme **privé** — Next.js l'exclut automatiquement du système de routing, même si un fichier `page.tsx` y était ajouté par erreur.
>
> Seuls les composants réutilisés par plusieurs routes (Header, Footer, ProductShopCard, Pagination) restent dans `components/` à la racine de `nextjs/`.

---

**Q : Qu'est-ce qu'un Route Group ?**

> Un **Route Group** est un dossier dont le nom est entre parenthèses : `(home)`. Next.js **ignore ce segment dans l'URL** mais l'utilise pour organiser le code.
>
> `app/(home)/page.tsx` est accessible à `/` et non `/home`.
>
> Cela permet de co-localiser `Carousel.tsx`, `Brands.tsx`, etc. dans `_components/` avec la page d'accueil sans créer de route parasite.

---

**Q : Pourquoi nommer les dossiers de composants `_components` et pas `components` ?**

> C'est la **convention officielle Next.js App Router** pour les **dossiers privés**. Le préfixe `_` signale à Next.js que ce dossier doit être **exclu du système de routing**, même s'il se trouve dans `app/`.
>
> Sans ce préfixe, Next.js pourrait tenter d'interpréter un fichier `page.tsx` placé accidentellement dans `components/` comme une route accessible. Avec `_components/`, ce risque est éliminé.
>
> Les dossiers `_components/` co-localisés (à côté de chaque route) contiennent les composants **privés à cette route**. Le dossier `components/` à la racine (hors `app/`) reste sans préfixe car il est hors du scope du routeur.

---

**Q : Comment fonctionne la gestion des erreurs par route ?**

> Chaque route peut avoir un fichier `error.tsx`. C'est un **Error Boundary React** qui capture les erreurs JavaScript dans son sous-arbre.
>
> Si `/product/42` plante (API down), l'error boundary de `app/product/[id]/error.tsx` affiche un message d'erreur. Le reste de l'application (`/shop`, `/cart`...) continue de fonctionner normalement.

---

### BLOC PERFORMANCE

**Q : Comment avez-vous optimisé le chargement des images ?**

> Toutes les images utilisent le composant `<Image>` de Next.js qui :
> 1. Génère automatiquement plusieurs tailles (srcset responsive)
> 2. Convertit au format **WebP/AVIF** (30-50% plus léger que JPEG)
> 3. Applique le **lazy loading** natif — les images hors écran ne se chargent pas
> 4. Réserve l'espace via `width` et `height` → prévient le **CLS** (layout shift)
>
> L'image principale du produit utilise `priority` (pas de lazy loading) car c'est le LCP (Largest Contentful Paint).

---

**Q : Qu'est-ce que le debounce et pourquoi l'utilisez-vous ?**

> Le **debounce** est une technique qui retarde l'exécution d'une fonction jusqu'à ce qu'un délai se soit écoulé sans nouvel appel.
>
> Dans la recherche : sans debounce, taper "iphone" déclenche 6 requêtes API (i, ip, iph, ipho, iphon, iphone). Avec `useDebounce(searchInput, 500)`, une seule requête est envoyée 500ms après la dernière frappe.

---

**Q : Pourquoi Suspense avec un fallback loading ?**

> Sans Suspense, si `ShopContent` fait un fetch long, l'utilisateur voit **une page blanche** pendant toute la durée du fetch.
>
> Avec `<Suspense fallback={<Loading />}>`, Next.js affiche immédiatement le skeleton pendant que les données chargent. L'UX est bien meilleure — l'utilisateur voit que quelque chose se charge.

---

### BLOC REDUX / STATE

**Q : Pourquoi Redux Toolkit et pas useState ou Context ?**

> Le panier est un état **global** partagé par :
> - Le Header (compteur d'articles)
> - La page Shop (bouton "dans le panier")
> - La page Cart (liste des articles)
> - La page Checkout (récapitulatif commande)
>
> Avec `useState`, il faudrait faire du prop-drilling sur 4 niveaux.  
> Avec Context, tous les consommateurs re-renderaient à chaque changement.  
> Redux Toolkit permet des **re-renders ciblés** (`useSelector` sélectionne exactement ce qu'on veut) et inclut `createAsyncThunk` pour les opérations API.

---

**Q : Comment le panier persiste après un rechargement ?**

> Quand un panier est créé via `POST /carts`, l'API retourne un `id`. On le sauvegarde dans `localStorage.setItem('cartId', id)`.
>
> Au prochain chargement, `CartInitializer` dans `Providers.tsx` lit ce `cartId` et dispatch `loadCart(cartId)` qui fait `GET /carts/:id` pour restaurer le panier depuis l'API.

---

### BLOC TYPESCRIPT / QUALITÉ

**Q : Pourquoi TypeScript ?**

> TypeScript ajoute un **typage statique** sur JavaScript :
> - Les erreurs de type sont détectées à la compilation, pas en production
> - L'autocomplétion IDE est précise
> - Les refactorings sont sûrs (renommer un champ de type impacte tous les usages)
>
> Dans ce projet, tous les types métier (`Product`, `Cart`, `CartItem`, `Order`...) sont centralisés dans `types/index.ts`.

---

**Q : Pourquoi Zod pour la validation ?**

> Zod est une librairie de **validation de schémas** TypeScript-first :
> - Les schémas servent à la fois de validation runtime ET de source de types TypeScript
> - Messages d'erreur personnalisables en français
> - `safeParse()` retourne un résultat typé sans lever d'exception
>
> Alternative : Yup (plus ancien, moins typé), ou validation manuelle (verbeux, error-prone).

---

**Q : Qu'est-ce que le hook `useAsync` ?**

> `useAsync` est un hook générique qui abstrait le pattern fetch :
> ```
> loading = true  →  appel de la fonction async
> loading = false →  données disponibles dans data
> error           →  erreur capturée, affichable ou levée
> refetch         →  permet de relancer manuellement
> ```
> Sans ce hook, chaque composant duplique le même `useState loading/data/error` + `useEffect`. Avec `useAsync`, c'est une seule ligne.

---

### BLOC SEO

**Q : Comment avez-vous géré le SEO ?**

> 1. **Metadata globale** dans `app/layout.tsx` — titre, description, keywords, OpenGraph
> 2. **Template de titre** `'%s | MyStore'` — chaque page définit son titre court
> 3. **generateMetadata async** sur les pages dynamiques — titre et description uniques par produit/catégorie
> 4. **OpenGraph images** sur les fiches produit — preview lors du partage sur les réseaux sociaux
> 5. **HTML sémantique** — `<h1>` unique par page, `<article>` pour les produits, `<nav>` pour la navigation
> 6. **generateStaticParams** — les pages produit sont indexables par Google (HTML pré-généré, pas de JS à exécuter)

---

*Document préparé pour la soutenance PFE 2026 — MyStore Next.js 15*
