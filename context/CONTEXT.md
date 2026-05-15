# CONTEXT.md

## Nombre del proyecto
Gestor de Pedidos Apple con Límite de Procesamiento

## Objetivo del proyecto
Construir una aplicación web para gestionar pedidos de productos Apple
mediante un flujo controlado de estados utilizando arquitectura hexagonal,
reglas de dominio y validaciones automatizadas.

## Descripción general
El sistema permite crear y administrar pedidos de productos Apple
como iPhone, MacBook, iPad y AirPods.

Cada pedido pasa por un flujo de estados:

- PENDIENTE
- PROCESANDO
- ENTREGADO

El sistema implementa un límite de procesamiento inspirado
en la metodología Kanban WIP.

## Regla principal
Solo pueden existir máximo 3 pedidos simultáneamente
en estado PROCESANDO.

## Funcionalidades principales
- Crear pedidos
- Visualizar pedidos
- Mover pedidos entre estados válidos
- Eliminar pedidos
- Validar reglas de negocio
- Persistir datos en JSON

## Alcance
El sistema incluye:
- Backend en Python y Flask
- Persistencia JSON
- Frontend HTML/CSS/JavaScript
- Pruebas con pytest
- Arquitectura Hexagonal

## Exclusiones
El sistema NO incluye:
- Login
- Autenticación
- Base de datos SQL
- Pasarela de pagos
- Frameworks frontend
- Gestión de usuarios

## Objetivo académico
Aplicar:
- Arquitectura Hexagonal
- Clean Architecture
- Domain Driven Design
- Testing automatizado
- Desarrollo controlado con IA
- Trazabilidad mediante Git y documentación