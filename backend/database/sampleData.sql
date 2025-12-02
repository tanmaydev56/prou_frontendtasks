INSERT INTO employees (name, email, designation) VALUES
('Tanmay Sharma', 'tanmay@example.com', 'Full Stack Developer'),
('Aditi Verma', 'aditi@example.com', 'UI/UX Designer'),
('Rahul Mehra', 'rahul@example.com', 'Software Engineer'),
('Sneha Kapoor', 'sneha@example.com', 'Project Manager');

INSERT INTO tasks (title, description, employee_id, status, due_date) VALUES
('Build Dashboard', 'Create analytics dashboard using Chart.js', 1, 'DONE', '2025-02-10'),
('Fix Login Bug', 'Resolve password mismatch bug', 3, 'IN_PROGRESS', '2025-02-12'),
('UI Redesign', 'Redesign landing page', 2, 'TODO', '2025-02-15'),
('Client Meeting', 'Project review meeting with client', 4, 'IN_PROGRESS', '2025-02-13'),
('Optimize Backend', 'Improve response time of APIs', 1, 'TODO', '2025-02-11'),
('Add Kanban View', 'Add drag-and-drop kanban board', 3, 'DONE', '2025-02-08'),
('Testing Module', 'Write unit tests for controllers', 2, 'TODO', '2025-02-14');
