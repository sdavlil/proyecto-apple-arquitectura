const API = window.location.protocol === "file:"
    ? "http://127.0.0.1:5000/pedidos"
    : `${window.location.origin}/pedidos`;

const productosApple = [
    {
        nombre: "iPhone 16",
        precio: 699,
        categoria: "iPhone",
        imagenActual: 0,
        imagenes: [
            "https://images.unsplash.com/photo-1726587912062-0e5b1be8a6ee?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://unsplash.com/es/fotos/un-primer-plano-de-un-telefono-celular-tirado-en-la-hierba-5TQMutTxJwE",
            ""
        ]
    },
    {
        nombre: "MacBook Air 13\" M5",
        precio: 1099,
        categoria: "Mac",
        imagenActual: 0,
        imagenes: [
            "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80"
        ]
    },
    {
        nombre: "iPad Air M4",
        precio: 599,
        categoria: "iPad",
        imagenActual: 0,
        imagenes: [
            "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?auto=format&fit=crop&w=900&q=80"
        ]
    },
    {
        nombre: "Apple Watch Series 11",
        precio: 399,
        categoria: "Watch",
        imagenActual: 0,
        imagenes: [
            "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1544117519-31a4b719223d?auto=format&fit=crop&w=900&q=80"
        ]
    },
    {
        nombre: "Apple Watch SE 3",
        precio: 249,
        categoria: "Watch",
        imagenActual: 0,
        imagenes: [
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=900&q=80"
        ]
    },
    {
        nombre: "Apple Watch Ultra 3",
        precio: 799,
        categoria: "Watch",
        imagenActual: 0,
        imagenes: [
            "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=900&q=80"
        ]
    }
];

let pedidosOriginales = [];

function formatoMoneda(valor) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
    }).format(Number(valor) || 0);
}

