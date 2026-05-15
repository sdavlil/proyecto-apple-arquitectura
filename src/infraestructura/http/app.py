import os

from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS

from src.dominio.gestor_pedidos import GestorPedidos
from src.dominio.estado_pedido import EstadoPedido
from src.dominio.errores import (
    ErrorLimiteProcesamientoExcedido,
    ErrorNombrePedidoInvalido,
    ErrorTransicionInvalida,
)

from src.aplicacion.crear_pedido import CrearPedido
from src.aplicacion.mover_pedido import MoverPedido
from src.aplicacion.obtener_pedidos import ObtenerPedidos
from src.aplicacion.eliminar_pedido import EliminarPedido

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../.."))
FRONTEND_DIR = os.path.join(BASE_DIR, "frontend")

app = Flask(__name__, static_folder=FRONTEND_DIR, static_url_path="")
CORS(app)

gestor_pedidos = GestorPedidos()

crear_pedido = CrearPedido(gestor_pedidos)
mover_pedido = MoverPedido(gestor_pedidos)
obtener_pedidos = ObtenerPedidos(gestor_pedidos)
eliminar_pedido = EliminarPedido(gestor_pedidos)


def pedido_a_json(pedido):
    return {
        "id_pedido": pedido.id_pedido,
        "cliente": getattr(pedido, "cliente", ""),
        "nombre_producto": pedido.nombre_producto,
        "precio_producto": getattr(pedido, "precio_producto", 0),
        "productos": getattr(pedido, "productos", []),
        "estado": pedido.estado.value,
    }


def siguiente_id_pedido():
    if not gestor_pedidos.pedidos:
        return 1

    return max(pedido.id_pedido for pedido in gestor_pedidos.pedidos) + 1


@app.errorhandler(ErrorNombrePedidoInvalido)
def manejar_nombre_invalido(_error):
    return jsonify({"message": "Debes seleccionar al menos un producto válido."}), 400


@app.errorhandler(ErrorTransicionInvalida)
def manejar_transicion_invalida(_error):
    return jsonify({"message": "La transición de estado no está permitida."}), 400


@app.errorhandler(ErrorLimiteProcesamientoExcedido)
def manejar_limite_procesamiento(_error):
    return jsonify({"message": "Solo se permiten 3 pedidos en procesamiento al mismo tiempo."}), 400


@app.errorhandler(ValueError)
def manejar_valor_invalido(error):
    return jsonify({"message": str(error)}), 404


@app.route("/")
def inicio():
    return send_from_directory(FRONTEND_DIR, "index.html")


@app.route("/pedidos", methods=["POST"])
def crear():
    data = request.get_json() or {}

    pedido = crear_pedido.ejecutar(
        id_pedido=siguiente_id_pedido(),
        nombre_producto=data.get("nombre_producto"),
        precio_producto=data.get("precio_producto", 0),
        cliente=data.get("cliente", ""),
        productos=data.get("productos", []),
    )

    return jsonify(pedido_a_json(pedido)), 201


@app.route("/pedidos/<int:id_pedido>/estado", methods=["PUT"])
def mover(id_pedido):
    data = request.get_json() or {}
    nuevo_estado = EstadoPedido(data["estado"])

    pedido = mover_pedido.ejecutar(
        id_pedido=id_pedido,
        nuevo_estado=nuevo_estado,
    )

    return jsonify(pedido_a_json(pedido))


@app.route("/pedidos/<int:id_pedido>", methods=["DELETE"])
def eliminar(id_pedido):
    pedido = eliminar_pedido.ejecutar(id_pedido=id_pedido)

    return jsonify({
        "message": "Pedido eliminado correctamente.",
        "pedido": pedido_a_json(pedido),
    })


@app.route("/pedidos", methods=["GET"])
def listar():
    pedidos = obtener_pedidos.ejecutar()
    return jsonify([pedido_a_json(pedido) for pedido in pedidos])


if __name__ == "__main__":
    app.run(debug=True)