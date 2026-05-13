class CrearPedido:
    def __init__(self, gestor_pedidos):
        self.gestor_pedidos = gestor_pedidos

    def ejecutar(self, id_pedido, nombre_producto):
        return self.gestor_pedidos.crear_pedido(
            id_pedido=id_pedido,
            nombre_producto=nombre_producto
        )