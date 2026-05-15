class Pedido:
    def __init__(self, 
                 id_pedido, 
                nombre_producto=None,
                estado=None,
                precio_producto=0,
                cliente="",
                productos=None
                ):
                self.id_pedido = id_pedido
                self.nombre_producto = nombre_producto
                self.estado = estado
                self.precio_producto = precio_producto
                self.cliente = cliente
                self.productos = productos or []       