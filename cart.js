const CART_KEY = "week7_shopping_cart";
const state = {
    products: [
        { id: 1, name: "Mandazi (pack of 6)", price: 120 },
        { id: 2, name: "Chapati (pack of 5)", price: 150 },
        { id: 3, name: "Tea leaves 250g", price: 180 },
    ],
    cart: loadCart(),
};

function loadCart() {
    try {
        const savedCart = JSON.parse(localStorage.getItem(CART_KEY) ?? "[]");
        if (!Array.isArray(savedCart)) return [];
        return savedCart.filter((item) =>
            Number.isInteger(item.productId) && Number.isInteger(item.quantity) && item.quantity > 0
        );
    } catch {
        return [];
    }
}

function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(state.cart));
}

function addToCart(productId) {
    const existingItem = state.cart.find((item) => item.productId === productId);
    if (existingItem) {
        state.cart = state.cart.map((item) => (
            item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
        ));
    } else {
        state.cart = [...state.cart, { productId, quantity: 1 }];
    }
    commit();
}

function updateQuantity(productId, quantity) {
    if (!Number.isInteger(quantity) || quantity < 0) return;
    if (quantity === 0) {
        removeFromCart(productId);
        return;
    }
    state.cart = state.cart.map((item) => (
        item.productId === productId ? { ...item, quantity } : item
    ));
    commit();
}

function removeFromCart(productId) {
    state.cart = state.cart.filter((item) => item.productId !== productId);
    commit();
}

function getCartTotal() {
    return state.cart.reduce((total, item) => {
        const product = state.products.find((entry) => entry.id === item.productId);
        return total + (product ? product.price * item.quantity : 0);
    }, 0);
}

function getCartCount() {
    return state.cart.reduce((count, item) => count + item.quantity, 0);
}

function commit() {
    saveCart();
    render();
}

function render() {
    const productsList = document.querySelector("#products");
    const cartList = document.querySelector("#cart-items");
    productsList.replaceChildren();
    cartList.replaceChildren();

    state.products.forEach((product) => {
        const item = document.createElement("li");
        item.textContent = `${product.name} — KSh ${product.price}`;
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "Add to cart";
        button.addEventListener("click", () => addToCart(product.id));
        item.append(button);
        productsList.append(item);
    });

    state.cart.forEach((cartItem) => {
        const product = state.products.find((entry) => entry.id === cartItem.productId);
        if (!product) return;
        const item = document.createElement("li");
        item.textContent = `${product.name} — KSh ${product.price} × ${cartItem.quantity}`;
        const decreaseButton = document.createElement("button");
        decreaseButton.type = "button";
        decreaseButton.textContent = "−";
        decreaseButton.addEventListener("click", () => updateQuantity(product.id, cartItem.quantity - 1));
        const increaseButton = document.createElement("button");
        increaseButton.type = "button";
        increaseButton.textContent = "+";
        increaseButton.addEventListener("click", () => updateQuantity(product.id, cartItem.quantity + 1));
        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => removeFromCart(product.id));
        item.append(decreaseButton, increaseButton, removeButton);
        cartList.append(item);
    });

    document.querySelector("#cart-count").textContent = String(getCartCount());
    document.querySelector("#cart-total").textContent = getCartTotal().toLocaleString("en-KE");
}

document.querySelector("#clear-cart").addEventListener("click", () => {
    state.cart = [];
    commit();
});

render();