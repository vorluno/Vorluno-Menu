-- CodeMenu Seed Data for CIELO Rooftop Bar
-- Run this after schema.sql

-- Clear existing data (optional - comment out if you want to preserve data)
-- TRUNCATE categories, products CASCADE;

-- Insert Categories
INSERT INTO categories (name_es, name_en, slug, sort_order) VALUES
('Entradas', 'Starters', 'entradas', 1),
('Carnes', 'Meats', 'carnes', 2),
('Del Mar', 'Seafood', 'del-mar', 3),
('Pastas', 'Pastas', 'pastas', 4),
('Burgers', 'Burgers', 'burgers', 5),
('Sides', 'Sides', 'sides', 6),
('Ensaladas', 'Salads', 'ensaladas', 7),
('Menú Infantil', 'Kids Menu', 'menu-infantil', 8),
('Postres', 'Desserts', 'postres', 9),
('Cocktails', 'Cocktails', 'cocktails', 10),
('Mocktails', 'Mocktails', 'mocktails', 11),
('Sangrías', 'Sangrias', 'sangrias', 12),
('Champañas', 'Champagnes', 'champanas', 13),
('Espumantes', 'Sparkling', 'espumantes', 14),
('Vinos Tintos', 'Red Wines', 'vinos-tintos', 15),
('Vinos Blancos', 'White Wines', 'vinos-blancos', 16),
('Vinos Rosados', 'Rosé Wines', 'vinos-rosados', 17)
ON CONFLICT (slug) DO NOTHING;

