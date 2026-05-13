import pytest

from src.dominio.gestor_pedidos import GestorPedidos
from src.dominio.estado_pedido import EstadoPedido
from src.dominio.errores import ErrorTransicionInvalida


def test_no_puede_ir_de_pendiente_a_entregado():
    gestor = GestorPedidos()

    gestor.crear_pedido(1, "MacBook Air")

    with pytest.raises(ErrorTransicionInvalida):
        gestor.cambiar_estado(1, EstadoPedido.ENTREGADO)