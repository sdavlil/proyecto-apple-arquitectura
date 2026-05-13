class ObtenerPedidos:
    def __init__(self, gestor_pedidos):
        self.gestor_pedidos = gestor_pedidos

    def ejecutar(self):
        return self.gestor_pedidos.pedidos