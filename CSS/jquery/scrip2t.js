// Shopping Cart Functionality
class ShoppingCart {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('booknook-cart')) || [];
        this.updateCartCount();
        this.initCartDropdown();
    }
    
    addToCart(bookId, title, price, image) {
        const existingItem = this.cart.find(item => item.id === bookId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                id: bookId,
                title: title,
                price: price,
                image: image,
                quantity: 1
            });
        }
        
        this.saveCart();
        this.updateCartCount();
        this.updateCartDropdown();
        this.showAddToCartNotification(title);
    }
    
    removeFromCart(bookId) {
        this.cart = this.cart.filter(item => item.id !== bookId);
        this.saveCart();
        this.updateCartCount();
        this.updateCartDropdown();
    }
    
    updateQuantity(bookId, quantity) {
        const item = this.cart.find(item => item.id === bookId);
        if (item) {
            item.quantity = Math.max(1, quantity);
            this.saveCart();
            this.updateCartCount();
            this.updateCartDropdown();
        }
    }
    
    getTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
    
    getCount() {
        return this.cart.reduce((count, item) => count + item.quantity, 0);
    }
    
    saveCart() {
        localStorage.setItem('booknook-cart', JSON.stringify(this.cart));
    }
    
    updateCartCount() {
        document.querySelectorAll('.cart-count').forEach(el => {
            el.textContent = this.getCount();
        });
    }
    
    initCartDropdown() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.cart-dropdown')) {
                e.stopPropagation();
            }
        });
        
        this.updateCartDropdown();
    }
    
    updateCartDropdown() {
        const cartDropdown = document.querySelector('.cart-dropdown .dropdown-body');
        const cartItems = document.querySelector('.cart-items');
        const cartEmpty = document.querySelector('.cart-empty');
        
        if (this.cart.length === 0) {
            cartItems.classList.add('d-none');
            cartEmpty.classList.remove('d-none');
            document.querySelector('.view-cart-btn').classList.add('d-none');
        } else {
            cartEmpty.classList.add('d-none');
            cartItems.classList.remove('d-none');
            document.querySelector('.view-cart-btn').classList.remove('d-none');
            
            const itemsHTML = this.cart.map(item => `
                <div class="cart-item d-flex align-items-center mb-3" data-id="${item.id}">
                    <img src="${item.image}" alt="${item.title}" class="rounded" width="50" height="70">
                    <div class="ms-3 flex-grow-1">
                        <h6 class="mb-0">${item.title}</h6>
                        <div class="d-flex justify-content-between align-items-center mt-2">
                            <div class="input-group input-group-sm" style="width: 100px;">
                                <button class="btn btn-outline-secondary btn-minus" type="button">-</button>
                                <input type="number" class="form-control text-center quantity-input" value="${item.quantity}" min="1">
                                <button class="btn btn-outline-secondary btn-plus" type="button">+</button>
                            </div>
                            <span class="text-primary fw-bold">$${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    </div>
                    <button class="btn btn-link text-danger btn-remove ms-2">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `).join('');
            
            cartItems.innerHTML = `
                ${itemsHTML}
                <div class="cart-total d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                    <span class="fw-bold">Total:</span>
                    <span class="text-primary fw-bold fs-5">$${this.getTotal().toFixed(2)}</span>
                </div>
            `;
            
            cartItems.querySelectorAll('.btn-minus').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const itemId = parseInt(e.target.closest('.cart-item').dataset.id);
                    const item = this.cart.find(item => item.id === itemId);
                    if (item && item.quantity > 1) {
                        this.updateQuantity(itemId, item.quantity - 1);
                    }
                });
            });
            
            cartItems.querySelectorAll('.btn-plus').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const itemId = parseInt(e.target.closest('.cart-item').dataset.id);
                    const item = this.cart.find(item => item.id === itemId);
                    if (item) {
                        this.updateQuantity(itemId, item.quantity + 1);
                    }
                });
            });
            
            cartItems.querySelectorAll('.quantity-input').forEach(input => {
                input.addEventListener('change', (e) => {
                    const itemId = parseInt(e.target.closest('.cart-item').dataset.id);
                    const quantity = parseInt(e.target.value) || 1;
                    this.updateQuantity(itemId, quantity);
                });
            });
            
            cartItems.querySelectorAll('.btn-remove').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const itemId = parseInt(e.target.closest('.cart-item').dataset.id);
                    this.removeFromCart(itemId);
                });
            });
        }
    }
    
    showAddToCartNotification(title) {
        const notification = document.createElement('div');
        notification.className = 'alert alert-success alert-dismissible fade show position-fixed';
        notification.style.cssText = 'bottom: 20px; right: 20px; z-index: 1050; min-width: 300px; max-width: 90%;';
        notification.innerHTML = `
            <i class="fas fa-check-circle me-2"></i>
            <strong>Added to cart!</strong> "${title.substring(0, 30)}${title.length > 30 ? '...' : ''}" has been added to your cart.
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                const bsAlert = new bootstrap.Alert(notification);
                bsAlert.close();
            }
        }, 3000);
    }
}

// Make addToCart globally available
function addToCart(bookId) {
    const books = {
        1: {
            title: "The Midnight Library",
            price: 12.99,
            image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
        },
        2: {
            title: "Atomic Habits",
            price: 14.99,
            image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
        },
        3: {
            title: "Project Hail Mary",
            price: 13.99,
            image: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
        },
        4: {
            title: "The Silent Patient",
            price: 11.99,
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
        }
    };
    
    const book = books[bookId];
    if (book) {
        cart.addToCart(bookId, book.title, book.price, book.image);
    }
}

// Initialize cart globally
window.cart = new ShoppingCart();
window.addToCart = addToCart;