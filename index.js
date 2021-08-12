const inquirer = require('inquirer');
const path = require("path");
const fs = require("fs");
const Intern = require("./lib/Intern.js");
const Manager = require('./lib/Manager.js');
const Engineer = require('./lib/Engineer.js');
let team = [];

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
        const teamManager = new Manager(name, id, email, officeNumber)
        team.push(generateManagerHTML(teamManager))
        //add next employees adds the next card to the list of employee cards in the team array
        anotherUser(answers);
    })
}
//function for each employee to generate HTML
function generateManagerHTML(teamManager){
    let generateManager=`
    <div class="col">
        ${teamManager}
            </div>
    `
    return generateManager
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
        const teamEngineer = new Engineer(name, id, email, gitHub)
        team.push(generateEngineerHTML(teamEngineer))
        anotherUser(answers);
    })
}

function generateEngineerHTML(teamEngineer){
    let generateEngineer=`
    <div class="col">
        ${teamEngineer}
            </div>
    `
    return generateEngineer
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
        const teamIntern = new Intern(name, id, email, school)
        team.push(generateInternHTML(teamIntern))
        anotherUser(answers);
    })

}

function generateInternHTML(teamIntern){
    let generateIntern=`
    <div class="col">
        ${teamIntern}
            </div>
    `
    return generateIntern
}

function anotherUser() {
    inquirer.prompt({
        type: "list",
        message: "Would you like to add another employee?",
        name: "anotherEmployee",
        choices: ["yes", "no"]
    }
    ).then(answers => {
        if (answers.anotherEmployee === "yes") {
            mainMenu();
        } else {
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

function generateHTML() {
    const htmlArr = []
    const htmlTop = `
    <!DOCTYPE html>
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
    <div class="container team-members">
    <div class="row">

    ${callEmployees(team)}

    `
    htmlArr.push(htmlTop)
    function callEmployees(team){
        for(i=0; i > team.length; i++){
            return team[i]
        }
    }

    const htmlBottom = `
    </div>
    </div>
    </body>
    </html>
    `
    htmlArr.push(htmlBottom);

    fs.writeFile('team.html', htmlArr.join(""), function (err) {
        console.error(err);
    })
}

mainMenu();

//generate an HTML page pulling a function from each js in the library
//another function to see if there is any more employees needed to be added