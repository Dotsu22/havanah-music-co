function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    const el = document.getElementById("cart-count");
    if (el) el.innerText = count;
}

function addToCart(id, name, price, image) {
    let cart = getCart();

    let item = cart.find(p => p.id === id);

    if (item) {
        item.qty += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: Number(price),
            image: image,
            qty: 1
        });
    }

    saveCart(cart);
}

function increaseQty(id) {
    let cart = getCart();
    let item = cart.find(p => p.id === id);

    if (item) {
        item.qty += 1;
        saveCart(cart);
        location.reload();
    }
}

function decreaseQty(id) {
    let cart = getCart();
    let itemIndex = cart.findIndex(p => p.id === id);

    if (itemIndex !== -1) {
        if (cart[itemIndex].qty > 1) {
            cart[itemIndex].qty -= 1;
        } else {
            cart.splice(itemIndex, 1);
        }
        saveCart(cart);
        location.reload();
    }
}

function removeItem(id) {
    let cart = getCart().filter(p => p.id !== id);
    saveCart(cart);
    location.reload();
}

document.addEventListener("DOMContentLoaded", updateCartCount);