-- Insert Products: Entradas
INSERT INTO products (category_id, name_es, name_en, description_es, description_en, price, sort_order, is_featured) VALUES
((SELECT id FROM categories WHERE slug = 'entradas'), 'Tacos de Salmón', 'Salmon Tacos', 'Salmón, cebolla morada, cilantro, ají dulce, yuzu ponzu y alioli de trufa blanca.', 'Salmon, red onion, cilantro, sweet pepper, yuzu ponzu and white truffle aioli.', 14, 1, true),
((SELECT id FROM categories WHERE slug = 'entradas'), 'Tartar de Atún', 'Tuna Tartare', 'Atún, cebolla morada, cilantro, ají dulce, tomate, pepino, aguacate, aceite de trufa blanca y salsa poke con kimchee.', 'Tuna, red onion, cilantro, sweet pepper, tomato, cucumber, avocado, white truffle oil and poke sauce with kimchi.', 14, 2, true),
((SELECT id FROM categories WHERE slug = 'entradas'), 'Ceviche de Pulpo', 'Octopus Ceviche', 'Pulpo, cebolla morada, cilantro, ají dulce, tomate, pepino y leche de tigre.', 'Octopus, red onion, cilantro, sweet pepper, tomato, cucumber and tiger''s milk.', 16, 3, false),
((SELECT id FROM categories WHERE slug = 'entradas'), 'Ceviche de Camarón', 'Shrimp Ceviche', 'Camarón, cebolla morada, cilantro, ají dulce, mango y leche de tigre.', 'Shrimp, red onion, cilantro, sweet pepper, mango and tiger''s milk.', 14, 4, false),
((SELECT id FROM categories WHERE slug = 'entradas'), 'Ceviche de Corvina', 'Corvina Ceviche', 'Corvina, cebolla morada, cilantro, ají dulce, culantro, rábano, manzana verde y leche de tigre.', 'Corvina, red onion, cilantro, sweet pepper, culantro, radish, green apple and tiger''s milk.', 14, 5, false),
((SELECT id FROM categories WHERE slug = 'entradas'), 'Ceviche de Combinación', 'Combination Ceviche', 'Corvina, atún, pulpo, camarón, cebolla morada, cilantro, ají dulce, piña y leche de tigre de pimentón.', 'Corvina, tuna, octopus, shrimp, red onion, cilantro, sweet pepper, pineapple and paprika tiger''s milk.', 16, 6, true),
((SELECT id FROM categories WHERE slug = 'entradas'), 'Popcorn Fish Ceviche', 'Popcorn Fish Ceviche', 'Corvina apanada, cebolla morada, cilantro, ají dulce, limón, aceite de oliva, leche de tigre y salsa huancaína.', 'Breaded corvina, red onion, cilantro, sweet pepper, lime, olive oil, tiger''s milk and huancaina sauce.', 14, 7, false),
((SELECT id FROM categories WHERE slug = 'entradas'), 'Empanadas de Pulpo al Coco', 'Coconut Octopus Empanadas', 'Pulpo, cebolla morada, cilantro, ají dulce, ajo, tomate, leche de coco, aceite de coco, salsa de chimichurri verde y anticuchera.', 'Octopus, red onion, cilantro, sweet pepper, garlic, tomato, coconut milk, coconut oil, green chimichurri sauce and anticuchera.', 14, 8, false),
((SELECT id FROM categories WHERE slug = 'entradas'), 'Baos de Short Ribs', 'Short Ribs Baos', 'Short ribs ahumados, cebolla morada encurtida, micro cilantro y salsa anticuchera.', 'Smoked short ribs, pickled red onion, micro cilantro and anticuchera sauce.', 12, 9, false),
((SELECT id FROM categories WHERE slug = 'entradas'), 'Orange Popcorn Chicken', 'Orange Popcorn Chicken', 'Pechuguitas de pollo apanado, salsa de naranja importada, miel y sambal.', 'Breaded chicken bites, imported orange sauce, honey and sambal.', 13, 10, false),
((SELECT id FROM categories WHERE slug = 'entradas'), 'Gyozas Fritas de Camarón', 'Fried Shrimp Gyozas', 'Camarón, cebolla morada, cilantro, ají dulce, ajo, sésamo, alga nori, salsa de soya y gel de ají amarillo.', 'Shrimp, red onion, cilantro, sweet pepper, garlic, sesame, nori seaweed, soy sauce and yellow pepper gel.', 14, 11, false),
((SELECT id FROM categories WHERE slug = 'entradas'), 'Croquetas Short Ribs', 'Short Ribs Croquettes', 'Short ribs ahumados, reducción de carne y salsa de ají guajillo.', 'Smoked short ribs, meat reduction and guajillo pepper sauce.', 12, 12, false),
((SELECT id FROM categories WHERE slug = 'entradas'), 'Chicharrón de Porkbelly', 'Porkbelly Chicharrón', 'Pork belly, rizos de cebollín, limón persa, gel de ají chombo, y salsa agridulce de tamarindo.', 'Pork belly, chive curls, Persian lime, chombo pepper gel, and sweet and sour tamarind sauce.', 16, 13, false),
((SELECT id FROM categories WHERE slug = 'entradas'), 'Sliders Burger', 'Burger Sliders', 'Blend de carne de res angus, cebolla morada crocante, queso mozzarella ahumado, pan de papa y alioli de ajo en confit.', 'Angus beef blend, crispy red onion, smoked mozzarella cheese, potato bun and confit garlic aioli.', 16, 14, false),
((SELECT id FROM categories WHERE slug = 'entradas'), 'Trio de Sliders Burger', 'Trio Burger Sliders', 'Tres sliders: Angus beef, pollo apanado con queso manchego, y short ribs ahumados.', 'Three sliders: Angus beef, breaded chicken with manchego cheese, and smoked short ribs.', 18, 15, false),
((SELECT id FROM categories WHERE slug = 'entradas'), 'Carpaccio Wellington', 'Carpaccio Wellington', 'Carne de res, mix de hongos, aderezo de mostaza antigua y demi glace de carne acompañado de pan de yuca.', 'Beef, mushroom mix, old mustard dressing and meat demi glace accompanied by yuca bread.', 14, 16, false);

