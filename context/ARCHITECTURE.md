# ARCHITECTURE.md

## Arquitectura utilizada
Arquitectura Hexagonal + Clean Architecture.

## Estructura del sistema

proyecto/
│
├── context/
├── src/
├── pruebas/
├── frontend/
├── data/
└── README.md

---

# Capas del sistema

## Dominio
Contiene:
- Pedido
- GestorPedidos
- EstadoPedido
- Reglas de negocio
- Excepciones

La capa dominio NO puede importar:
- Flask
- JSON
- HTML
- CSS
- JavaScript

---

## Aplicación
Contiene:
- Casos de uso
- Coordinación del dominio
- Puertos

Casos de uso:
- CrearPedido
- MoverPedido
- ObtenerPedidos
- EliminarPedido

---

## Infraestructura
Contiene:
- Flask
- Persistencia JSON
- Frontend
- API HTTP

---

# Persistencia
Los pedidos se almacenan en:
data/pedidos.json

---

# Frontend
Tecnologías:
- HTML
- CSS
- JavaScript Vanilla

El frontend consume la API Flask mediante fetch.