
-- TravelExplore Database
-- Milestone 2: Database Creation
-- MySQL / XAMPP

CREATE DATABASE IF NOT EXISTS travel_explore
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE travel_explore;

-- 1. USERS
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. DESTINATIONS
CREATE TABLE destinations (
    destination_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    country VARCHAR(100) NOT NULL,
    category VARCHAR(100),
    description TEXT,
    estimated_budget DECIMAL(10,2)
);

-- 3. GUIDES
CREATE TABLE guides (
    guide_id INT AUTO_INCREMENT PRIMARY KEY,
    author_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_guides_author
        FOREIGN KEY (author_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);

-- 4. FAVORITES
CREATE TABLE favorites (
    favorite_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    destination_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_favorites_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_favorites_destination
        FOREIGN KEY (destination_id)
        REFERENCES destinations(destination_id)
        ON DELETE CASCADE,

    CONSTRAINT unique_user_destination
        UNIQUE (user_id, destination_id)
);

-- 5. REVIEWS
CREATE TABLE reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    destination_id INT NOT NULL,
    rating INT NOT NULL,
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_reviews_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_reviews_destination
        FOREIGN KEY (destination_id)
        REFERENCES destinations(destination_id)
        ON DELETE CASCADE,

    CONSTRAINT check_review_rating
        CHECK (rating BETWEEN 1 AND 5)
);

-- 6. BOOKINGS
CREATE TABLE bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    destination_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'pending',

    CONSTRAINT fk_bookings_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_bookings_destination
        FOREIGN KEY (destination_id)
        REFERENCES destinations(destination_id)
        ON DELETE CASCADE
);

-- SAMPLE DATA

-- Sample users
-- These example hashes correspond to the password "password".
INSERT INTO users (full_name, email, password_hash) VALUES
('John Smith', 'john@example.com',
 '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi'),
('Anna Brown', 'anna@example.com',
 '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi'),
('Mark Wilson', 'mark@example.com',
 '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi');

-- Sample destinations
INSERT INTO destinations
(name, country, category, description, estimated_budget)
VALUES
('Sarajevo', 'Bosnia and Herzegovina', 'City',
 'Explore the historic streets, culture and food of Sarajevo.',
 250.00),

('Bled', 'Slovenia', 'Nature',
 'Visit Lake Bled and enjoy its beautiful mountain scenery.',
 400.00),

('Paris', 'France', 'City',
 'Discover the Eiffel Tower, museums and famous attractions.',
 800.00),

('Rome', 'Italy', 'Historical',
 'Explore ancient Roman architecture and historical landmarks.',
 650.00),

('Barcelona', 'Spain', 'Beach',
 'Enjoy beautiful beaches, architecture and Spanish culture.',
 700.00);

-- Sample guides
INSERT INTO guides (author_id, title, content) VALUES
(1, 'A Weekend in Sarajevo',
 'Explore Baščaršija, visit the Latin Bridge and try traditional Bosnian food.'),

(2, 'Exploring Lake Bled',
 'Visit Bled Castle, take a boat to the island and enjoy the lake views.');

-- Sample favorites
INSERT INTO favorites (user_id, destination_id) VALUES
(1, 1),
(1, 2),
(2, 3);

-- Sample reviews
INSERT INTO reviews (user_id, destination_id, rating, comment) VALUES
(1, 1, 5, 'Beautiful city with amazing history.'),
(2, 2, 5, 'Lake Bled is absolutely wonderful.'),
(3, 3, 4, 'A fantastic destination with many attractions.');

-- Sample bookings
INSERT INTO bookings
(user_id, destination_id, start_date, end_date, status)
VALUES
(1, 1, '2027-05-10', '2027-05-15', 'confirmed'),
(2, 2, '2027-06-01', '2027-06-05', 'pending'),
(3, 3, '2027-07-12', '2027-07-18', 'confirmed');