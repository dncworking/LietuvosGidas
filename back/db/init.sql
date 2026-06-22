-- 1. Sukuriame miestų lentelę
CREATE TABLE IF NOT EXISTS cities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- 2. Sukuriame lankytinų vietų lentelę
CREATE TABLE IF NOT EXISTS places (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    type VARCHAR(50) NOT NULL,
    description TEXT,
    image_url TEXT,
    address VARCHAR(255),
    rating INTEGER,
    is_free BOOLEAN DEFAULT TRUE,
    city_id INTEGER NOT NULL,
    CONSTRAINT fk_city FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,       
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user' NOT NULL,
    
    -- Saugumo apribojimas: DB priims TIK 'user' arba 'admin' reiksmes
    CONSTRAINT chk_role CHECK (role IN ('user', 'admin'))
);

-- 3. Įterpiame pradinius testinius duomenis nautomatu
-- Pirmiausia įterpiame miestą ir iškart pasiimame jo ID tolimesniam naudojimui
INSERT INTO cities (name) 
VALUES ('Vilnius')
ON CONFLICT (name) DO NOTHING;

-- Įterpiame lankytiną vietą, susietą su Vilniaus ID (kuris yra 1, nes tai pirmas įrašas)
INSERT INTO places (name, type, description, image_url, address, rating, is_free, city_id)
VALUES (
    'Gedimino pilies bokštas', 
    'pilis', 
    'Lietuvos didžiojo kunigaikščio Gedimino statytos pilies liekanos Vilniuje.', 
    'https://example.com/gediminas.jpg', 
    'Arsenalo g. 5, Vilnius', 
    4.8, 
    false, 
    1
);