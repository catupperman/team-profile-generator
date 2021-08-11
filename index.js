const inquirer = require('inquirer');
const path = require("path");
const jest = require("jest");
const fs = require("fs");
const employee = require("./lib/Employee.js");
const engineer = require("./lib/Engineer.js");
const intern = require("./lib/Intern.js");
const manager = require("./lib/Manager.js");
const generate = require('./lib/htmlGenerate');
let team = [];

const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputDirection = path.join(OUTPUT_DIR, 'employee.html');

function managerPrompt() {
    inquirer.prompt({
        type: "input",
        message: "What is the Manager's Office Number?",
        name: "officeNumber"
    }).then((answers) => {
        anotherUser(answers);
    })
}

function engineerPrompt() {
    inquirer.prompt({
        type: "input",
        message: "What is the Engineer's GitHub Account Name?",
        name: "gitHub"
    }).then((answers) => {
        anotherUser(answers);
    })
}

function internPrompt() {
    inquirer.prompt({
        type: "input",
        message: "What school did/does the intern attend?",
        name: "school"
    }).then((answers) => {
        anotherUser(answers);
    })

}

function anotherUser() {
    inquirer.prompt({
        type: "list",
        message: "Would you like to add another employee?",
        name: "anotherEmployee",
        choices: ["yes", "no"]
    }
    ).then(answers => {
        if (answers.anotherEmployee === "yes"){
            mainMenu();
        } else{
            generateHTML();
        }
    })
}


function mainMenu() {
    inquirer.prompt([
        {
            type: "list",
            name: "direction",
            message: "What type of employee would you like to add?",
            choices: ["manager", "engineer", "intern"],
        },
        {
            type: "input",
            message: "Name of employee?",
            name: "name"
        },
        {
            type: "input",
            message: "ID Number?",
            name: "idnumber"
        },
        {
            type: "input",
            message: "Employee's Email?",
            name: "email"
        },
    ]).then(answers => {
        switch (answers.direction) {
            case "manager":
                managerPrompt();
                break;
            case "engineer":
                engineerPrompt();
                break;
            case "intern":
                internPrompt();
                break;
            default:
                break;
        }
    })
}

mainMenu();

function generateHTML(){
    fs.writeFile(outputDirection, generate(team), (err)=>{
        err ? console.log(err): console.log('You made it');
    })
}
//generate an HTML page pulling a function from each js in the library
//another function to see if there is any more employees needed to be added