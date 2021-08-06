const { test, expect } = require("@jest/globals");
const Manager= require("../lib/Manager");

test("Is Manageran Object?", () =>{
    const manager= new Manager();
    expect(typeof(manager)).toBe("object");
})