let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
  const item = cart.find(i => i.name === name);
  if(item) item.qty++;
  else cart.push({name, price, qty: 1});
  
  saveCart();
  updateCartCount();
  showNotification(`${name} added to cart!`);
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  const cartCountEl = document.getElementById("cartCount");
  if(cartCountEl) {
    cartCountEl.innerText = count;
  }
}

function showNotification(message) {
  // Create a simple notification
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: #4b2e2e;
    color: white;
    padding: 15px 25px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    z-index: 9999;
    animation: slideIn 0.3s ease;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', function() {
  const cartBtn = document.getElementById("cartBtn");
  if(cartBtn) {
    cartBtn.addEventListener("click", (e) => {
      e.preventDefault();
      updateCartModal();
      const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
      cartModal.show();
    });
  }
  
  updateCartCount();
});

function updateCartModal() {
  const list = document.getElementById("cartItems");
  if(!list) return;
  
  list.innerHTML = "";
  let total = 0;
  
  if(cart.length === 0) {
    list.innerHTML = '<li class="list-group-item text-center">Your cart is empty</li>';
    document.getElementById("total").innerText = "0.00";
    return;
  }
  
  cart.forEach((item, index) => {
    total += item.price * item.qty;
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
      <div>
        <strong>${item.name}</strong><br>
        <small>$${item.price.toFixed(2)} x ${item.qty}</small>
      </div>
      <div>
        <button class="btn btn-sm btn-outline-success me-1" onclick="changeQty(${index},1)">+</button>
        <span class="mx-2">${item.qty}</span>
        <button class="btn btn-sm btn-outline-danger" onclick="changeQty(${index},-1)">-</button>
      </div>
    `;
    list.appendChild(li);
  });
  
  document.getElementById("total").innerText = total.toFixed(2);
}

function changeQty(index, change) {
  cart[index].qty += change;
  if(cart[index].qty <= 0) cart.splice(index, 1);
  saveCart();
  updateCartModal();
}

function checkout() {
  if(cart.length === 0) {
    alert("Cart is empty!");
    return;
  }
  alert("✅ Order placed successfully!");
  cart = [];
  saveCart();
  updateCartModal();
  const cartModal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
  if(cartModal) cartModal.hide();
}

function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if(element) {
    element.scrollIntoView({behavior: "smooth", block: "start"});
  }
}

function changeFeatured(imgSrc) {
  const featuredImg = document.getElementById("featuredImg");
  if(featuredImg) {
    featuredImg.src = imgSrc;
  }
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if(href !== '#' && href !== '#cartBtn') {
      e.preventDefault();
      const target = document.querySelector(href);
      if(target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// Contact form submission
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById("contactForm");
  if(contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();
      alert("Thank you for contacting us! We'll get back to you soon.");
      contactForm.reset();
    });
  }
});

// Initialize cart count on page load
updateCartCount();
