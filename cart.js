class Cart {
    constructor(products, storageKey = "week7_shopping_cart") {
        this.products = products;
        this.storageKey = storageKey;
        this.items = this.load();
    }

    load() {
        try {
            const savedItems = JSON.parse(
                localStorage.getItem(this.storageKey) ?? "[]"
            );

            if (!Array.isArray(savedItems)) {return [];}

            return savedItems.filter((item) => {
                const productExists = this.products.some(
                    (product) => product.id === item.productId
                );

                return (
                    productExists &&
                    Number.isInteger(item.quantity) &&
                    item.quantity > 0
                );
            });
        } catch (error) {
            console.error("Unable to load cart:", error);
            return [];
        }
    }

    save() {
        try {
            localStorage.setItem(
                this.storageKey,
                JSON.stringify(this.items)
            );
            return true;
        } catch (error) {
            console.error("Unable to save cart:", error);
            return false;
        }
    }

    addItem(productId) {
        const productExists = this.products.some(
            (product) => product.id === productId
        );

        if (!productExists) {return;}

        const existingItem = this.items.find(
            (item) => item.productId === productId
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({ productId, quantity: 1 });
        }

        this.save();
    }

    updateQuantity(productId, quantity) {
        if (!Number.isInteger(quantity) || quantity < 0) {return;}

        if (quantity === 0) {
            this.removeItem(productId);
            return;
        }

        const item = this.items.find(
            (cartItem) => cartItem.productId === productId
        );

        if (!item) {return;}

        item.quantity = quantity;
        this.save();
    }

    removeItem(productId) {
        this.items = this.items.filter(
            (item) => item.productId !== productId
        );

        this.save();
    }

    clear() {
        this.items = [];
        this.save();
    }

    getItemCount() {
        return this.items.reduce(
            (count, item) => count + item.quantity,
            0
        );
    }

    getTotal() {
        return this.items.reduce((total, item) => {
            const product = this.products.find(
                (entry) => entry.id === item.productId
            );

            return total + (product ? product.price * item.quantity : 0);
        }, 0);
    }

    getItems() {
        return this.items.map((item) => {
            const product = this.products.find(
                (entry) => entry.id === item.productId
            );

            return {
                ...item,
                product,
                subtotal: product.price * item.quantity
            };
        });
    }
}

const products = [
    { id: 1, name: "Mandazi (pack of 6)", price: 120 },
    { id: 2, name: "Chapati (pack of 5)", price: 150 },
    { id: 3, name: "Tea leaves 250g", price: 180 }
];

const cart = new Cart(products);

const productsList = document.querySelector("#products");
const cartList = document.querySelector("#cart-items");
const cartCount = document.querySelector("#cart-count");
const cartTotal = document.querySelector("#cart-total");
const clearCartButton = document.querySelector("#clear-cart");

function renderProducts() {
    productsList.replaceChildren();

    products.forEach((product) => {
        const item = document.createElement("li");
        const name = document.createElement("span");
        const button = document.createElement("button");

        name.textContent = `${product.name} — KSh ${product.price}`;

        button.type = "button";
        button.textContent = "Add to cart";
        button.addEventListener("click", () => {
            cart.addItem(product.id);
            renderCart();
        });

        item.append(name, button);
        productsList.append(item);
    });
}

function renderCart() {
    cartList.replaceChildren();

    cart.getItems().forEach((cartItem) => {
        const item = document.createElement("li");
        const details = document.createElement("span");

        details.textContent =
            `${cartItem.product.name} — KSh ${cartItem.product.price} × ${cartItem.quantity}`;

        const decreaseButton = document.createElement("button");
        decreaseButton.type = "button";
        decreaseButton.textContent = "−";
        decreaseButton.setAttribute(
            "aria-label",
            `Decrease ${cartItem.product.name} quantity`
        );

        decreaseButton.addEventListener("click", () => {
            cart.updateQuantity(
                cartItem.productId,
                cartItem.quantity - 1
            );
            renderCart();
        });

        const increaseButton = document.createElement("button");
        increaseButton.type = "button";
        increaseButton.textContent = "+";
        increaseButton.setAttribute(
            "aria-label",
            `Increase ${cartItem.product.name} quantity`
        );

        increaseButton.addEventListener("click", () => {
            cart.updateQuantity(
                cartItem.productId,
                cartItem.quantity + 1
            );
            renderCart();
        });

        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.textContent = "Remove";

        removeButton.addEventListener("click", () => {
            cart.removeItem(cartItem.productId);
            renderCart();
        });

        item.append(
            details,
            decreaseButton,
            increaseButton,
            removeButton
        );

        cartList.append(item);
    });

    cartCount.textContent = String(cart.getItemCount());
    cartTotal.textContent = cart.getTotal().toLocaleString("en-KE");
}

clearCartButton.addEventListener("click", () => {
    cart.clear();
    renderCart();
});

renderProducts();
renderCart();
