from enum import Enum

class EstadoPedido(Enum):
    PENDIENTE = "PENDIENTE"
    PROCESANDO = "PROCESANDO"
    ENTREGADO = "ENTREGADO"
    