class MoverPedido:
    def __init__(self, gestor_pedidos):
        self.gestor_pedidos = gestor_pedidos

    def ejecutar(self, id_pedido, nuevo_estado):
        return self.gestor_pedidos.cambiar_estado(
            id_pedido=id_pedido,
            nuevo_estado=nuevo_estado
        )