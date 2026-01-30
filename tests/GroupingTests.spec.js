import {test, expect} from "@playwright/test";

test.beforeAll(async({browser})=>{
    console.log("Inside beforeAll");
});

test.afterAll(async()=>{
    console.log("Inside afterALL");
});

test.beforeEach(async()=>{
    console.log("Inside beforeEach");
});

test.afterEach(async()=>{
    console.log("Inside afterEach");
})

test.describe("Group A", ()=>{
    test("Test 1", async({page})=>{
        console.log("Inside Test1");
    });
    test("Test 2", async({page})=>{
        console.log("Inside Test2");
    });
});

test.describe("Group B", ()=>{
    test("Test 3", async({page})=>{
        console.log("Inside Test3");
    });
    test("Test 4", async({page})=>{
        console.log("Inside Test4");
    });
});