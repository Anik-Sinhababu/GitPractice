import {test, expect} from "@playwright/test";

test("test1@Sanity", async({page})=>{
    console.log("We are in Sanity testno 1");
});

test("test2@Sanity", async({page})=>{
    console.log("We are in Sanity testno 2");
});

test("test3@Sanity", async({page})=>{
    console.log("We are in Sanity testno 3");
});

test("test1@Reg", async({page})=>{
    console.log("We are in Reg testno 1");
});

test("test2@Reg", async({page})=>{
    console.log("We are in Reg testno 2");
});

test("test3@Reg@Sanity", async({page})=>{
    console.log("We are in Reg and sanity testno 2");
});


// QUICK COMMANDS FOR TERMINAL TO RUN TESTS RELATED TO TAGS 


//  RUN TESTS THAT INCLUDE @SANITY OR @REG TAG
// npx playwright test tests/TagPlaywrightTests.spec.js --project=chromium --grep "@Sanity|@Reg" --headed

//  RUN TESTS WITH THE TAG @SANITY
// npx playwright test tests/TagPlaywrightTests.spec.js --project=chromium --grep "@Sanity" --headed       

// RUN TESTS WITH THE TAG @REG
//npx playwright test tests/TagPlaywrightTests.spec.js --project=chromium --grep "@Reg" --headed 

// RUN TEST WHICH DOSENT HAVE TAG AS @REG
// npx playwright test tests/TagPlaywrightTests.spec.js --project=chromium --grep-invert "@Sanity" --headed       


// RUN TESTS WHICH HAVE BOTH THE TAGS @REG AND @SANITY
// npx playwright test tests/TagPlaywrightTests.spec.js --project=chromium --grep "@Reg@Sanity" --headed