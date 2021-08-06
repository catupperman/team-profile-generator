const { test, expect } = require("@jest/globals");
const Employee = require("../lib/Employee");

test("Is Employee an Object?", () =>{
    const employee = new Employee();
    expect(typeof(employee)).toBe("object");
})

test("Can set Id?", () =>{
    const testId = 23;
    const employee = new Employee("FakeName", testId);
    expect(employee.id).toBe(testId);
})

test("Can get Id?", () =>{
    const testId = 23;
    const employee = new Employee("FakeName", testId);
    expect(employee.getID()).toBe(testId);
})