-- ==========================================
-- Dagna Website
-- Sample Development Data
-- ==========================================
-- Development only.
-- Do not run this file in production.
INSERT INTO products (
        category_id,
        name,
        slug,
        short_description,
        description,
        price,
        stock,
        is_featured
    )
VALUES (
        1,
        'Gnomo Guardián del Bosque',
        'gnomo-guardian-del-bosque',
        'Protector de senderos mágicos.',
        'Gnomo artesanal hecho a mano inspirado en los bosques encantados.',
        12500.00,
        5,
        TRUE
    ),
    (
        2,
        'Hada de la Luna',
        'hada-de-la-luna',
        'Guardiana de los sueños.',
        'Hada artesanal inspirada en la luz de la luna.',
        14500.00,
        3,
        TRUE
    ) ON DUPLICATE KEY
UPDATE category_id =
VALUES(category_id),
    name =
VALUES(name),
    short_description =
VALUES(short_description),
    description =
VALUES(description),
    price =
VALUES(price),
    stock =
VALUES(stock),
    is_featured =
VALUES(is_featured);