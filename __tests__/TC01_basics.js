const { addAttach } = require('jest-html-reporters/helper'); //import ability to attach screenshot to HTML report
/* 
takes in two arguments:
    1. Name of the functionality we are going to test
    2. Function to hold all the tests related to your functionality

    describe creates a block that groups together several related tests (think of describe as a test suite)
*/
describe('Post', () => {
    beforeAll(async () => { // runs before all tests
        await page.goto('https://react-redux.realworld.io/#/login')
    }) // There is also beforeEach() that can be run before every test
    /* 
    to create a test within describe we use the test function 
        takes in two arguments:
            1. name of the test
            2. a function that contains the body of the test (it would need to have async await pattern to write playwright scripts)
    */
    test.jestPlaywrightSkip({ browsers: ['chromium']}, 'Sign In', async () => { // jestPlaywrightSkip is used to skip tests on certain browsers and devices

        // No need for launching browser, creating context or creating page since its taken care of by jest-playwright-preview package
        const title = await page.title()
        expect(title).toBe('Conduit')

        await page.fill('input[type = "email"]', 'qacamp.acad@gmail.com')
        await page.press('input[type = "email"]', 'Tab')
        await page.type('input[type = "password"]', 'test12345')
        // await jestPlaywright.debug() // pauses test execution and gives you an opportunity to see whats going on in the browser

        await Promise.all([
            page.waitForNavigation(), // will resolve when the page navigates to the new url
            // await page.click('form >> "Sign in"')
            await page.click('fm >> "Sign in"') // purposely making it fail to take screenshot
        ])
    })
    afterEach(async () => {
        const data = await page.screenshot()
        /* 
        use the addAttach method to attach screenshot to the html report. it takes 2 parameters: 
            1.The screenshot 
            2.The description
        */
       await addAttach(data) 
    })
    afterAll(async () => {
        await browser.close()
    }) // There is also afterEach() that can be run after every test
}) 