import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { apiFetch } from '@/api/client'
import type { Cart, CartItem } from '@/types'

const LS_KEY = 'cartId'
const saveCartId = (id: string) => localStorage.setItem(LS_KEY, id)
const clearCartId = () => localStorage.removeItem(LS_KEY)

interface CartState {
  cart: Cart | null
  cartId: string | null
  loading: boolean
  error: string | null
}

const initialState: CartState = {
  cart: null,
  cartId: null,
  loading: false,
  error: null,
}

function computeTotals(items: CartItem[]) {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const tax = parseFloat((subtotal * 0.2).toFixed(2))
  const total = parseFloat((subtotal + tax).toFixed(2))
  return { subtotal, tax, total }
}

export const loadCart = createAsyncThunk('cart/load', async (cartId: string) => {
  const { data } = await apiFetch<Cart>(`/carts/${cartId}`)
  return data
})

export const createCart = createAsyncThunk('cart/create', async (items: CartItem[]) => {
  const { data } = await apiFetch<Cart>('/carts', {
    method: 'POST',
    body: JSON.stringify({ items, ...computeTotals(items) }),
  })
  saveCartId(data.id)
  return data
})

export const updateCart = createAsyncThunk(
  'cart/update',
  async ({ cartId, items }: { cartId: string; items: CartItem[] }) => {
    const payload: Omit<Cart, 'id'> = { items, ...computeTotals(items) }
    const { data } = await apiFetch<Cart>(`/carts/${cartId}`, {
      method: 'PUT',
      body: JSON.stringify({ id: cartId, ...payload }),
    })
    return data
  },
)

export const deleteCart = createAsyncThunk('cart/delete', async (cartId: string) => {
  await apiFetch(`/carts/${cartId}`, { method: 'DELETE' })
  clearCartId()
})

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    resetCart(state) {
      state.cart = null
      state.cartId = null
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadCart.pending, (state) => { state.loading = true })
    builder.addCase(loadCart.fulfilled, (state, action: PayloadAction<Cart>) => {
      state.loading = false
      state.cart = action.payload
      state.cartId = action.payload.id
    })
    builder.addCase(loadCart.rejected, (state) => {
      state.loading = false
      state.cart = null
      state.cartId = null
      clearCartId()
    })

    builder.addCase(createCart.pending, (state) => { state.loading = true })
    builder.addCase(createCart.fulfilled, (state, action: PayloadAction<Cart>) => {
      state.loading = false
      state.cart = action.payload
      state.cartId = action.payload.id
    })
    builder.addCase(createCart.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message ?? 'Erreur lors de la création du panier'
    })

    builder.addCase(updateCart.pending, (state) => { state.loading = true })
    builder.addCase(updateCart.fulfilled, (state, action: PayloadAction<Cart>) => {
      state.loading = false
      state.cart = action.payload
    })
    builder.addCase(updateCart.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message ?? 'Erreur lors de la mise à jour du panier'
    })

    builder.addCase(deleteCart.fulfilled, (state) => {
      state.cart = null
      state.cartId = null
    })
    builder.addCase(deleteCart.rejected, (state, action) => {
      state.error = action.error.message ?? 'Erreur lors de la suppression du panier'
    })
  },
})

export const { resetCart } = cartSlice.actions
export default cartSlice.reducer
