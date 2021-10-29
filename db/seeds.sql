INSERT INTO department (name) 
VALUES 
    ('Engineering'),
    ('Sales'),
    ('Legal'),
    ('Finance');


INSERT INTO roles (title, salary, department_id)
VALUES 
    ('Senior Engineer', 240000, 1),
    ('Software Engineer', 120000, 1),
    ('Lead Engineer', 350000, 1),
    ('Salesperson', 80000, 2),
    ('Sales Lead', 125000, 2),
    ('Accountant', 114000, 4),
    ('Lawyer', 220000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ('Kevin', 'Hernandez', 3, NULL),
    ('John', 'Doe', 1, 1),
    ('Dory', 'Appleseed', 5, 1),
    ('Perry', 'McCannon', 2 , 1),
    ('Tom', 'Ferguson', 6, 5),
    ('Sarah', 'Hamilton', 2 , 1),
    ('Heather', 'West', 7, NULL),
    ('Sam', 'Washington', 4, 5),
    ('Stephen', 'McGuire', 7, NULL),
    ('Jesse', 'Stephens', 4, 5);
