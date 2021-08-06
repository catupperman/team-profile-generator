const inquirer = require("inquirer");
const path = require("path");
const jest = require("jest");
const fs = require("fs");
const employee = require("./lib/Employee.js");
const engineer = require("./lib/Engineer.js");
const intern = require("./lib/Intern.js");
const manager = require("./lib/Manager.js");
let team = [];

function mainMenu(){
inquirer.prompt(
    {
        type: "list",
        name: "direction",
        message: "What type of employee would you like to add?",
        choices: ["manager", "engineer", "intern"]
    }
).then(answers => {
    switch (answers.direction) {
        case "manager":
            //call the function for manager

            break;
        case "engineer":
            //call the function for engineer

            break;
        case "intern":
            //call the function for intern

            break;

        default:
            break;
    }
})}
//Swith or if function to determine what position role is being described with a return inquirer prompt using a choices list (catch at the end for any user errors)

//generate an HTML page pulling a function from each js in the library 
//another function to see if there is any more employees needed to be added