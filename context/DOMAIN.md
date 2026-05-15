# DOMAIN.md

## Dominio principal
Gestión de pedidos Apple.

## Entidad principal
Pedido

## Aggregate Root
GestorPedidos

## Estados válidos
- PENDIENTE
- PROCESANDO
- ENTREGADO

---

# Invariantes del dominio

## INV-01
No pueden existir más de 3 pedidos
en estado PROCESANDO.

## INV-02
Si se excede el límite:
ErrorLimiteProcesamientoExcedido

## INV-03
Transiciones válidas:
- PENDIENTE -> PROCESANDO
- PROCESANDO -> ENTREGADO

## INV-04
Transiciones inválidas:
- PENDIENTE -> ENTREGADO
- ENTREGADO -> PROCESANDO
- ENTREGADO -> PENDIENTE

## INV-05
Todo pedido debe tener un nombre válido.

## INV-06
No se permiten nombres vacíos.

## INV-07
Las operaciones inválidas no deben
persistir cambios parciales.

---

# Responsabilidad del dominio

El dominio es la fuente de verdad del sistema.

Las reglas NO deben implementarse en:
- HTML
- CSS
- JavaScript
- Flask

Las reglas deben vivir exclusivamente
en GestorPedidos.