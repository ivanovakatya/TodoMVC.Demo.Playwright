# TodoMVC.Demo.Playwright

# Playwright test project that test simple TodoMVC application.

## Project Setup

## 📩 Pre-requisites

Ensure you have the following installed on your system
[Node JS] (https://nodejs.org/en/download)
[Git] (https://git-scm.com/downloads)

## 💻 To Install and run the project locally

```bash
npm ci
```

1. Install project dependencies with:

```bash
npx playwright install
```

2. Install Browsers

```bash
$ npx playwright install --with-deps
```

3. Run Tests - In Headless mode

```bash
npm run test
```

4. Run Tests - In Headed mode (configured to run only on chrominum)

```bash
npm run headed
```

5. To see the html report

```bash
npm run report
```

## 🏃‍♀️ Run project via Github Actions

[In the Github respository --> Actions](https://github.com/ivanovakatya/TodoMVC.Demo.Playwright/actions/workflows/playwright.yml)

- Click on `Run workflow`
- Click on the button `Run workflow again`
  <br />
  After the workflow is completed, Report is uploaded to it. This can be downloaded and viewed (index.html)
