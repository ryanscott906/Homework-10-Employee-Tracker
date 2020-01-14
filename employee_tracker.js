var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "esabatad5",
  database: "company_DB"
});
connection.connect(function(err) {
  if (err) throw err;
  start();
});

//Initial set of options
function start() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Employees By Department",
        "View All Employees By Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View All Employees":
        allEmployees();
        break;

      case "View All Employees By Department":
        allEmployeesDepartment();
        break;

      case "View All Employees By Manager":
        allEmployeesManager();
        break;

      case "Add Employee":
        addEmployee();
        break;

      case "Remove Employee":
        removeEmployee();
        break;

      case "Update Employee Role":
        updateRole();
        break;

      case "Update Employee Manager":
        updateManager();
        break;

      case "exit":
        connection.end();
        break;
      }
    });
}

function allEmployees() {
  connection.query("SELECT * FROM employees", function(err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}
        
function allEmployeesDepartment() {
  connection.query("SELECT * FROM employees ORDER BY department_id ASC", function(err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}
   
function allEmployeesManager() {
  connection.query("SELECT * FROM employees ORDER BY manager_id ASC", function(err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        name: "first",
        type: "input",
        message: "What is their first name?"
      },
      {
        name: "last",
        type: "input",
        message: "What is their last name?"
      },
      {
        name: "role",
        type: "input",
        message: "What is their role?"
      }
    ])
    .then(function(answer) {
      connection.query(
        "INSERT INTO employees SET ?",
        {
          first_name: answer.first,
          last_name: answer.last,
          role_id: answer.role 
        },
        function(err) {
          if (err) throw err;
          console.log("New employee successfully added!");
          start();
        }
      );
    });
}

function removeEmployee() {
  inquirer
    .prompt({
      name: "employee",
      type: "list",
      message: "Which employee do you want to remove?",
      choices: [
        "Employee1",
        "Employee2",
        "Employee3",
        "",
        "",
        "",
        ""
      ]
    })
  .then(function(answer) {
    connection.query(
    "DELETE FROM employees WHERE ?",
    {
      name: answer.employee
    },
    function(err, res) {
      if (err) throw err;
      console.log("Employee deleted!");
    }
  );
}
}

function updateRole() {
  inquirer
    .prompt({
      name: "employee",
      type: "list",
      message: "Whose role do you want to update?",
      choices: [
        "Employee1",
        "Employee2",
        "Employee3",
        "",
        "",
        "",
        ""
      ]
    })
    .then(function(answer) {
      connection.query("UPDATE roles SET ? WHERE ?",
       { role: answer. }, function(err, res) {
        if (err) throw err;
        console.log("Role has been updated!"
        start();

      });
    });
}

function updateManager() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "Whose manager do you want to update?",
      choices: [
        "",
        "",
        "",
        "",
        "",
        "",
        ""
      ]
    })
    .then(function(answer) {
      connection.query(
      "UPDATE employees SET ? ",
            [
              {
                manager_id: answer.name
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("Manager has been updated!");
              start();
}
