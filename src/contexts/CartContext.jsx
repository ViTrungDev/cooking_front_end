import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

// Custom hook để dùng CartContext
export const useCart = () => useContext(CartContext);

// Provider nhận thêm userId để lưu giỏ hàng theo từng người dùng
export function CartProvider({ children, userId }) {
    // ✅ Lấy giỏ hàng từ localStorage theo userId
    const [cartItems, setCartItems] = useState(() => {
        if (!userId) return []; // nếu chưa có user thì trả mảng rỗng
        const saved = localStorage.getItem(`cartItems_${userId}`);
        return saved ? JSON.parse(saved) : [];
    });

    // ✅ Mỗi khi cartItems thay đổi, lưu lại vào localStorage theo userId
    useEffect(() => {
        if (userId) {
            localStorage.setItem(
                `cartItems_${userId}`,
                JSON.stringify(cartItems),
            );
        }
    }, [cartItems, userId]);

    // ✅ Thêm sản phẩm vào giỏ hàng
    const addToCart = (newItem) => {
        if (!newItem || !newItem.id) {
            console.warn('Sản phẩm thêm vào không hợp lệ:', newItem);
            return;
        }

        const existingItem = cartItems.find((item) => item.id === newItem.id);

        if (existingItem) {
            // Nếu đã có sản phẩm, tăng số lượng
            const updatedCart = cartItems.map((item) =>
                item.id === newItem.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item,
            );
            setCartItems(updatedCart);
        } else {
            // Nếu chưa có, thêm sản phẩm mới với quantity = 1
            setCartItems([...cartItems, { ...newItem, quantity: 1 }]);
        }
    };

    // ✅ Xóa 1 sản phẩm khỏi giỏ
    const removeFromCart = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    // ✅ Cập nhật số lượng sản phẩm
    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: newQuantity } : item,
            ),
        );
    };

    // ✅ Tổng số sản phẩm trong giỏ
    const cartCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0,
    );

    return (
        <CartContext.Provider
            value={{
                cartItems,
                cartCount,
                addToCart,
                removeFromCart,
                updateQuantity,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
