// Types Of Annotations
// Skip: Skip the test
// Only: Run only this test
// Fail: Mark the test as expected to fail
// Fixme: Mark the test as needing fixing
// Slow: Mark the test as slow

import {test, expect} from "@playwright/test";

test("This test will be skipped", async({page})=>{
    test.skip();
    console.log("This test is skipped");
});

// test.only("This test will be run only", async({page})=>{
//     console.log("This test is run only");
// });

test("This test is expected to fail", async({page})=>{
test.fail();
console.log("This test is expected to fail");
expect(1).toBe(2);
});

test("This test is marked as fixme", async({page})=>{
    test.fixme();
    console.log("This test is marked as fixme");
    expect(1).toBe(2);
});

test("This test is marked as slow", async({page})=>{
    test.slow();
    console.log("This test is marked as slow");
    await new Promise(resolve => setTimeout(resolve, 7000)); // Simulating a slow test with a 7-second delay
    expect(1).toBe(1);
});