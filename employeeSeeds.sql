DROP DATABASE IF EXISTS company_DB;
CREATE DATABASE company_DB;
USE company_DB;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NULL,
  manager_id INT null,
  FOREIGN KEY (role_id) REFERENCES roles(id),
  FOREIGN KEY (manager_id) REFERENCES employees(id),
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL(10,2) NULL,
  department_id INT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES departments(id)
);

INSERT INTO departments (name)
VALUES ("sales"); /* ID 1 */
INSERT INTO departments (name)
VALUES ("engineering"); /* ID 2 */
INSERT INTO departments (name)
VALUES ("finance"); /* ID 3 */
INSERT INTO departments (name)
VALUES ("legal"); /* ID 4*/

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, 1), ("Mike", "Chan", 2, 2), ("Ashley", "Rodriguez", 3, 3), ("Kevin", "Tupic", 4, null), ("Malia", "Brown", 5, null),
("Sarah", "Lourd", 6, 4), ("Tom", "Allen", 7, null), ("Christian", "Eckenrode", 3, null);

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1),/* ID 1 */ ("Salesperson", 80000, 1),/* ID 2 */ ("Lead Engineer", 150000, 2),/* ID 3 */ ("Software Engineer", 120000, 2),/* ID 4 */ 
("Accountant", 125000, 3),/* ID 5 */ ("Legal Team Lead", 250000, 4),/* ID 6 */ ("Lawyer", 190000, 4)/* ID 7 */;
