const inquirer = require('inquirer');
const path = require("path");
//const jest = require("jest");
const fs = require("fs");
const employee = require("./lib/Employee.js");
const Intern = require("./lib/Intern.js");
const render = require('./lib/htmlGenerate');
const Manager = require('./lib/Manager.js');
const Engineer = require('./lib/Engineer.js');
let team = [];

//const OUTPUT_DIR = path.resolve(__dirname, 'output');
//const outputDirection = path.join(OUTPUT_DIR, 'employee.html');

function managerPrompt() {
    inquirer.prompt({
        type: "input",
        message: "What is the Manager's Office Number?",
        name: "officeNumber"
    }).then((answers) => {
        const name = answers.name
        const id = answers.idnumber
        const email = answers.email
        const officeNumber = answers.officeNumber
        const teamMember = new Manager(name, id, email, officeNumber)
        team.push(teamMember)
        anotherUser(answers);
    })
}

function engineerPrompt() {
    inquirer.prompt({
        type: "input",
        message: "What is the Engineer's GitHub Account Name?",
        name: "gitHub"
    }).then((answers) => {
        const name = answers.name
        const id = answers.idnumber
        const email = answers.email
        const gitHub = answers.gitHub
        const teamMember = new Engineer(name, id, email, gitHub)
        team.push(teamMember)
        anotherUser(answers);
    })
}

function internPrompt() {
    inquirer.prompt({
        type: "input",
        message: "What school did/does the intern attend?",
        name: "school"
    }).then((answers) => {
        const name = answers.name
        const id = answers.idnumber
        const email = answers.email
        const school = answers.school
        const teamMember = new Intern(name, id, email, school)
        team.push(teamMember)
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

function generateHTML(){
    const htmlArr = []
    const employeeHTML = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
        <link rel="stylesheet" href="style.css">
        <title>Office Memebers</title>
    </head>
    <body>
        <div class="heading-container">
            <div class="row">
                <h1 class="display-1 text-center"> The Office </h1>
            </div>
        </div>
    </body>
    </html>
    `
    }


mainMenu();

//generate an HTML page pulling a function from each js in the library
//another function to see if there is any more employees needed to be added