-- Insert Products: Carnes
INSERT INTO products (category_id, name_es, name_en, description_es, description_en, price, sort_order) VALUES
((SELECT id FROM categories WHERE slug = 'carnes'), 'Wings', 'Wings', '10 unidades de alitas apanadas, bañadas en salsa especial koreana, acompañadas con nuestra salsa tártara hecha en casa.', '10 breaded wings, coated in special Korean sauce, accompanied with our homemade tartar sauce.', 16, 1),
((SELECT id FROM categories WHERE slug = 'carnes'), 'New York 16oz', 'New York 16oz', 'New York 16 oz, mantequilla de ajo y romero, acompañado de papas wedge y chimichurry de la casa.', '16 oz New York strip, garlic and rosemary butter, accompanied by wedge fries and house chimichurri.', 38, 2),
((SELECT id FROM categories WHERE slug = 'carnes'), 'Entraña Prime 12oz', 'Prime Skirt Steak 12oz', 'Entraña Prime 12 oz, chimichurri tatemado de la casa y sal gruesa. Acompañada de papas wedge.', '12 oz Prime skirt steak, house charred chimichurri and coarse salt. Accompanied by wedge fries.', 38, 3);

-- Insert Products: Del Mar
INSERT INTO products (category_id, name_es, name_en, description_es, description_en, price, sort_order) VALUES
((SELECT id FROM categories WHERE slug = 'del-mar'), 'Pesca del Día', 'Catch of the Day', 'Pesca del día, espejo de fumet con naranja y aromáticas, vegetales frescos, tomate cherry y aceite verde. Acompañada de papas wedge.', 'Catch of the day, fumet mirror with orange and aromatics, fresh vegetables, cherry tomato and green oil. Accompanied by wedge fries.', 20, 1),
((SELECT id FROM categories WHERE slug = 'del-mar'), 'Sellado de Atún', 'Seared Tuna', 'Atún, mézclum y salsa de maracuyá mirin.', 'Tuna, mesclun and passion fruit mirin sauce.', 20, 2),
((SELECT id FROM categories WHERE slug = 'del-mar'), 'Salmón al Miso', 'Miso Salmon', 'Salmón con vegetales salteados (mézclum, baby corn, baby carrot) y salsa miso.', 'Salmon with sautéed vegetables (mesclun, baby corn, baby carrot) and miso sauce.', 22, 3);

-- Insert Products: Pastas
INSERT INTO products (category_id, name_es, name_en, description_es, description_en, price, sort_order) VALUES
((SELECT id FROM categories WHERE slug = 'pastas'), 'Mac & Cheese 4 Quesos', '4 Cheese Mac & Cheese', 'Grana padano, cheddar, queso de cabra, roquefort y pasta gomiti.', 'Grana padano, cheddar, goat cheese, roquefort and gomiti pasta.', 12, 1),
((SELECT id FROM categories WHERE slug = 'pastas'), 'Pasta Boloñesa', 'Bolognese Pasta', 'Pasta linguini con salsa de tomate, cebolla, apio, zanahoria, carne molida y queso grana padano.', 'Linguini pasta with tomato sauce, onion, celery, carrot, ground beef and grana padano cheese.', 16, 2),
((SELECT id FROM categories WHERE slug = 'pastas'), 'Frutos del Mar al Bisque', 'Seafood Bisque', 'Pasta linguini, almejas blancas, mejillones, pulpo importado, camarones, calamar, ajo, albahaca, vino blanco y bisque de langostinos.', 'Linguini pasta, white clams, mussels, imported octopus, shrimp, squid, garlic, basil, white wine and lobster bisque.', 20, 3),
((SELECT id FROM categories WHERE slug = 'pastas'), 'Risotto de Langostinos', 'Shrimp Risotto', 'Langostinos jumbo, arroz arbóreo, espárragos, sofrito de cebolla y vino blanco, queso parmesano, ciboulette y bisque de langostinos.', 'Jumbo shrimp, arborio rice, asparagus, onion sofrito and white wine, parmesan cheese, chives and lobster bisque.', 22, 4);

