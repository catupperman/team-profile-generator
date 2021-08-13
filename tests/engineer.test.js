const { test, expect } = require("@jest/globals");
const Engineer= require("../lib/Engineer");

test("Is Engineer an Object?", () =>{
    const engineer= new Engineer();
    expect(typeof(engineer)).toBe("object");
})