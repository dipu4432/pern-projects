-- Create the database named "APP"
CREATE DATABASE app;

-- Connect to the newly created database
\c app;

-- Create the table "APP" with the specified column fields
CREATE TABLE app (
    sno SERIAL PRIMARY KEY,
    customer_name VARCHAR(255),
    age INT,
    phone VARCHAR(20),
    location VARCHAR(255),
    created_at TIMESTAMP
);

-- Insert 50 dummy records into the "APP" table
INSERT INTO app (customer_name, age, phone, location, created_at) VALUES
('John Doe', 30, '123-456-7890', 'New York', NOW()),
('Jane Smith', 25, '987-654-3210', 'Los Angeles', NOW()),
('Alice Johnson', 40, '555-555-5555', 'Chicago', NOW()),
('Bob Brown', 35, '111-222-3333', 'Houston', NOW()),
('Emily Davis', 28, '444-444-4444', 'Philadelphia', NOW()),
('Michael Wilson', 45, '666-666-6666', 'Phoenix', NOW()),
('Samantha Martinez', 32, '777-777-7777', 'San Antonio', NOW()),
('David Anderson', 38, '888-888-8888', 'San Diego', NOW()),
('Jessica Taylor', 27, '999-999-9999', 'Dallas', NOW()),
('Christopher Thomas', 42, '000-000-0000', 'San Jose', NOW()),
('Ashley Garcia', 31, '222-333-4444', 'Austin', NOW()),
('Matthew Rodriguez', 36, '555-666-7777', 'Jacksonville', NOW()),
('Jennifer Hernandez', 29, '888-777-6666', 'Fort Worth', NOW()),
('Daniel Martinez', 43, '111-222-3333', 'Columbus', NOW()),
('Sarah Lopez', 26, '444-555-6666', 'Charlotte', NOW()),
('James Gonzalez', 33, '777-888-9999', 'San Francisco', NOW()),
('Olivia Perez', 39, '123-456-7890', 'Indianapolis', NOW()),
('William Turner', 24, '987-654-3210', 'Seattle', NOW()),
('Mary Moore', 41, '555-555-5555', 'Denver', NOW()),
('Joseph Taylor', 34, '111-222-3333', 'Washington', NOW()),
('Elizabeth Lee', 37, '444-444-4444', 'Boston', NOW()),
('Andrew Harris', 30, '666-666-6666', 'Nashville', NOW()),
('Megan Martin', 35, '777-777-7777', 'Baltimore', NOW()),
('Ryan Clark', 28, '888-888-8888', 'Louisville', NOW()),
('Lauren King', 42, '999-999-9999', 'Milwaukee', NOW()),
('John Collins', 31, '000-000-0000', 'Portland', NOW()),
('Amanda Hill', 27, '222-333-4444', 'Oklahoma City', NOW()),
('Justin Green', 43, '555-666-7777', 'Las Vegas', NOW()),
('Stephanie Adams', 32, '888-777-6666', 'Albuquerque', NOW()),
('Brandon Baker', 26, '111-222-3333', 'Tucson', NOW()),
('Rachel Nelson', 39, '444-555-6666', 'Fresno', NOW()),
('Kevin Evans', 33, '777-888-9999', 'Sacramento', NOW()),
('Michelle Rivera', 24, '123-456-7890', 'Long Beach', NOW()),
('Timothy Ward', 40, '987-654-3210', 'Kansas City', NOW()),
('Rebecca Coleman', 29, '555-555-5555', 'Mesa', NOW()),
('Nicholas Simmons', 34, '111-222-3333', 'Atlanta', NOW()),
('Christina Price', 31, '666-666-6666', 'Raleigh', NOW()),
('Erica Hughes', 28, '777-777-7777', 'Miami', NOW()),
('Kyle Flores', 42, '888-888-8888', 'Omaha', NOW()),
('Kelly Washington', 37, '999-999-9999', 'Tulsa', NOW()),
('Aaron Barnes', 25, '000-000-0000', 'Oakland', NOW()),
('Sara Foster', 38, '222-333-4444', 'Cleveland', NOW()),
('Gregory Coleman', 32, '555-666-7777', 'Minneapolis', NOW()),
('Heather Perry', 41, '888-777-6666', 'Anaheim', NOW()),
('Sean Butler', 30, '111-222-3333', 'Honolulu', NOW()),
('Tiffany Barnes', 35, '444-555-6666', 'Arlington', NOW()),
('Derek Bennett', 27, '777-888-9999', 'Wichita', NOW());