-- Insert Products: Burgers
INSERT INTO products (category_id, name_es, name_en, description_es, description_en, price, sort_order, is_featured) VALUES
((SELECT id FROM categories WHERE slug = 'burgers'), 'Cielo Burger', 'Cielo Burger', '7 oz de nuestro blend de carnes angus, queso chela cheddar añejado, bacon glaseado con whisky, maple y alioli tatemado. Acompañado de papas fritas trufadas.', '7 oz of our angus beef blend, aged chela cheddar cheese, whisky and maple glazed bacon, and charred aioli. Accompanied by truffle fries.', 18, 1, true),
((SELECT id FROM categories WHERE slug = 'burgers'), 'Chicken Burger', 'Chicken Burger', '7oz pechuga de pollo apanada, queso manchego, tomate y pan de papa. Acompañada de papas fritas trufadas.', '7oz breaded chicken breast, manchego cheese, tomato and potato bun. Accompanied by truffle fries.', 16, 2, false);

-- Insert Products: Sides
INSERT INTO products (category_id, name_es, name_en, description_es, description_en, price, sort_order) VALUES
((SELECT id FROM categories WHERE slug = 'sides'), 'White Truffle Fries', 'White Truffle Fries', 'Papas, queso parmesano, aceite de trufa blanca y polvo de trufa negra.', 'Fries, parmesan cheese, white truffle oil and black truffle powder.', 8, 1),
((SELECT id FROM categories WHERE slug = 'sides'), 'Papas Wedge', 'Wedge Fries', 'Home fries y especias cajun de Luisiana.', 'Home fries and Louisiana cajun spices.', 8, 2),
((SELECT id FROM categories WHERE slug = 'sides'), 'Patacones', 'Patacones', 'Mix de ajo y sal Maldon.', 'Garlic mix and Maldon salt.', 8, 3),
((SELECT id FROM categories WHERE slug = 'sides'), 'Puré de Papa', 'Mashed Potatoes', 'Puré de papa cremoso.', 'Creamy mashed potatoes.', 8, 4),
((SELECT id FROM categories WHERE slug = 'sides'), 'Espárragos al Ajo', 'Garlic Asparagus', 'Espárragos al ajo con vino blanco y ciboulette.', 'Garlic asparagus with white wine and chives.', 12, 5);

-- Insert Products: Ensaladas
INSERT INTO products (category_id, name_es, name_en, description_es, description_en, price, sort_order) VALUES
((SELECT id FROM categories WHERE slug = 'ensaladas'), 'Ensalada de la Casa', 'House Salad', 'Camarones crocantes, mézclum de lechugas, tomate confit, vinagreta de cilantro, reducción balsámica, hilos crocantes de arroz y mix de sésamo.', 'Crispy shrimp, lettuce mesclun, confit tomato, cilantro vinaigrette, balsamic reduction, crispy rice threads and sesame mix.', 12, 1),
((SELECT id FROM categories WHERE slug = 'ensaladas'), 'Mozza & Cherry Salad', 'Mozza & Cherry Salad', 'Base fondue mozzarella, boconcini burrata, mézclum tomate cherry, tomate perita, pesto y aceite verde.', 'Mozzarella fondue base, burrata boconcini, cherry tomato mesclun, pear tomato, pesto and green oil.', 12, 2);

-- Insert Products: Menú Infantil
INSERT INTO products (category_id, name_es, name_en, description_es, description_en, price, sort_order) VALUES
((SELECT id FROM categories WHERE slug = 'menu-infantil'), 'Deditos de Pollo', 'Chicken Fingers', 'Pechuga de pollo apanada, acompañadas de papas fritas.', 'Breaded chicken breast, accompanied by french fries.', 12, 1),
((SELECT id FROM categories WHERE slug = 'menu-infantil'), 'Slider Kids', 'Kids Slider', 'Blend de carne angus, queso cheddar añejo, salsa mayonesa y ketchup. 2 unidades.', 'Angus beef blend, aged cheddar cheese, mayo sauce and ketchup. 2 units.', 10, 2);

