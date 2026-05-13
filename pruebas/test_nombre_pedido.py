import pytest

from src.dominio.gestor_pedidos import GestorPedidos
from src.dominio.errores import ErrorNombrePedidoInvalido


def test_nombre_vacio_falla():
    gestor = GestorPedidos()

    with pytest.raises(ErrorNombrePedidoInvalido):
        gestor.crear_pedido(1, "")