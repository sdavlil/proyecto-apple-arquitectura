# gestor_pedidos.py

from pedido import Pedido
from estado_pedido import EstadoPedido
from errores import (
    ErrorLimiteProcesamientoExcedido,
    ErrorTransicionInvalida,
    ErrorNombrePedidoInvalido
)


class GestorPedidos:
    LIMITE_PROCESANDO = 3

    def __init__(self):
        self.pedidos = []

    def crear_pedido(self, id_pedido, nombre_producto):
        if not nombre_producto or not nombre_producto.strip():
            raise ErrorNombrePedidoInvalido()

        pedido = Pedido(
            id_pedido=id_pedido,
            nombre_producto=nombre_producto,
            estado=EstadoPedido.PENDIENTE
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

        if nuevo_estado == EstadoPedido.PROCESANDO:
            if self.pedidos_procesando() >= self.LIMITE_PROCESANDO:
                raise ErrorLimiteProcesamientoExcedido()

        if (
            pedido.estado == EstadoPedido.PENDIENTE
            and nuevo_estado not in [
                EstadoPedido.PROCESANDO,
                EstadoPedido.ENTREGADO
            ]
        ):
            raise ErrorTransicionInvalida()

        if (
            pedido.estado == EstadoPedido.PROCESANDO
            and nuevo_estado != EstadoPedido.ENTREGADO
        ):
            raise ErrorTransicionInvalida()

        pedido.estado = nuevo_estado
        return pedido

    def buscar_pedido(self, id_pedido):
        for pedido in self.pedidos:
            if pedido.id_pedido == id_pedido:
                return pedido

        raise ValueError("Pedido no encontrado")