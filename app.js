const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { createStream } = require("sax");
const MakeTime = require("es-abstract/5/MakeTime");
const { __makeTemplateObject } = require("tslib");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const employees = [];
const idArray = [];

function teamMenu() {
  function createManager() {
    console.log("Let's build your team.");
    inquirer
      .prompt([
        {
          type: "input",
          name: "managerName",
          message: "What is your manager's name?",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "Please enter information";
          },
        },
        {
          type: "input",
          name: "managerId",
          message: "What is your manager's id?",
          validate: (answer) => {
            const pass = answer.match(/^[0-9]\d*$/);
            if (pass) {
              return true;
            }
            return "Please enter a positive number greater than zero.";
          },
        },
        {
          type: "input",
          name: "managerEmail",
          message: "What is your manager's email?",
          validate: (answer) => {
            const pass = answer.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
            if (pass) {
              return true;
            }
            return "Please enter a valid email address.";
          },
        },
        {
          type: "input",
          name: "managerOfficeNumber",
          message: "What is your manager's office number?",
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              return true;
            }
            return "Please enter a valid phone number.";
          },
        },
      ])
      .then(answers => {
        const manager = new Manager(
          answers.managerName,
          answers.managerId,
          answers.managerEmail,
          answers.managerOfficeNumber
        );
        employees.push(manager);
        idArray.push(answers.managerId);
        createTeam();
      })
  }
  function createTeam() {
    inquirer.prompt([
      {
        type: "list",
        name: "memberChoice",
        message: "What is the role of your team member?",
        choice: [
          "Engineer",
          "Intern",
          "I do not want to add another team member.",
        ],
      },
    ]).then(choice => {
      switch(choice.memberChoice){
        case "Engineer": 
        addEngineer();
        break;
        case "Intern": 
        addIntern();
        break;
        default: 
        buildTeam();

      }
    })
    //addENG
    function createEngineer() {
      console.log("Please input Engineer employee's info");
      inquirer
        .prompt([
          {
            type: "input",
            name: "engineerName",
            message: "Enter Employee's name.",
            validate: (answer) => {
              if (answer !== "") {
                return true;
              }
              return "Please enter information";
            },
          },
          {
            type: "input",
            name: "engineerId",
            message: "Enter employee id.",
            validate: (answer) => {
              const pass = answer.match(/^[0-9]\d*$/);
              if (pass) {
                return true;
              }
              return "Please enter a positive number greater than zero.";
            },
          },
          {
            type: "input",
            name: "managerEmail",
            message: "Enter employee's email address",
            validate: (answer) => {
              const pass = answer.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
              if (pass) {
                return true;
              }
              return "Please enter a valid email address.";
            },
          },
          {
            type: "input",
            name: "managerOfficeNumber",
            message: "Please enter the Engineer's GitHub Username.?",
            validate: (answer) => {
              const pass = answer.match(/^[1-9]\d*$/);
              if (pass) {
                return true;
              }
              return "Please enter a valid phone number.";
            },
          },
        ])
        .then(answers => {
          const manager = new Manager(
            answers.managerName,
            answers.managerId,
            answers.managerEmail,
            answers.managerOfficeNumber
          );
          employees.push(manager);
          idArray.push(answers.managerId);
          createTeam();
        })
    }
    function createTeam() {
      inquirer.prompt([
        {
          type: "list",
          name: "memberChoice",
          message: "What is the role of your team member?",
          choice: [
            "Engineer",
            "Intern",
            "I do not want to add another team member.",
          ],
        },
      ]).then(choice => {
        switch(choice.memberChoice){
          case "Engineer": 
          addEngineer();
          break;
          case "Intern": 
          addIntern();
          break;
          default: 
          buildTeam();
  
        }
      })
  }
  createManager();
}
teamMenu();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
