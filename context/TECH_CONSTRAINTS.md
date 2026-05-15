# TECH_CONSTRAINTS.md

## Backend
- Python 3.11
- Flask

## Persistencia
- JSON

## Frontend
- HTML5
- CSS3
- JavaScript Vanilla

## Testing
- pytest

## Control de versiones
- Git

## Arquitectura
- Arquitectura Hexagonal
- Clean Architecture

---

# Restricciones

NO usar:
- React
- Angular
- Vue
- Django
- PostgreSQL
- MySQL
- MongoDB

---

# Reglas de implementación

- La lógica del negocio debe vivir
  únicamente en el dominio.

- El frontend NO es la fuente de verdad.

- Flask NO debe contener reglas de negocio.

- Las operaciones inválidas deben
  lanzar excepciones de dominio.

- Todo cambio debe validarse con pytest.