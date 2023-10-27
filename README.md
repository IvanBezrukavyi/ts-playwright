# These are my first baby steps in js-playwright

I took this [course](https://softserve.udemy.com/course/playwright-tutorials-automation-testing) from Udemy

**Table of Contents**

### 1. How to work with CSS selectors

1. If **ID** is present (css -> tagname#id (or) #id). For example, #username
2. If **CLASS** attribute is present (css -> tagname.class (or) .class. For example, .card-body a
3. Write css based on any attribute(css ->[attribute='value']). For example, [name='signin']
4. Write css selector with traversing from parent to child (css -> parentTagName >> childTagName).
5. If needs to write the locator based on text (css -> text='')

**NOTE:** Additional reference can be find [here](https://css.in.ua/css/selectors)

### 2. My VS Code extensions

1. Playwright Test for VSCode
2. Code Spell Checker
3. Better Comments
4. Git History
5. Github Actions
6. Markdownlint
7. Material Icon Theme
8. Mintlify Doc Writer
9. Prettier - Code formatter

### 3. Playwright CLI commands

1. npx playwright test --headed (running all tests with browser interaction)
2. npx playwright test testcasename.spec.ts (running specific tests)
3. npx playwright test [pathToCase] --headed --debug (running tests in browser with debug mode)
4. npx playwright test --ui (running tests in UI mode. It's highly recommended!!!)
5. npx playwright show-report (review test execution report)
6. npx playwright codegen [website.com] (open the website and generate steps base on user actions)
7. npx playwright codegen [website.com] --save-storage=auth.json (open the website and generate steps base on user actions to save cookies and localStorage at the end of the session. This is useful to separately record an authentication step and reuse it later when recording more tests)
