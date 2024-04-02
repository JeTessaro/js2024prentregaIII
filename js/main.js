const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
console.log(carrito);

const productos = [
    {
        id: "sillones01",
        titulo: "Sillón 01",
        precio: 750000,
        img: "./img/img-01.jpg",
        linea: "Línea Tradicional"
    },
    {
        id: "sillones02",
        titulo: "Sillón 02",
        precio: 950000,
        img: "./img/img-02.jpg",
        linea: "Línea Moderna"
    },
    {
        id: "sillones03",
        titulo: "Sillón 03",
        precio: 920000,
        img: "./img/img-03.jpg",
        linea: "Línea Moderna"
    },
    {
        id: "sillones04",
        titulo: "Sillón 04",
        precio: 850000,
        img: "./img/img-04.jpg",
        linea: "Línea Tradicional"
    },
    {
        id: "sillones05",
        titulo: "Sillón 05",
        precio: 950000,
        img: "./img/img-05.jpg",
        linea: "Línea Tradicional"
    },
    {
        id: "sillones06",
        titulo: "Sillón 06",
        precio: 650000,
        img: "./img/img-06.jpg",
        linea: "Línea Moderna"
    },
    {
        id: "sillones07",
        titulo: "Sillón 07",
        precio: 950000,
        img: "./img/img-07.jpg",
        linea: "Línea Tradicional"
    },
    {
        id: "sillones08",
        titulo: "Sillón 08",
        precio: 650000,
        img: "./img/img-08.jpg",
        linea: "Línea Moderna"
    },
];

const contenedorProductos = document.querySelector("#productos");
const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProductos = document.querySelector("#carrito-productos");
const carritoTotalproductos = document.querySelector("#carrito-total-productos");
const carritoTotalEnvio = document.querySelector("#carrito-total-envio");
const carritoTotal = document.querySelector("#carrito-total");
const vaciar = document.querySelector("#vaciar");

const cargarProductos = (productos) => {
    contenedorProductos.innerHTML = "";
    productos.forEach((producto) => {

        let div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-img" src="${producto.img}">
            <h3>${producto.titulo}</h3>
            <p>$${producto.precio}</p>
            <h3>${producto.linea}</h3>
            `;

        let button = document.createElement("button");
        button.classList.add("producto-btn");
        button.innerText = "Agregar al carrito";
        button.addEventListener("click", () => {
            agregarAlCarrito(producto);
        });

        div.append(button);
        contenedorProductos.append(div);
    })
}
cargarProductos(productos);



const actualizarCarrito = () => {
    if (carrito.length === 0) {
        carritoVacio.classList.remove("d-none");
        carritoProductos.classList.add("d-none");
        vaciar.classList.add("d-none");
    } else {
        carritoVacio.classList.add("d-none");
        carritoProductos.classList.remove("d-none");
        vaciar.classList.remove("d-none");

        carritoProductos.innerHTML = "";
        carrito.forEach((producto) => {
            let div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <h3>${producto.titulo}</h3>
                <p>$${producto.precio}</p>
                <p>Cant: ${producto.cantidad}</p>
            `;

            let buttonMenos = document.createElement("button");
            buttonMenos.classList.add("carrito-producto-btn");
            buttonMenos.innerText = "👎";
            buttonMenos.addEventListener("click", () => {
                disminuirCantidad(producto);
            })

            let buttonMas = document.createElement("button");
            buttonMas.classList.add("carrito-producto-btn");
            buttonMas.innerText = "👍";
            buttonMas.addEventListener("click", () => {
                aumentarCantidad(producto);
            })

            let buttonX = document.createElement("button");
            buttonX.classList.add("carrito-producto-btn");
            buttonX.innerText = "✖️";
            buttonX.addEventListener("click", () => {
                borrarDelCarrito(producto);
            })

            div.append(buttonMenos);
            div.append(buttonMas);
            div.append(buttonX);
            carritoProductos.append(div);

        })
    }
    actualizarTotal();
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

const agregarAlCarrito = (producto) => {
    const itemEncontrado = carrito.find(item => item.id === producto.id);
    if (itemEncontrado) {
        itemEncontrado.cantidad++;
    } else {
        carrito.push( {...producto, cantidad: 1} );
    }
    actualizarCarrito();
}

const borrarDelCarrito = (producto) => {
    const prodIndex = carrito.findIndex(item => item.id === producto.id);
    carrito.splice(prodIndex, 1);
    actualizarCarrito();
}

const actualizarTotal = () => {
    let total = carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
    let totalEnvio = total * 0.20;
    let totalTotal = total + totalEnvio
    carritoTotalproductos.innerText = `$${total}`;
    carritoTotalEnvio.innerText = `$${totalEnvio}`;
    carritoTotal.innerText = `$${totalTotal}`;
}

const disminuirCantidad = (producto) => {
    const itemEncontrado = carrito.find(item => item.id === producto.id);
    if (itemEncontrado.cantidad > 1) {
        itemEncontrado.cantidad--;
    } else if (itemEncontrado.cantidad === 1) {
        borrarDelCarrito(itemEncontrado)
    }
    actualizarCarrito();
}

const aumentarCantidad = (producto) => {
    const itemEncontrado = carrito.find(item => item.id === producto.id);
    itemEncontrado.cantidad++;
    actualizarCarrito();
}

vaciar.addEventListener("click", () => {
    carrito.length = 0;
    actualizarCarrito();
})

actualizarCarrito();


const input = document.querySelector("#busqueda");

input.addEventListener("input", () => {
    const productosFiltrados = productos.filter((producto) => producto.linea.toLowerCase().includes(input.value.toLowerCase()));
    cargarProductos(productosFiltrados);
})