-- Insert Products: Postres
INSERT INTO products (category_id, name_es, name_en, description_es, description_en, price, sort_order, is_featured) VALUES
((SELECT id FROM categories WHERE slug = 'postres'), 'Brownie con Helado', 'Brownie with Ice Cream', 'Brownie clásico de chocolate con sirope de Hershey''s y helado de vainilla.', 'Classic chocolate brownie with Hershey''s syrup and vanilla ice cream.', 12, 1, false),
((SELECT id FROM categories WHERE slug = 'postres'), 'Sky Coconut', 'Sky Coconut', 'Helado de pipa, mousselina de coco, mixto frutal tropical y sirope de frutos rojos.', 'Coconut water ice cream, coconut mousseline, tropical fruit mix and berry syrup.', 15, 2, true),
((SELECT id FROM categories WHERE slug = 'postres'), 'Flan de la Casa', 'House Flan', 'Flan de la casa con sabor a popcorn, popcorn acaramelado, crumble de galleta de vainilla y helado de vainilla.', 'House flan with popcorn flavor, caramelized popcorn, vanilla cookie crumble and vanilla ice cream.', 15, 3, false),
((SELECT id FROM categories WHERE slug = 'postres'), 'Tiramisú', 'Tiramisu', 'Bizcocho de pistacho con helado de café y crema de chantillí.', 'Pistachio sponge cake with coffee ice cream and chantilly cream.', 15, 4, false),
((SELECT id FROM categories WHERE slug = 'postres'), 'Tres Leches', 'Tres Leches', 'Tres leches de la casa con crema chantilly y fresas.', 'House tres leches with chantilly cream and strawberries.', 15, 5, false);

-- Insert Products: Cocktails
INSERT INTO products (category_id, name_es, name_en, description_es, description_en, price, sort_order, is_featured) VALUES
((SELECT id FROM categories WHERE slug = 'cocktails'), 'Aurora Mule', 'Aurora Mule', 'Gin Bombay, sirope de jengibre y romero, limón y ginger beer.', 'Bombay gin, ginger and rosemary syrup, lemon and ginger beer.', 13, 1, true),
((SELECT id FROM categories WHERE slug = 'cocktails'), 'Sky Blue Margarita', 'Sky Blue Margarita', 'Tequila Jose Cuervo, blue curaçao, triple sec, limón y sirope simple.', 'Jose Cuervo tequila, blue curaçao, triple sec, lime and simple syrup.', 12, 2, true),
((SELECT id FROM categories WHERE slug = 'cocktails'), 'Mojito Tangerine', 'Mojito Tangerine', 'Ron Bacardí carta blanca, cordial de mandarina y club soda.', 'Bacardi white rum, tangerine cordial and club soda.', 12, 3, false),
((SELECT id FROM categories WHERE slug = 'cocktails'), 'Carajillo Sweet', 'Carajillo Sweet', 'Espresso Lavazza, Licor 43, Frangelico y sirope de vainilla.', 'Lavazza espresso, Licor 43, Frangelico and vanilla syrup.', 12, 4, false),
((SELECT id FROM categories WHERE slug = 'cocktails'), 'Violet Gin Tonic', 'Violet Gin Tonic', 'Gin Bombay infusionado de butterfly pea tea, cordial de limón y tónica.', 'Bombay gin infused with butterfly pea tea, lemon cordial and tonic.', 12, 5, false),
((SELECT id FROM categories WHERE slug = 'cocktails'), 'Celestial Colada', 'Celestial Colada', 'Ron Bacardi carta blanca, crema de coco, jugo de piña y blue curaçao.', 'Bacardi white rum, coconut cream, pineapple juice and blue curaçao.', 12, 6, false),
((SELECT id FROM categories WHERE slug = 'cocktails'), 'Gates of Heaven', 'Gates of Heaven', 'Tequila Patron Silver, Cointreau, sirope habanero, zumo limón y piña.', 'Patron Silver tequila, Cointreau, habanero syrup, lemon and pineapple juice.', 14, 7, false),
((SELECT id FROM categories WHERE slug = 'cocktails'), 'Dreamy Daiquiri', 'Dreamy Daiquiri', 'Ron Bacardi 8 años, cordial de fresa y crema de coco Cielo.', 'Bacardi 8 year rum, strawberry cordial and Cielo coconut cream.', 12, 8, false),
((SELECT id FROM categories WHERE slug = 'cocktails'), 'Stardust Paloma', 'Stardust Paloma', 'Mezcal Montelobos, sirope de chile habanero y lima, jugo de mandarina, soda y tajín.', 'Montelobos mezcal, habanero and lime syrup, tangerine juice, soda and tajin.', 13, 9, false),
((SELECT id FROM categories WHERE slug = 'cocktails'), 'Fire Whisky Sour', 'Fire Whisky Sour', 'Whisky Bulleit Bourbon, sirope habanero, zumo de lima y angostura.', 'Bulleit Bourbon whisky, habanero syrup, lime juice and angostura.', 15, 10, false),
((SELECT id FROM categories WHERE slug = 'cocktails'), 'Aperol Chenet', 'Aperol Chenet', 'JP. Chenet, Aperol, licor de lychee, zumo limón y simple sirope.', 'JP. Chenet, Aperol, lychee liqueur, lemon juice and simple syrup.', 16, 11, false),
((SELECT id FROM categories WHERE slug = 'cocktails'), 'Long Island Spicy', 'Long Island Spicy', 'Vodka Absolut, Gin Bombay, Ron Bacardi, Tequila Jose Cuervo, triple sec, lima, sirope habanero y top de club soda.', 'Absolut vodka, Bombay gin, Bacardi rum, Jose Cuervo tequila, triple sec, lime, habanero syrup and club soda top.', 12, 12, false);

