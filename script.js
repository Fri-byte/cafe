let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
  const item = cart.find(i => i.name === name);
  if(item) item.qty++;
  else cart.push({name, price, qty: 1});
  
  saveCart();
  alert(`${name} added to cart!`);
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  document.getElementById("cartCount").innerText = count;
}

document.getElementById("cartBtn").addEventListener("click", () => {
  updateCartModal();
  const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
  cartModal.show();
});

function updateCartModal() {
  const list = document.getElementById("cartItems");
  list.innerHTML = "";
  let total = 0;
  
  cart.forEach((item,index) => {
    total += item.price * item.qty;
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
      ${item.name} x${item.qty} - ₱${item.price*item.qty}
      <div>
        <button class="btn btn-sm btn-outline-success me-1" onclick="changeQty(${index},1)">+</button>
        <button class="btn btn-sm btn-outline-danger" onclick="changeQty(${index},-1)">-</button>
      </div>
    `;
    list.appendChild(li);
  });
  
  document.getElementById("total").innerText = total;
}

function changeQty(index, change) {
  cart[index].qty += change;
  if(cart[index].qty <=0) cart.splice(index,1);
  saveCart();
  updateCartModal();
}

function checkout() {
  if(cart.length===0){
    alert("Cart is empty!");
    return;
  }
  alert("✅ Order placed successfully!");
  cart = [];
  saveCart();
  updateCartModal();
}

function scrollToMenu() {
  document.getElementById("menu").scrollIntoView({behavior:"smooth"});
}


updateCartCount();
