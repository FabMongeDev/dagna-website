-- ==========================================
-- Dagna Website
-- Database Seed Data
-- ==========================================
-- Required initial data
-- These records are needed for the application to work.
INSERT INTO categories (name, slug, description)
VALUES (
        'Gnomos',
        'gnomos',
        'Gnomos artesanales inspirados en el bosque.'
    ),
    (
        'Hadas',
        'hadas',
        'Hadas y criaturas mágicas hechas a mano.'
    ),
    (
        'Temporada',
        'temporada',
        'Creaciones especiales para fechas y temporadas.'
    ),
    (
        'Pedidos Personalizados',
        'pedidos-personalizados',
        'Creaciones únicas hechas por encargo.'
    ) ON DUPLICATE KEY
UPDATE name =
VALUES(name),
    description =
VALUES(description),
    is_active = TRUE;