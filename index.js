const inquirer = require('inquirer');
const path = require("path");
const fs = require("fs");
const Intern = require("./lib/Intern.js");
const Manager = require('./lib/Manager.js');
const Engineer = require('./lib/Engineer.js');
let team = [];

function managerPrompt(mainMenuData) {
    inquirer.prompt({
        type: "input",
        message: "What is the Manager's Office Number?",
        name: "officeNumber"
    }).then((answers) => {
        const name = mainMenuData.name
        const id = mainMenuData.idnumber
        const email = mainMenuData.email
        const officeNumber = answers.officeNumber
        const teamManager = new Manager(name, id, email, officeNumber)
        team.push(generateManagerHTML(teamManager))
        anotherUser(answers);
    })
}

function generateManagerHTML(teamManager) {
    let generateManager = `
    <div class="col">
    <img src="./images/michaelscott.jpg">
    <h2> Office Manager </h2>
    <ul>
        <li>
        <h3>  
        ${teamManager.name}
        </h3>
        </li>
        <li>
        <h4> Id Number 
        ${teamManager.id}
        </h4>
        </li>
        <li>
        <h4> Email
        ${teamManager.email}
        </h4>
        </li>
        <li>
        <h4> Office Number 
        ${teamManager.officeNumber}
        </h4>
        </li>
        </ul>
            </div>
    `
    return generateManager
}

function engineerPrompt(mainMenuData) {
    inquirer.prompt({
        type: "input",
        message: "What is the Engineer's GitHub Account Name?",
        name: "gitHub"
    }).then((answers) => {
        const name = mainMenuData.name
        const id = mainMenuData.idnumber
        const email = mainMenuData.email
        const gitHub = answers.gitHub
        const teamEngineer = new Engineer(name, id, email, gitHub)
        team.push(generateEngineerHTML(teamEngineer))
        anotherUser(answers);
    })
}

function generateEngineerHTML(teamEngineer) {
    let generateEngineer = `
    <div class="col">
    <img src="./images/dwight.jpg">
     <h2> Office Engineer (Assistant to the Refional Manager) </h2>
     <ul>
        <li>
        <h3> 
        ${teamEngineer.name}
        </h3>
        </li>
        <li>
        <h4> Id Number 
        ${teamEngineer.id}
        </h4>
        </li>
        <li>
        <h4> Email 
        ${teamEngineer.email}
        </h4>
        </li>
        <li>
        <h4> GitHub Account Name 
        ${teamEngineer.gitHub}
        </h4>
        </li>
        </ul>
            </div>
    `
    return generateEngineer
}

function internPrompt(mainMenuData) {
    inquirer.prompt({
        type: "input",
        message: "What school did/does the intern attend?",
        name: "school"
    }).then((answers) => {
        const name = mainMenuData.name
        const id = mainMenuData.idnumber
        const email = mainMenuData.email
        const school = answers.school
        const teamIntern = new Intern(name, id, email, school)
        team.push(generateInternHTML(teamIntern))
        anotherUser(answers);
    })

}

function generateInternHTML(teamIntern) {
    let generateIntern = `
    <div class="col">
    <img src="./images/ryanintern.jpg">
    <h2> Intern </h2>
    <ul>
        <li> 
        <h3> 
        ${teamIntern.name}
        </h3>
        </li>
        <li> 
        <h4> Id Number 
        ${teamIntern.id}
        </h4>
        </li>
        <li>
        <h4> Email 
        ${teamIntern.email}
        </h4>
        </li>
        <li> 
        <h4> School 
        ${teamIntern.school}
        </h4>
        </li>
        </ul>
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
            console.log(team)
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
        console.log("mainMenu")
        console.log(answers)
        switch (answers.direction) {
            case "manager":
                managerPrompt(answers);
                break;
            case "engineer":
                engineerPrompt(answers);
                break;
            case "intern":
                internPrompt(answers);
                break;
            default:
                break;
        }
    })
}

function generateHTML() {
    const finishedTeam = team.join("")
    const html = `
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
<img src="./images/dundermifflinbanner.png">
    <div class="heading-container">
        <div class="row">
            <h1 class="display-1 text-center"> The Office </h1>
        </div>
    </div>
    <div class="container team-members">
    <div class="row">

    ${finishedTeam}

    </div>
    </div>
    </body>
    </html>
    `
    
    fs.writeFile('team.html', html, function (err) {
       err ? console.error(err) : console.log('success');
    })
}

mainMenu();