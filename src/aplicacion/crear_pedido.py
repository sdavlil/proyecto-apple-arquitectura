class CrearPedido:
    def __init__(self, gestor_pedidos):
            self.gestor_pedidos = gestor_pedidos

    def ejecutar(
            self, 
            id_pedido, 
            nombre_producto=None, 
            precio_producto=0, 
            cliente="", 
            productos=None 
        ):     
            return self.gestor_pedidos.crear_pedido(
                id_pedido=id_pedido,
                nombre_producto=nombre_producto,
                precio_producto=precio_producto,
                cliente=cliente,
                productos=productos
        )