-- Insert Products: Mocktails
INSERT INTO products (category_id, name_es, name_en, description_es, description_en, price, sort_order) VALUES
((SELECT id FROM categories WHERE slug = 'mocktails'), 'Tardeo Cranberry', 'Tardeo Cranberry', 'Cranberry, sirope simple, zumo de limón y sirope de cereza.', 'Cranberry, simple syrup, lemon juice and cherry syrup.', 10, 1),
((SELECT id FROM categories WHERE slug = 'mocktails'), 'Tardeo Butterfly', 'Tardeo Butterfly', 'Sirope de butterfly pea tea, cordial limón y top de soda simple.', 'Butterfly pea tea syrup, lemon cordial and simple soda top.', 10, 2),
((SELECT id FROM categories WHERE slug = 'mocktails'), 'Tardeo Passion', 'Tardeo Passion', 'Zumo de maracuyá, sirope de jengibre, romero y top de soda de jengibre.', 'Passion fruit juice, ginger syrup, rosemary and ginger soda top.', 10, 3);

-- Insert Products: Sangrías
INSERT INTO products (category_id, name_es, name_en, description_es, description_en, price, price_alt, price_alt_label, sort_order) VALUES
((SELECT id FROM categories WHERE slug = 'sangrias'), 'Sangría Rosé', 'Rosé Sangria', 'Vino rosado, licor de lychee, jugo de fresa, sirope simple, ginger ale, frutas varias y limón.', 'Rosé wine, lychee liqueur, strawberry juice, simple syrup, ginger ale, mixed fruits and lemon.', 11, 30, 'Jarra', 1),
((SELECT id FROM categories WHERE slug = 'sangrias'), 'Sangría Tinto', 'Red Sangria', 'Vino tinto, peachtree, cítricos, sirope simple, ginger ale y frutas varias.', 'Red wine, peachtree, citrus, simple syrup, ginger ale and mixed fruits.', 10, 30, 'Jarra', 2),
((SELECT id FROM categories WHERE slug = 'sangrias'), 'Sangría White', 'White Sangria', 'Vino blanco, licor de manzana, limón, club soda y frutas varias.', 'White wine, apple liqueur, lemon, club soda and mixed fruits.', 10, 30, 'Jarra', 3);