function mostrarSeccion(seccion, boton) {
    document.querySelectorAll(".page-section").forEach(section => {
        section.classList.remove("active-section");
    });

    document.querySelectorAll(".menu-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    document.getElementById(`seccion${capitalizar(seccion)}`).classList.add("active-section");
    boton.classList.add("active");

    if (seccion === "pedidos") {
        cargarPedidos();
    }
}

function capitalizar(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}

function inicializarProductos() {
    renderizarCatalogoProductos();
    renderizarProductosPedido();
    actualizarTotalPedido();
}

function renderizarCatalogoProductos() {
    const contenedor = document.getElementById("catalogoProductos");

    contenedor.innerHTML = productosApple.map((producto, index) => `
        <article class="catalog-card">
            ${crearCarruselProducto(producto, index, "catalogo")}

            <div class="product-info">
                <span class="category">${producto.categoria}</span>
                <h3>${producto.nombre}</h3>
                <p>${formatoMoneda(producto.precio)}</p>
            </div>
        </article>
    `).join("");
}

function renderizarProductosPedido() {
    const contenedor = document.getElementById("productosDisponibles");

    contenedor.innerHTML = productosApple.map((producto, index) => `
        <article class="product-card">
            ${crearCarruselProducto(producto, index, "pedido")}

            <div class="product-info">
                <span class="category">${producto.categoria}</span>
                <h4>${producto.nombre}</h4>
                <p>${formatoMoneda(producto.precio)}</p>
            </div>

            <div class="quantity-control">
                <button type="button" onclick="disminuirCantidad(${index})">-</button>
                <input
                    type="number"
                    id="cantidad-${index}"
                    min="0"
                    value="0"
                    onchange="actualizarTotalPedido()"
                >
                <button type="button" onclick="aumentarCantidad(${index})">+</button>
            </div>
        </article>
    `).join("");
}

function crearCarruselProducto(producto, index, origen) {
    const imagen = producto.imagenes[producto.imagenActual];

    return `
        <div class="carousel">
            <button
                type="button"
                class="carousel-btn left"
                onclick="cambiarImagenProducto(${index}, -1)"
                aria-label="Imagen anterior"
            >
                ‹
            </button>

            <img
                id="imagen-${origen}-${index}"
                src="${imagen}"
                alt="${producto.nombre}"
                onerror="this.src='${crearImagenAlternativa(producto.nombre)}'"
            >

            <button
                type="button"
                class="carousel-btn right"
                onclick="cambiarImagenProducto(${index}, 1)"
                aria-label="Imagen siguiente"
            >
                ›
            </button>

            <div class="carousel-dots">
                ${producto.imagenes.map((_imagen, imagenIndex) => `
                    <span class="${imagenIndex === producto.imagenActual ? "active-dot" : ""}"></span>
                `).join("")}
            </div>
        </div>
    `;
}

function cambiarImagenProducto(index, direccion) {
    const producto = productosApple[index];
    const totalImagenes = producto.imagenes.length;

    producto.imagenActual = producto.imagenActual + direccion;

    if (producto.imagenActual < 0) {
        producto.imagenActual = totalImagenes - 1;
    }

    if (producto.imagenActual >= totalImagenes) {
        producto.imagenActual = 0;
    }

    renderizarCatalogoProductos();
    renderizarProductosPedido();
    actualizarTotalPedido();
}

function crearImagenAlternativa(nombreProducto) {
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="640" height="640" viewBox="0 0 640 640">
            <rect width="640" height="640" rx="44" fill="#0f1f3d"/>
            <circle cx="320" cy="250" r="95" fill="#3b82f6" opacity="0.35"/>
            <text x="320" y="365" text-anchor="middle" fill="#f7fbff" font-size="34" font-family="Arial" font-weight="700">
                Apple
            </text>
            <text x="320" y="415" text-anchor="middle" fill="#a9b8d6" font-size="24" font-family="Arial">
                ${nombreProducto}
            </text>
        </svg>
    `;

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function aumentarCantidad(index) {
    const input = document.getElementById(`cantidad-${index}`);
    input.value = Number(input.value || 0) + 1;
    actualizarTotalPedido();
}

function disminuirCantidad(index) {
    const input = document.getElementById(`cantidad-${index}`);
    const valorActual = Number(input.value || 0);

    if (valorActual > 0) {
        input.value = valorActual - 1;
    }

    actualizarTotalPedido();
}

function obtenerProductosSeleccionados() {
    return productosApple
        .map((producto, index) => {
            const cantidad = Number(document.getElementById(`cantidad-${index}`).value || 0);

            return {
                nombre: producto.nombre,
                precio: producto.precio,
                cantidad
            };
        })
        .filter(producto => producto.cantidad > 0);
}

function actualizarTotalPedido() {
    const productosSeleccionados = obtenerProductosSeleccionados();

    const total = productosSeleccionados.reduce(
        (acumulado, producto) => acumulado + producto.precio * producto.cantidad,
        0
    );

    document.getElementById("totalPedido").innerText = formatoMoneda(total);
}

async function cargarPedidos() {
    const res = await fetch(API);
    pedidosOriginales = await res.json();

    aplicarFiltros();
}

function aplicarFiltros() {
    const filtroId = document.getElementById("filtroId")?.value.trim() || "";
    const filtroCliente = document.getElementById("filtroCliente")?.value.trim().toLowerCase() || "";

    const pedidosFiltrados = pedidosOriginales.filter(pedido => {
        const coincideId = filtroId === "" || String(pedido.id_pedido) === filtroId;
        const cliente = (pedido.cliente || "").toLowerCase();
        const coincideCliente = filtroCliente === "" || cliente.includes(filtroCliente);

        return coincideId && coincideCliente;
    });

    renderizarPedidos(pedidosFiltrados);
}

function limpiarFiltros() {
    document.getElementById("filtroId").value = "";
    document.getElementById("filtroCliente").value = "";
    aplicarFiltros();
}

function renderizarPedidos(pedidos) {
    ["PENDIENTE", "PROCESANDO", "ENTREGADO"].forEach(estado => {
        document.getElementById(estado).innerHTML = "";
    });

    pedidos.forEach(pedido => {
        const card = crearCardPedido(pedido);
        document.getElementById(pedido.estado).appendChild(card);
    });

    actualizarResumen(pedidos);
}

function crearCardPedido(pedido) {
    const div = document.createElement("article");
    div.className = "card";

    const productos = pedido.productos && pedido.productos.length > 0
        ? pedido.productos
        : [{
            nombre: pedido.nombre_producto,
            precio: pedido.precio_producto,
            cantidad: 1
        }];

    const totalProductos = productos.reduce(
        (acumulado, producto) => acumulado + Number(producto.cantidad || 0),
        0
    );

    const totalPedido = productos.reduce(
        (acumulado, producto) => acumulado + Number(producto.precio || 0) * Number(producto.cantidad || 0),
        0
    );

    const imagenPedido = obtenerImagenPrincipalPedido(productos);
    const botonesEstado = obtenerBotonesEstado(pedido);

    div.innerHTML = `
        <div class="card-top">
            <span class="order-id">Pedido #${pedido.id_pedido}</span>
            <span class="status-pill">${pedido.estado}</span>
        </div>

        <div class="order-image">
            <img
                src="${imagenPedido.src}"
                alt="${imagenPedido.nombre}"
                onerror="this.src='${crearImagenAlternativa(imagenPedido.nombre)}'"
            >
        </div>

        <div class="client-box">
            <span>Cliente</span>
            <strong>${pedido.cliente || "Cliente no registrado"}</strong>
        </div>

        <div class="order-detail">
            <span>ID del pedido</span>
            <strong>#${pedido.id_pedido}</strong>
        </div>

        <div class="order-detail">
            <span>Cantidad total</span>
            <strong>${totalProductos} producto(s)</strong>
        </div>

        <ul class="product-list">
            ${productos.map(producto => `
                <li>
                    <span>${producto.nombre}</span>
                    <strong>
                        ${producto.cantidad} x ${formatoMoneda(producto.precio)}
                    </strong>
                </li>
            `).join("")}
        </ul>

        <p class="price">${formatoMoneda(totalPedido)}</p>

        <div class="actions">
            ${botonesEstado}
            <button class="btn btn-danger" onclick="eliminarPedido(${pedido.id_pedido})">
                Eliminar
            </button>
        </div>
    `;

    return div;
}

function obtenerImagenPrincipalPedido(productos) {
    const primerProducto = productos[0];

    const productoEncontrado = productosApple.find(
        producto => producto.nombre === primerProducto.nombre
    );

    if (!productoEncontrado) {
        return {
            src: crearImagenAlternativa(primerProducto.nombre || "Producto"),
            nombre: primerProducto.nombre || "Producto"
        };
    }

    return {
        src: productoEncontrado.imagenes[0],
        nombre: productoEncontrado.nombre
    };
}

function obtenerBotonesEstado(pedido) {
    if (pedido.estado === "PENDIENTE") {
        return `
            <button class="btn btn-secondary" onclick="mover(${pedido.id_pedido}, 'PROCESANDO')">
                Procesar
            </button>
        `;
    }

    if (pedido.estado === "PROCESANDO") {
        return `
            <button class="btn btn-secondary" onclick="mover(${pedido.id_pedido}, 'ENTREGADO')">
                Entregar
            </button>
        `;
    }

    return `<span class="completed">Pedido finalizado</span>`;
}

function actualizarResumen(pedidos) {
    const conteos = {
        PENDIENTE: pedidos.filter(p => p.estado === "PENDIENTE").length,
        PROCESANDO: pedidos.filter(p => p.estado === "PROCESANDO").length,
        ENTREGADO: pedidos.filter(p => p.estado === "ENTREGADO").length
    };

    document.getElementById("totalPedidos").innerText = pedidos.length;
    document.getElementById("countPendiente").innerText = conteos.PENDIENTE;
    document.getElementById("countProcesando").innerText = conteos.PROCESANDO;
    document.getElementById("countEntregado").innerText = conteos.ENTREGADO;
    document.getElementById("badgePendiente").innerText = conteos.PENDIENTE;
    document.getElementById("badgeProcesando").innerText = conteos.PROCESANDO;
    document.getElementById("badgeEntregado").innerText = conteos.ENTREGADO;
}

async function crearPedido() {
    const cliente = document.getElementById("cliente").value.trim();
    const productosSeleccionados = obtenerProductosSeleccionados();

    if (!cliente) {
        mostrarError("Debes escribir el nombre del cliente.");
        return;
    }

    if (productosSeleccionados.length === 0) {
        mostrarError("Debes seleccionar al menos un producto.");
        return;
    }

    const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            cliente,
            productos: productosSeleccionados
        })
    });

    if (!res.ok) {
        const err = await res.json();
        mostrarError(err.message || "Error creando pedido");
        return;
    }

    limpiarFormulario();
    mostrarExito("Pedido creado correctamente.");
    await cargarPedidos();

    const botonPedidos = document.querySelectorAll(".menu-btn")[2];
    mostrarSeccion("pedidos", botonPedidos);
}

function limpiarFormulario() {
    document.getElementById("cliente").value = "";

    productosApple.forEach((_producto, index) => {
        const input = document.getElementById(`cantidad-${index}`);

        if (input) {
            input.value = 0;
        }
    });

    actualizarTotalPedido();
}

async function mover(id, estado) {
    const res = await fetch(`${API}/${id}/estado`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado })
    });

    if (!res.ok) {
        const err = await res.json();
        mostrarError(err.message || "Error moviendo pedido");
        return;
    }

    mostrarExito("Estado actualizado correctamente.");
    cargarPedidos();
}

async function eliminarPedido(id) {
    const confirmar = confirm("¿Deseas eliminar este pedido?");

    if (!confirmar) {
        return;
    }

    const res = await fetch(`${API}/${id}`, { method: "DELETE" });

    if (!res.ok) {
        const err = await res.json();
        mostrarError(err.message || "Error eliminando pedido");
        return;
    }

    mostrarExito("Pedido eliminado correctamente.");
    cargarPedidos();
}

function mostrarError(msg) {
    mostrarMensaje("error", msg);
}

function mostrarExito(msg) {
    mostrarMensaje("success", msg);
}

function mostrarMensaje(idElemento, msg) {
    const elemento = document.getElementById(idElemento);

    if (!elemento) {
        alert(msg);
        return;
    }

    elemento.innerText = msg;

    setTimeout(() => {
        elemento.innerText = "";
    }, 3000);
}

inicializarProductos();
cargarPedidos();