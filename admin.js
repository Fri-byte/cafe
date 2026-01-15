const ADMIN_USER = "admin";
const ADMIN_PASS = "1234";

let products = JSON.parse(localStorage.getItem("products")) || [];

function login() {
  const u = user.value;
  const p = pass.value;

  if (u === ADMIN_USER && p === ADMIN_PASS) {
    loginBox.style.display = "none";
    panel.style.display = "block";
    render();
  } else {
    alert("Wrong login");
  }
}

function addProduct() {
  products.push({
    name: pname.value,
    price: pprice.value,
    image: pimg.value,
    visible: true
  });

  save();
  render();
}

function toggle(i) {
  products[i].visible = !products[i].visible;
  save();
  render();
}

function render() {
  productList.innerHTML = "";
  products.forEach((p, i) => {
    productList.innerHTML += `
      <li class="list-group-item d-flex justify-content-between">
        ${p.name} - ₱${p.price}
        <button class="btn btn-sm ${p.visible ? "btn-danger" : "btn-success"}"
          onclick="toggle(${i})">
          ${p.visible ? "Hide" : "Show"}
        </button>
      </li>
    `;
  });
}

function save() {
  localStorage.setItem("products", JSON.stringify(products));
}
