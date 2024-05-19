-- Use the ferry_db database
USE ferry_db;


/*
CREATE TABLE departure_ports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    port_name VARCHAR(255) NOT NULL,
    allows_vehicles BOOLEAN NOT NULL
);

CREATE TABLE destination_ports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    port_name VARCHAR(255) NOT NULL,
    allows_vehicles BOOLEAN NOT NULL
);

CREATE TABLE ferry_routes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    departure_port_id INT,
    destination_port_id INT,
    FOREIGN KEY (departure_port_id) REFERENCES departure_ports(id),
    FOREIGN KEY (destination_port_id) REFERENCES destination_ports(id)
);
*/


INSERT INTO departure_ports (port_name, allows_vehicles) VALUES
('Tulcea', FALSE),
('Orsova', FALSE),
('Braila', TRUE),
('Galati', TRUE),
('Calarasi', TRUE),
('Constanta', TRUE);


INSERT INTO destination_ports (port_name, allows_vehicles) VALUES
('Sulina', FALSE),
('Ada Kaleh', FALSE),
('Smardan', TRUE),
('I.C. Bratianu', TRUE),
('Ostrov (Silistra)', TRUE),
('Poti (Georgia)', TRUE),
('Karasu (Turkey)', TRUE);

SET SQL_SAFE_UPDATES = 0;
DELETE FROM ferry_routes;
ALTER TABLE ferry_routes AUTO_INCREMENT = 1;
SET SQL_SAFE_UPDATES = 1;

INSERT INTO ferry_routes (departure_port_id, destination_port_id) VALUES
((SELECT id FROM departure_ports WHERE port_name = 'Tulcea' LIMIT 1), (SELECT id FROM destination_ports WHERE port_name = 'Sulina' LIMIT 1)),
((SELECT id FROM departure_ports WHERE port_name = 'Orsova' LIMIT 1), (SELECT id FROM destination_ports WHERE port_name = 'Ada Kaleh' LIMIT 1)),
((SELECT id FROM departure_ports WHERE port_name = 'Braila' LIMIT 1), (SELECT id FROM destination_ports WHERE port_name = 'Smardan' LIMIT 1)),
((SELECT id FROM departure_ports WHERE port_name = 'Galati' LIMIT 1), (SELECT id FROM destination_ports WHERE port_name = 'I.C. Bratianu' LIMIT 1)),
((SELECT id FROM departure_ports WHERE port_name = 'Calarasi' LIMIT 1), (SELECT id FROM destination_ports WHERE port_name = 'Ostrov (Silistra)' LIMIT 1)),
((SELECT id FROM departure_ports WHERE port_name = 'Constanta' LIMIT 1), (SELECT id FROM destination_ports WHERE port_name = 'Poti (Georgia)' LIMIT 1)),
((SELECT id FROM departure_ports WHERE port_name = 'Constanta' LIMIT 1), (SELECT id FROM destination_ports WHERE port_name = 'Karasu (Turkey)' LIMIT 1));


SELECT 
    fr.id,
    dp.port_name AS departure_port,
    dp.allows_vehicles AS departure_allows_vehicles,
    des.port_name AS destination_port,
    des.allows_vehicles AS destination_allows_vehicles
FROM 
    ferry_routes fr
JOIN 
    departure_ports dp ON fr.departure_port_id = dp.id
JOIN 
    destination_ports des ON fr.destination_port_id = des.id;
