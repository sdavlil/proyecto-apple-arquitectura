import pytest

from src.dominio.gestor_pedidos import GestorPedidos
from src.dominio.estado_pedido import EstadoPedido
from src.dominio.errores import ErrorLimiteProcesamientoExcedido


def test_limite_procesamiento_excedido():
    gestor = GestorPedidos()

    # Crear 3 pedidos en PROCESANDO (límite)
    for i in range(3):
        gestor.crear_pedido(i, f"Producto {i}")
        gestor.cambiar_estado(i, EstadoPedido.PROCESANDO)

    # El cuarto debe fallar
    gestor.crear_pedido(4, "iPhone 15")

    with pytest.raises(ErrorLimiteProcesamientoExcedido):
        gestor.cambiar_estado(4, EstadoPedido.PROCESANDO)