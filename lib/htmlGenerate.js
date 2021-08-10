const path = require("path");
const fs = require("fs");

const template = path.resolve(__dirname, "../generators");

const generate = function employees () {
    const htmlGenerated = [];

    htmlGenerated.push(employees
        .filter(employee => employee.getRole() === "Manager")
        .map(manager => generateEngineer(engineer))
        )
}