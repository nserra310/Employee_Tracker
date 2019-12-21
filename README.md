# Employee Tracker

Developers are often tasked with creating interfaces that make it easy for non-developers to view and interact with information stored in databases. Often these interfaces are known as **C**ontent **M**anagement **S**ystems. In this assignment the challenge was to architect and build a solution for managing a company's employees using node, inquirer, and MySQL.

## Instructions

- Run the app using node app.js

- User is prompted if they want to "VIEW, ADD, UPDATE, or EXIT"

- if user chooses VIEW they are able to scroll throught the different options which are DEPARTMENT, ROLE, EMPLOYEE, or EXIT.

- depending on which they choose it will be viewed in the node as a console.log

- if they want to to ADD an department, they will be prompted what they would like to name that department, and it will be added to the departments list.

- if they want to ADD a ROLE it will prompt them with what the title, salary, department, id number, and manager id number are. Once all info is added it will add the role.

- if they want to ADD and EMPLOYEE it will prompt them for the new employee's first and last name, role ID, and manager ID. Once all info is filled out it will add it to the employees table in the DB.

- if they would like UPDATE it will ask which employee they would like to update and will present them with a list of which role you would like to update their employee role to Engineer, Salesperson, Lawyer, or Accountant. Once the user choses a role it will update the employee to that role.