-- Insert Products: Champañas
INSERT INTO products (category_id, name_es, name_en, price, sort_order) VALUES
((SELECT id FROM categories WHERE slug = 'champanas'), 'Moët & Chandon Imperial Brut', 'Moët & Chandon Imperial Brut', 160, 1),
((SELECT id FROM categories WHERE slug = 'champanas'), 'Moët & Chandon Rosé', 'Moët & Chandon Rosé', 190, 2),
((SELECT id FROM categories WHERE slug = 'champanas'), 'Moët & Chandon Ice Imperial', 'Moët & Chandon Ice Imperial', 180, 3),
((SELECT id FROM categories WHERE slug = 'champanas'), 'Veuve Clicquot Brut', 'Veuve Clicquot Brut', 150, 4),
((SELECT id FROM categories WHERE slug = 'champanas'), 'Veuve Clicquot Rosé', 'Veuve Clicquot Rosé', 200, 5),
((SELECT id FROM categories WHERE slug = 'champanas'), 'Dom Pérignon', 'Dom Pérignon', 400, 6),
((SELECT id FROM categories WHERE slug = 'champanas'), 'Dom Pérignon Rosé', 'Dom Pérignon Rosé', 500, 7);

-- Insert Products: Espumantes
INSERT INTO products (category_id, name_es, name_en, price, sort_order) VALUES
((SELECT id FROM categories WHERE slug = 'espumantes'), 'Mionetto Prosecco', 'Mionetto Prosecco', 50, 1),
((SELECT id FROM categories WHERE slug = 'espumantes'), 'Martini Prosecco', 'Martini Prosecco', 50, 2),
((SELECT id FROM categories WHERE slug = 'espumantes'), 'Martini Sparkling Rosé', 'Martini Sparkling Rosé', 50, 3);

-- Insert Products: Vinos Tintos
INSERT INTO products (category_id, name_es, name_en, description_es, description_en, price, price_alt, price_alt_label, sort_order) VALUES
((SELECT id FROM categories WHERE slug = 'vinos-tintos'), 'Tarapacá Reserva Merlot', 'Tarapacá Reserva Merlot', 'Chile', 'Chile', 45, 7, 'Copa', 1),
((SELECT id FROM categories WHERE slug = 'vinos-tintos'), 'Riscal Tinto Tempranillo', 'Riscal Tinto Tempranillo', 'España', 'Spain', 45, 7, 'Copa', 2),
((SELECT id FROM categories WHERE slug = 'vinos-tintos'), 'Luigi Bosca Malbec', 'Luigi Bosca Malbec', 'Argentina', 'Argentina', 45, 7, 'Copa', 3),
((SELECT id FROM categories WHERE slug = 'vinos-tintos'), 'Protos Roble Tempranillo', 'Protos Roble Tempranillo', 'España', 'Spain', 45, 7, 'Copa', 4),
((SELECT id FROM categories WHERE slug = 'vinos-tintos'), 'El Enemigo Malbec', 'El Enemigo Malbec', 'Argentina', 'Argentina', 60, NULL, NULL, 5),
((SELECT id FROM categories WHERE slug = 'vinos-tintos'), '19 Crimes Red Wine Blend', '19 Crimes Red Wine Blend', 'Australia', 'Australia', 45, NULL, NULL, 6),
((SELECT id FROM categories WHERE slug = 'vinos-tintos'), 'Navarro Correa Colección Privada', 'Navarro Correa Private Collection', '3 uvas blend - Argentina', '3 grape blend - Argentina', 45, NULL, NULL, 7),
((SELECT id FROM categories WHERE slug = 'vinos-tintos'), 'Catena Alta Malbec', 'Catena Alta Malbec', 'Argentina', 'Argentina', 70, NULL, NULL, 8),
((SELECT id FROM categories WHERE slug = 'vinos-tintos'), 'Tarapacá Gran Reserva Cabernet Sauvignon', 'Tarapacá Gran Reserva Cabernet Sauvignon', 'Chile', 'Chile', 45, NULL, NULL, 9),
((SELECT id FROM categories WHERE slug = 'vinos-tintos'), 'Cline Sonoma Country Pinot Noir', 'Cline Sonoma Country Pinot Noir', 'USA', 'USA', 50, NULL, NULL, 10),
((SELECT id FROM categories WHERE slug = 'vinos-tintos'), 'Protos 27 Tempranillo', 'Protos 27 Tempranillo', 'España', 'Spain', 60, NULL, NULL, 11),
((SELECT id FROM categories WHERE slug = 'vinos-tintos'), 'Beringer Founders Merlot', 'Beringer Founders Merlot', 'Australia', 'Australia', 45, NULL, NULL, 12);

