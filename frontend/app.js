const API = "http://127.0.0.1:5000/pedidos";

async function cargarPedidos() {
    const res = await fetch(API);
    const pedidos = await res.json();

    document.getElementById("PENDIENTE").innerHTML = "";
    document.getElementById("PROCESANDO").innerHTML = "";
    document.getElementById("ENTREGADO").innerHTML = "";

    pedidos.forEach(p => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
            ${p.nombre_producto}
            <br>
            <button onclick="mover(${p.id_pedido}, 'PROCESANDO')">Procesar</button>
            <button onclick="mover(${p.id_pedido}, 'ENTREGADO')">Entregar</button>
        `;

        document.getElementById(p.estado).appendChild(div);
    });
}

async function crearPedido() {
    const nombre = document.getElementById("nombre_producto").value;

    const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nombre_producto: nombre
        })
    });

    if (!res.ok) {
        const err = await res.json();
        mostrarError(err.message || "Error creando pedido");
        return;
    }

    document.getElementById("nombre_producto").value = "";
    cargarPedidos();
}

async function mover(id, estado) {
    const res = await fetch(`${API}/${id}/estado`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            estado: estado
        })
    });

    if (!res.ok) {
        const err = await res.json();
        mostrarError(err.message || "Error moviendo pedido");
        return;
    }

    cargarPedidos();
}

function mostrarError(msg) {
    const errorDiv = document.getElementById("error");
    errorDiv.innerText = msg;

    setTimeout(() => {
        errorDiv.innerText = "";
    }, 3000);
}

cargarPedidos();