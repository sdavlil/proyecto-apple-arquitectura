from flask import Flask, jsonify, request

from src.dominio.gestor_pedidos import GestorPedidos
from src.dominio.estado_pedido import EstadoPedido

from src.aplicacion.crear_pedido import CrearPedido
from src.aplicacion.mover_pedido import MoverPedido
from src.aplicacion.obtener_pedidos import ObtenerPedidos

app = Flask(__name__)

gestor_pedidos = GestorPedidos()

crear_pedido = CrearPedido(gestor_pedidos)
mover_pedido = MoverPedido(gestor_pedidos)
obtener_pedidos = ObtenerPedidos(gestor_pedidos)


@app.route("/pedidos", methods=["POST"])
def crear():
    data = request.get_json()

    pedido = crear_pedido.ejecutar(
        id_pedido=data["id_pedido"],
        nombre_producto=data["nombre_producto"]
    )

    return jsonify({
        "id_pedido": pedido.id_pedido,
        "nombre_producto": pedido.nombre_producto,
        "estado": pedido.estado.value
    })


@app.route("/pedidos/<int:id_pedido>/estado", methods=["PUT"])
def mover(id_pedido):
    data = request.get_json()

    nuevo_estado = EstadoPedido(data["estado"])

    pedido = mover_pedido.ejecutar(
        id_pedido=id_pedido,
        nuevo_estado=nuevo_estado
    )

    return jsonify({
        "id_pedido": pedido.id_pedido,
        "nombre_producto": pedido.nombre_producto,
        "estado": pedido.estado.value
    })


@app.route("/pedidos", methods=["GET"])
def listar():
    pedidos = obtener_pedidos.ejecutar()

    return jsonify([
        {
            "id_pedido": pedido.id_pedido,
            "nombre_producto": pedido.nombre_producto,
            "estado": pedido.estado.value
        }
        for pedido in pedidos
    ])


if __name__ == "__main__":
    app.run(debug=True)