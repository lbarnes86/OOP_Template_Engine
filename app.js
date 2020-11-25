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
            return "Please enter an id.";
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
      .then((answers) => {
        const manager = new Manager(
          answers.managerName,
          answers.managerId,
          answers.managerEmail,
          answers.managerOfficeNumber
        );
        employees.push(manager);
        idArray.push(answers.managerId);
        createTeam();
      });
  }
  function createTeam() {
    inquirer
      .prompt([
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
      ])
      .then((choice) => {
        switch (choice.memberChoice) {
          case "Engineer":
            addEngineer();
            break;
          case "Intern":
            addIntern();
            break;
          default:
            buildTeam();
        }
      });
    //addENG
    function createEngineer() {
      console.log("Please input employee's info");
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
              return "Please enter employees name";
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
              return "Please enter id.";
            },
          },
          {
            type: "input",
            name: "engineerEmail",
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
            name: "engineerGithub",
            message: "Please enter the Engineer's GitHub Username.",
            validate: (answer) => {
              if (answer !== "") {
                return true;
              }
              return "Please enter GitHub username";
            },
          },
        ])
        .then((answers) => {
          const engineer = new Engineer(
            answers.engineerName,
            answers.engineerId,
            answers.engineerEmail,
            answers.engineerGithub
          );
          employees.push(engineer);
          idArray.push(answers.engineerId);
          createTeam();
        });
    }
    function createTeam() {
      inquirer
        .prompt([
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
        ])
        .then((choice) => {
          switch (choice.memberChoice) {
            case "Engineer":
              addEngineer();
              break;
            case "Intern":
              addIntern();
              break;
            default:
              buildTeam();
          }
        });
      function createIntern() {
        console.log("Please input intern's info");
        inquirer
          .prompt([
            {
              type: "input",
              name: "internName",
              message: "Enter Intern's name.",
              validate: (answer) => {
                if (answer !== "") {
                  return true;
                }
                return "Please enter employees name";
              },
            },
            {
              type: "input",
              name: "internId",
              message: "Enter employee id.",
              validate: (answer) => {
                const pass = answer.match(/^[0-9]\d*$/);
                if (pass) {
                  return true;
                }
                return "Please enter id.";
              },
            },
            {
              type: "input",
              name: "internEmail",
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
              name: "internSchool",
              message: "Please enter Intern's School name.",
              validate: (answer) => {
                if (answer !== "") {
                  return true;
                }
                return "Please enter a school name";
              },
            },
          ])
          .then((answers) => {
            const intern = new Intern(
              answers.internName,
              answers.internId,
              answers.internEmail,
              answers.internSchool
            );
            employees.push(intern);
            idArray.push(answers.internId);
            createTeam();
          });
      }
      function createTeam() {
        inquirer
          .prompt([
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
          ])
          .then((choice) => {
            switch (choice.memberChoice) {
              case "Engineer":
                addEngineer();
                break;
              case "Intern":
                addIntern();
                break;
              default:
                buildTeam();
            }
            createManager();
          });
      }
    }
  }
 }
 teamMenu();
