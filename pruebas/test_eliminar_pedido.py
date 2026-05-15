import pytest

from src.dominio.gestor_pedidos import GestorPedidos


def test_eliminar_pedido_uno_por_uno():
    gestor = GestorPedidos()

    gestor.crear_pedido(1, "iPhone 16", 699)
    gestor.crear_pedido(2, "iPad Air M4", 599)

    eliminado = gestor.eliminar_pedido(1)

    assert eliminado.id_pedido == 1
    assert len(gestor.pedidos) == 1
    assert gestor.pedidos[0].id_pedido == 2


def test_eliminar_pedido_inexistente_falla():
    gestor = GestorPedidos()

    with pytest.raises(ValueError):
        gestor.eliminar_pedido(99)