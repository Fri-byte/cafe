function loadProducts() {
  const productContainer = document.getElementById("productList");
  const products = JSON.parse(localStorage.getItem("products")) || [];

  productContainer.innerHTML = "";

  products
    .filter(p => p.visible)
    .forEach(product => {
      const col = document.createElement("div");
      col.className = "col-md-4";
      col.innerHTML = `
        <div class="card shadow-sm border-0 rounded-4">
          <img src="${product.image}" class="card-img-top rounded-top-4">
          <div class="card-body text-center">
            <h5>${product.name}</h5>
            <p>₱${product.price}</p>
            <button class="btn btn-success"
              onclick="addToCart('${product.name}', ${product.price})">
              Add to Cart
            </button>
          </div>
        </div>
      `;
      productContainer.appendChild(col);
    });
}
