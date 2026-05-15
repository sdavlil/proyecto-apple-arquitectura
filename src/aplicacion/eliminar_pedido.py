class EliminarPedido:
    def __init__(self, gestor_pedidos):
        self.gestor_pedidos = gestor_pedidos

    def ejecutar(self, id_pedido):
        return self.gestor_pedidos.eliminar_pedido(id_pedido)