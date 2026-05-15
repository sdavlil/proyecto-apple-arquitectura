# gestor_pedidos.py


from src.dominio.pedido import Pedido
from src.dominio.estado_pedido import EstadoPedido
from src.dominio.errores import (
    ErrorLimiteProcesamientoExcedido,
    ErrorTransicionInvalida,
    ErrorNombrePedidoInvalido
)


class GestorPedidos:
    LIMITE_PROCESANDO = 3

    def __init__(self):
        self.pedidos = []

    def crear_pedido(
        self,
        id_pedido,
        nombre_producto=None,
        precio_producto=0,
        cliente="",
        productos=None
    ):
        productos = productos or []

        if productos:
            productos_validos = []

            for producto in productos:
                nombre = producto.get("nombre", "").strip()
                precio = producto.get("precio", 0)
                cantidad = producto.get("cantidad", 1)

                if not nombre:
                    raise ErrorNombrePedidoInvalido()

                if cantidad <= 0:
                    cantidad = 1

                productos_validos.append({
                    "nombre": nombre,
                    "precio": precio,
                    "cantidad": cantidad
                })

            nombre_producto = ", ".join(
                producto["nombre"] for producto in productos_validos
            )

            precio_producto = sum(
                producto["precio"] * producto["cantidad"]
                for producto in productos_validos
            )

            productos = productos_validos

        else:
            if not nombre_producto or not nombre_producto.strip():
                raise ErrorNombrePedidoInvalido()

            productos = [{
                "nombre": nombre_producto,
                "precio": precio_producto,
                "cantidad": 1
            }]

        pedido = Pedido(
            id_pedido=id_pedido,
            nombre_producto=nombre_producto,
            estado=EstadoPedido.PENDIENTE,
            precio_producto=precio_producto,
            cliente=cliente,
            productos=productos
        )

        self.pedidos.append(pedido)
        return pedido

    def pedidos_procesando(self):
        return sum(
            1
            for pedido in self.pedidos
            if pedido.estado == EstadoPedido.PROCESANDO
        )

    def cambiar_estado(self, id_pedido, nuevo_estado):
        pedido = self.buscar_pedido(id_pedido)

        if pedido.estado == EstadoPedido.ENTREGADO:
            raise ErrorTransicionInvalida()

        if pedido.estado == EstadoPedido.PENDIENTE and nuevo_estado == EstadoPedido.ENTREGADO:
            raise ErrorTransicionInvalida()

        if nuevo_estado == EstadoPedido.PROCESANDO:
            if self.pedidos_procesando() >= self.LIMITE_PROCESANDO:
                raise ErrorLimiteProcesamientoExcedido()

        pedido.estado = nuevo_estado
        return pedido

    def buscar_pedido(self, id_pedido):
        for pedido in self.pedidos:
            if pedido.id_pedido == id_pedido:
                return pedido

        raise ValueError("Pedido no encontrado")

    def eliminar_pedido(self, id_pedido):
        pedido = self.buscar_pedido(id_pedido)
        self.pedidos.remove(pedido)
        return pedido