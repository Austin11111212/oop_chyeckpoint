 // Class to represent a Product
 class Product {
    constructor(id, name, price, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
    }
}

// Class to represent a shopping cart item
class ShoppingCartItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    // Method to calculate the total price of the item
    getTotalPrice() {
        return this.product.price * this.quantity;
    }
}

// Class to represent a Shopping Cart
class ShoppingCart {
    constructor() {
        this.items = []; // Array to hold cart items
    }

    // Method to add items to the cart
    addItem(product, quantity) {
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            const newItem = new ShoppingCartItem(product, quantity);
            this.items.push(newItem);
        }
        this.displayCart();
    }

    // Method to remove items from the cart
    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
        this.displayCart();
    }

    // Method to get the total price of items in the cart
    getTotal() {
        return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }

    // Method to display cart items
    displayCart() {
        const cartDiv = document.getElementById('cart');
        cartDiv.innerHTML = '';
        if (this.items.length === 0) {
            cartDiv.innerHTML = "<p>The cart is empty.</p>";
            return;
        }
        this.items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `
                <strong>${item.product.name}</strong> (x${item.quantity}): ₦${item.getTotalPrice().toFixed(2)}
                <button onclick="removeFromCart(${item.product.id})">Remove</button>
            `;
            cartDiv.appendChild(itemDiv);
        });
        const totalDiv = document.createElement('div');
        totalDiv.innerHTML = `<strong>Total Price: ₦${this.getTotal().toFixed(2)}</strong>`;
        cartDiv.appendChild(totalDiv);
    }
}

const shoppingCart = new ShoppingCart();

// Create products
const products = [
    new Product(1, "Hp EliteBook 840 G5", 250000.00, "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/39/8514062/1.jpg?2207"),
    new Product(2, "Dell Latitude", 300000.00, "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/87/6363651/1.jpg?0570"),
    new Product(3, "Lenovo ThinkPad", 320000.00, "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/87/6363651/1.jpg?0570")
];

// Function to display products
function displayProducts() {
    const productListDiv = document.getElementById('productList');
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <strong>${product.name}</strong>
            <p>Price: ₦${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productListDiv.appendChild(productDiv);
    });
}

// Function to add a product to the cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        shoppingCart.addItem(product, 1);
    }
}

// Function to remove an item from the cart
function removeFromCart(productId) {
    shoppingCart.removeItem(productId);
}

// Initial display of products
displayProducts();