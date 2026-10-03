export type CartProduct = {
  id: string;
  slug: string;
  title: string;
  price: number;
  image: string;
  category: string;
  brand?: string | null;
  quantity: number;
};

const STORAGE_KEY = 'comping-cart';
const EMPTY_CART: CartProduct[] = [];
let cart: CartProduct[] = EMPTY_CART;
let initialized = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function initialize() {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed: unknown = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        cart = parsed.filter(
          (item): item is CartProduct =>
            typeof item?.id === 'string' &&
            typeof item?.title === 'string' &&
            Number.isFinite(item?.price) &&
            Number.isInteger(item?.quantity) &&
            item.quantity > 0,
        );
      }
    }
  } catch {
    cart = EMPTY_CART;
  }
}

function persist() {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }
  emit();
}

export function getCartSnapshot() {
  initialize();
  return cart;
}

export function getServerCartSnapshot() {
  return EMPTY_CART;
}

export function subscribeCart(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function addToCart(product: Omit<CartProduct, 'quantity'>, quantity = 1) {
  initialize();
  const existing = cart.find((item) => item.id === product.id);
  cart = existing
    ? cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item,
      )
    : [...cart, { ...product, quantity }];
  persist();
}

export function setCartQuantity(id: string, quantity: number) {
  initialize();
  if (quantity <= 0) {
    removeFromCart(id);
    return;
  }
  cart = cart.map((item) => (item.id === id ? { ...item, quantity } : item));
  persist();
}

export function removeFromCart(id: string) {
  initialize();
  cart = cart.filter((item) => item.id !== id);
  persist();
}

export function clearCart() {
  cart = EMPTY_CART;
  persist();
}