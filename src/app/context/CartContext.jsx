import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        try {
            const stored = localStorage.getItem("wittur_cart");
            if (!stored) return [];
            const parsed = JSON.parse(stored);
            return Array.isArray(parsed) ? parsed : [];
        } catch (e) {
            console.error("Failed to parse cart data", e);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("wittur_cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item) => {
        setCart((prev) => {
            // Check if item with same configuration already exists
            const existing = prev.find((i) =>
                i.model.id === item.model.id &&
                JSON.stringify(i.selectedSpecs) === JSON.stringify(item.selectedSpecs) &&
                i.selectedItem?.code === item.selectedItem?.code
            );

            if (existing) {
                return prev.map((i) =>
                    i === existing ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, { ...item, cartId: Date.now(), quantity: 1 }];
        });
    };

    const removeFromCart = (cartId) => {
        setCart((prev) => prev.filter((i) => i.cartId !== cartId));
    };

    const updateQuantity = (cartId, delta) => {
        setCart((prev) =>
            prev.map((i) => {
                if (i.cartId === cartId) {
                    const newQty = Math.max(1, i.quantity + delta);
                    return { ...i, quantity: newQty };
                }
                return i;
            })
        );
    };

    const clearCart = () => setCart([]);

    const cartTotal = cart.reduce((sum, item) => sum + item.total * item.quantity, 0);
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartTotal,
                cartCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
