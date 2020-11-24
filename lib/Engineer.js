// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee")
// ??TODO: Write code to define and export the Manager class.?? HINT: This class should inherit from Employee.
// ??TODO: Write code to define and export the Employee class???
class Engineer extends Employee {
    constructor(name, id, email, gitHub) {
      super(name, id, email);
      this.github = github;
    };
    getRole(){
        return "Engineer";
    }
    getGithub(){
        return this.github;
    };
  
  };
  module.exports = Engineer;
  