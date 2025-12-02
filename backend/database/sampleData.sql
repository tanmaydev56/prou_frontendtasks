-- Sample employees
INSERT INTO employees (name, email, designation) VALUES
('Tanmay Sharma', 'tanmay@example.com', 'Frontend Developer'),
('Alice Roy', 'alice@example.com', 'Backend Developer'),
('Rahul Verma', 'rahul@example.com', 'Project Manager');

-- Sample tasks
INSERT INTO tasks (title, description, status, employee_id) VALUES
('Build Dashboard UI', 'Implement dashboard cards and charts', 'DONE', 1),
('Setup Backend APIs', 'Create REST endpoints for tasks and employees', 'IN_PROGRESS', 2),
('Write Documentation', 'Prepare README and API docs', 'TODO', 3);
