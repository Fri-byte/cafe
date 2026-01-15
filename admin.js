const ADMIN_USER = "admin";
const ADMIN_PASS = "1234";

let products = JSON.parse(localStorage.getItem("products")) || [];

function login() {
    let u = document.getElementById("username").value;
    let p = document.getElementById("password").value;

    if (u === ADMIN_USER && p === ADMIN_PASS) {
        document.getElementById("loginBox").style.display = "none";
        document.getElementById("adminPanel").style.display = "block";
        renderProducts();
    } else {
        alert("Wrong credentials");
    }
}

function addProduct() {
    let name = document.getElementById("productName").value;
    let price = document.getElementById("productPrice").value;

    products.push({
        name,
        price,
        visible: true
    });

    save();
    renderProducts();
}

function toggleProduct(index) {
    products[index].visible = !products[index].visible;
    save();
    renderProducts();
}

function renderProducts() {
    let list = document.getElementById("adminProducts");
    list.innerHTML = "";

    products.forEach((p, i) => {
        list.innerHTML += `
            <li class="list-group-item d-flex justify-content-between">
                ${p.name} - ₱${p.price}
                <button class="btn btn-sm ${p.visible ? 'btn-danger' : 'btn-success'}"
                    onclick="toggleProduct(${i})">
                    ${p.visible ? 'Hide' : 'Show'}
                </button>
            </li>
        `;
    });
}

function save() {
    localStorage.setItem("products", JSON.stringify(products));
}
