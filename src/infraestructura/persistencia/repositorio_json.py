import json
import os


class RepositorioJSON:
    def __init__(self, archivo="pedidos.json"):
        self.archivo = archivo

        if not os.path.exists(self.archivo):
            with open(self.archivo, "w", encoding="utf-8") as f:
                json.dump([], f)

    def guardar(self, pedidos):
        data = [
            {
                "id_pedido": pedido.id_pedido,
                "nombre_producto": pedido.nombre_producto,
                "estado": pedido.estado.value
            }
            for pedido in pedidos
        ]

        with open(self.archivo, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=4)

    def cargar(self):
        with open(self.archivo, "r", encoding="utf-8") as f:
            return json.load(f)