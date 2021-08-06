const { test, expect } = require("@jest/globals");
const Intern= require("../lib/Intern");

test("Is Internan Object?", () =>{
    const intern= new Intern();
    expect(typeof(intern)).toBe("object");
})