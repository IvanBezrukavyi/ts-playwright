# These are my first baby steps in Type Script and Playwright

My learning page is based on this [course](https://softserve.udemy.com/course/playwright-tutorials-automation-testing) from Udemy and my own scenarios I developed and put into `test-demoqa` directory

**Table of Contents**

### 1. How to work with CSS selectors

1. If **ID** is present (css -> tagname#id (or) #id). For example, #username
2. If **CLASS** attribute is present (css -> tagname.class (or) .class. For example, .card-body a
3. Write css based on any attribute(css ->\[attribute='value']). For example, \[name='signin']
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
10. YAML Language Support
11. SonarLint

### 3. Playwright CLI commands

1. npx playwright test --headed (running all tests with browser interaction)
2. npx playwright test testcasename.spec.ts (running specific tests)
3. npx playwright test \[pathToCase] --headed --debug (running tests in browser with debug mode)
4. npx playwright test --ui (running tests in UI mode. It's highly recommended!!!)
5. npx playwright show-report (review test execution report)
6. npx playwright codegen \[website.com] (open the website and generate steps base on user actions)
7. npx playwright codegen \[website.com] --save-storage=auth.json (open the website and generate steps base on user actions to save cookies and localStorage at the end of the session. This is useful to separately record an authentication step and reuse it later when recording more tests)
8. npx playwright install && npm install -D @playwright/test@latest (It installs the latest playwright version with -D node module dependencies)
9. npx playwright test --repeat-each \[amount] (--repeat-each flag can help for detecting a flaky test)
10. npx playwright test --grep @tag (running tests by specific tag, e.g. smoke, regression, etc.)

### 4. Allure Reporting

1. Install Java for Allure report's opening \[here] (<https://www.oracle.com/de/java/technologies/downloads/>)
2. Install Allure-Playwright: npm i -D @playwright/test allure-playwright. General installation process and usage you can find [here](https://www.npmjs.com/package/allure-playwright?activeTab=readme)
3. installation allure command line to generate allure report from allure result: npm install -g allure-commandline --save-dev. More details you can find [here](https://www.npmjs.com/package/allure-commandline)
4. Running test with Allure reporting: npx playwright test --grep @tag --reporter=line,allure-playwright
5. Generate Allure report: allure generate allure-results -o allure-report --clean
6. allure open allure-report
