# FEATURE_SPEC_002.md

## Funcionalidad
Mover pedido entre estados

## Descripción
El sistema debe permitir mover pedidos
entre estados válidos.

---

# Criterios de aceptación

## AC-01
Debe permitir:
PENDIENTE -> PROCESANDO

## AC-02
Debe permitir:
PROCESANDO -> ENTREGADO

## AC-03
Debe impedir:
PENDIENTE -> ENTREGADO

## AC-04
Debe impedir:
ENTREGADO -> PROCESANDO

## AC-05
No pueden existir más de 3 pedidos
en PROCESANDO.

## AC-06
Si el límite se excede:
ErrorLimiteProcesamientoExcedido