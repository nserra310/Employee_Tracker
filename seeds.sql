USE employeesDB;

INSERT INTO department (title)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Engineer", 120000, 2), ("Salesperson", 80000, 1), ("Lawyer", 190000, 4), ("Accountant", 125000, 3);

INSERT INTO employee (first_name, second_name, role_id, manager_id)
VALUES ("Steve", "Perry", 1, 2), ("Jack", "Torrence", 2, 3), ("Michael", "Jordan", 2, 1), ("Steve", "Jobs", 3, 2);