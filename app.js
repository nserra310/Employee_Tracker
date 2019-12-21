//-- variables to link the inquirer and mySQL database --//
const inquirer = require("inquirer");
var mysql = require("mysql");

//--create the connection information for the sql database--//
var connection = mysql.createConnection({
  host: "localhost",

  //--your port; if not 3306--//
  port: 3306,

  //--your username--//
  user: "root",

  //--your password--//
  password: "Noidea89",
  database: "employeesDB"
});

// connect to the mysql server and sql database--//
connection.connect(function(err) {
  if (err) throw err;
//--run the start function after the connection is made to prompt the user--//
//--console.log(`connected as id ${connection.threadId}`)--//
  start();
});
//--function that starts the app and begins the prompts in terminal--//
function start() {
  inquirer
    .prompt({
      name: "userOptions",
      type: "list",
      message: "Would you like to view, add, update, or exit?",
      choices: ["VIEW", "ADD", "UPDATE", "EXIT"]
    })
    .then(function(answer) {
      if (answer.userOptions === "VIEW") {
        viewInfo();
      } else if (answer.userOptions === "ADD") {
        addInfo();
      } else if (answer.userOptions === "UPDATE") {
        updateInfo();
      } else {
        connection.end();
      }
    });
}
//--function that asks user what type of info would like to add to the database--//
function addInfo() {
  inquirer
      .prompt({
          name: "addDepartmentRoleOrEmployee",
          type: "list",
          message: "Would you like to ADD a Department, Role, or Employee?",
          choices: ["DEPARTMENT", "ROLE", "EMPLOYEE", "EXIT"]
      })
      .then(function (answer) {

          if (answer.addDepartmentRoleOrEmployee === "DEPARTMENT") {
              addDepartment();
          }
          else if (answer.addDepartmentRoleOrEmployee === "ROLE") {
              addRole();
          }
          else if (answer.addDepartmentRoleOrEmployee === "EMPLOYEE") {
              addEmployee();
          } else {
              start();
          }
      });
}

// Prompt user for what type of department to add

function addDepartment() {
  inquirer
      .prompt({
          name: "addDepartment",
          type: "input",
          message: "What is the name of the department you would like to add?",
      })
      .then(function (answer) {
          // when finished prompting, insert a new item into the db with that info
          connection.query(
              "INSERT INTO department SET ?",
              {
                  title: answer.addDepartment
              },
              function (err) {
                  if (err) throw err;
                  start();
              }
          );
      });
};

// Prompt user for what type of role to add

function addRole() {
  connection.query("SELECT * FROM department", function (err, results) {
      if (err) throw err;
      inquirer
          .prompt([
              {
                  name: "roleTitle",
                  type: "input",
                  message: "What is the title of the role you would like to add?"
              },
              {
                  name: "roleSalary",
                  type: "number",
                  message: "What is the salary for this role?"
              },
              {
                  name: "choice",
                  type: "rawlist",
                  choices: function () {
                      var choiceArray = [];
                      for (var i = 0; i < results.length; i++) {
                          choiceArray.push(results[i].title);
                      }
                      return choiceArray;
                  },
                  message: "What is the department for this role?"
              },
          ])
          .then(function (answer) {
              var chosenItem;
              for (var i = 0; i < results.length; i++) {
                  if (results[i].title === answer.choice) {
                      chosenItem = results[i];
                  }
              }
              // when finished prompting, insert a new item into the db with that info
              connection.query(
                  "INSERT INTO role SET ?",
                  {
                      title: answer.roleTitle,
                      salary: answer.roleSalary,
                      department_id: chosenItem.id
                  },
                  function (err) {
                      if (err) throw err;
                      start();
                  }
              );
          });
  })
};

// Prompt user to add an employee