-- Insert Products: Vinos Blancos
INSERT INTO products (category_id, name_es, name_en, description_es, description_en, price, price_alt, price_alt_label, sort_order) VALUES
((SELECT id FROM categories WHERE slug = 'vinos-blancos'), 'Tarapacá Reserva Chardonnay', 'Tarapacá Reserva Chardonnay', 'Chile', 'Chile', 45, 7, 'Copa', 1),
((SELECT id FROM categories WHERE slug = 'vinos-blancos'), 'Principato Pinot Grigio', 'Principato Pinot Grigio', 'Italia', 'Italy', 45, 7, 'Copa', 2),
((SELECT id FROM categories WHERE slug = 'vinos-blancos'), 'Luigi Bosca Sauvignon Blanc', 'Luigi Bosca Sauvignon Blanc', 'Argentina', 'Argentina', 45, 7, 'Copa', 3),
((SELECT id FROM categories WHERE slug = 'vinos-blancos'), 'Marieta Albariño', 'Marieta Albariño', 'España', 'Spain', 45, 7, 'Copa', 4),
((SELECT id FROM categories WHERE slug = 'vinos-blancos'), 'Martín Códax Albariño', 'Martín Códax Albariño', 'España', 'Spain', 45, NULL, NULL, 5),
((SELECT id FROM categories WHERE slug = 'vinos-blancos'), 'Catena Alta Chardonnay', 'Catena Alta Chardonnay', 'Argentina', 'Argentina', 60, NULL, NULL, 6),
((SELECT id FROM categories WHERE slug = 'vinos-blancos'), 'El Enemigo Chardonnay', 'El Enemigo Chardonnay', 'Argentina', 'Argentina', 60, NULL, NULL, 7),
((SELECT id FROM categories WHERE slug = 'vinos-blancos'), 'Santa Margherita Pinot Grigio', 'Santa Margherita Pinot Grigio', 'Italia', 'Italy', 50, NULL, NULL, 8);

-- Insert Products: Vinos Rosados
INSERT INTO products (category_id, name_es, name_en, description_es, description_en, price, price_alt, price_alt_label, sort_order) VALUES
((SELECT id FROM categories WHERE slug = 'vinos-rosados'), 'B&G Rosé d''Anjou', 'B&G Rosé d''Anjou', 'Francia', 'France', 45, 7, 'Copa', 1),
((SELECT id FROM categories WHERE slug = 'vinos-rosados'), 'Gérard Bertrand Côte des Roses', 'Gérard Bertrand Côte des Roses', 'Francia', 'France', 45, NULL, NULL, 2),
((SELECT id FROM categories WHERE slug = 'vinos-rosados'), 'M de Minuty', 'M de Minuty', 'Francia', 'France', 45, NULL, NULL, 3);
