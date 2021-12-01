let carrito = [];
let sectionProductos = document.getElementById("section-productos");
let sectionCarrito = document.getElementById("section-carrito");

//creacion de la seccion carrito con DOM
let totalCompra = document.createElement("div");
totalCompra.innerHTML = "<h2>Total: $</h2>";
sectionCarrito.appendChild(totalCompra);

let montoTotalCompra = document.createElement("h2");
montoTotalCompra.innerText = "0";
totalCompra.appendChild(montoTotalCompra);

let cantidadProductos = document.createElement("div");
cantidadProductos.innerHTML = "<h3>Cantidad de productos: </h3>";
sectionCarrito.appendChild(cantidadProductos);

let cantProductos = document.createElement("h3");
cantProductos.innerText = " 0";
cantidadProductos.appendChild(cantProductos);

let botonFinalizar = document.createElement("button");
botonFinalizar.innerText = "Finalizar compra";
sectionCarrito.appendChild(botonFinalizar);
botonFinalizar.setAttribute("class", "boton");

//Le agrego un evento al boton para que muestre el precio final y despues se vacie el carrito
botonFinalizar.onclick = () => {
    const precioFinal = montoTotalCompra.innerText;
    alert("Total a abonar: $" + precioFinal);
    vaciarCarrito();
}

//Renderizado de los productos en cards
for (const producto of productos) {
    let container = document.createElement("div");
    container.setAttribute("class", "card-product");
    container.innerHTML = ` <div class="img-container">
                            <img src="${producto.foto}" alt="${producto.nombre}" class="img-product"/>
                            </div>
                            <div class="info-producto">
                            <p class="font">${producto.nombre}</p>
                            <strong class="font">$${producto.precio}</strong>
                            <button class="boton" id="${producto.id}"> Agregar al carrito </button>
                            </div>`;
    sectionProductos.appendChild(container);
    //Evento para que los productos se agreguen al carrito al hacer click en el boton
    document.getElementById(`${producto.id}`).onclick = () => agregarAlCarrito(`${producto.id}`);
}

//Funciones
function agregarAlCarrito(id) {
    carrito.push(productos.find(p => p.id == id));
    localStorage.setItem("carrito", JSON.stringify(carrito));
    calcularTotalCarrito();
}

function calcularTotalCarrito() {
    let total = 0;
    for (const producto of carrito) {
        total += producto.precio;
    }
    montoTotalCompra.innerText = total;
    cantProductos.innerText = carrito.length;
}

function vaciarCarrito() {
    montoTotalCompra.innerText = "0";
    cantProductos.innerText = "0";
    localStorage.clear();
    carrito=[];
}