function addEmployee() {
  connection.query("SELECT * FROM role", function (err, results) {
      if (err) throw err;
      inquirer
          .prompt([
              {
                  name: "firstName",
                  type: "input",
                  message: "What is the employee's first name?"
              },
              {
                  name: "lastName",
                  type: "input",
                  message: "What is the employee's last name?"
              },
              {
                  name: "choice",
                  type: "rawlist",
                  choices: function () {
                      var choiceArray = [];
                      for (var i = 0; i < results.length; i++) {
                          choiceArray.push(results[i].title);
                      }
                      return choiceArray;
                  },
                  message: "What is the employee's role ID?"
              },
              {
                  name: "managerID",
                  type: "number",
                  message: "What is the employee's manager ID?",
              }
          ])
          .then(function (answer) {
              var chosenItem;
              for (var i = 0; i < results.length; i++) {
                  if (results[i].title === answer.choice) {
                      chosenItem = results[i];
                  }
              }
              // when finished prompting, insert a new item into the db with that info
              connection.query(
                  "INSERT INTO employee SET ?",
                  {
                      first_name: answer.firstName,
                      second_name: answer.lastName,
                      role_id: chosenItem.id,
                      manager_id: answer.managerID
                  },
                  function (err) {
                      if (err) throw err;
                    start();
                  }
              );
          });
  })
};

//-- a function to view the employee's info from the database --//
function viewInfo() {
  inquirer
    .prompt({
      name: "viewDepartmentInfo",
      type: "list",
      message: "Would you like to view departments, roles, or employees?",
      choices: ["DEPARTMENTS", "ROLES", "EMPLOYEES", "EXIT"]
    })
    .then(function(answer) {
      if (answer.viewDepartmentInfo === "DEPARTMENTS") {
        viewDepartmentInfo();
      } else if (answer.viewDepartmentInfo === "ROLES") {
        viewRoleInfo();
      } else if (answer.viewDepartmentInfo === "EMPLOYEES") {
        viewEmployeeInfo();
      } else {
        start();
      }
    });
}
//-- a function to view the department info from the database --//
function viewDepartmentInfo() {
  connection.query("SELECT * FROM department", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log(" " + res[i].id + " - " + res[i].title);
    }
    start();
  });
}
function viewRoleInfo() {
  connection.query("SELECT * FROM role", function (err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
          console.log("role id: " + res[i].id+ " " + "Title " + res[i].title +" " + "Salary " + res[i].salary + " " + "Department ID " + res[i].department_id);
      }
      start();
  });
};
//--a function to view the current employees from the database --//
function viewEmployeeInfo() {
  connection.query("SELECT * FROM employee", function (err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
          console.log(res[i].id + " - " + res[i].first_name + " " + res[i].second_name + " -- Role ID: " + res[i].role_id + " " + " -- Manager ID: " + res[i].manager_id);
      }
      start();
  });
};
//-- a function to add a new employee to the department DB --//
function updateInfo() {
  connection.query("SELECT * FROM employee", function (err, results) {
      if (err) throw err;
      inquirer
          .prompt([
              {
                  name: "choice",
                  type: "rawlist",
                  choices: function () {
                      var choiceArray = [];
                      for (var i = 0; i < results.length; i++) {
                          choiceArray.push(results[i].first_name + " " + results[i].last_name);
                      }
                      return choiceArray;
                  },
                  message: "What employee would you like to update?"
              },
              {
                  name: "newRole",
                  type: "list",
                  message: "What would you like to update their role to? [1] Engineer [2] Salesperson [3] Lawyer [4] Accountant",
                  choices: [1, 2, 3, 4]
              }
          ])
          .then(function (answer) {
    
              var chosenItem;
              for (var i = 0; i < results.length; i++) {
                  if (results[i].first_name + " " + results[i].last_name === answer.choice) {
                      chosenItem = results[i];
                  }
              }
              connection.query(
                  "UPDATE employee SET ? WHERE ?",
                  [
                      {
                          role_id: answer.newRole
                      },
                      {
                          id: chosenItem.id
                      }
                  ],
                  function (error) {
                      if (error) throw err;
                      start();
                  })
          });
  });
};