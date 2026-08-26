# Apex Trust Bank — Playwright Test Automation

Advanced Playwright + TypeScript project for [PlaywrightPad's Banking Sandbox](https://playwrightpad.com/sandbox/banking).

## Start here

```bash
npm install
npx playwright install
npm test
```

Useful commands: `npm run test:ui`, `npm run test:headed`, `npm run test:auth`, `npm run report`.

## Structure

```text
data/       Stable demo users and shared data
fixtures/   Reusable setup, including an authenticated page
pages/      Page Object Models: locators and actions only
tests/      Behaviour-focused specs grouped by product area
utils/      Small helpers and test-data builders
```

## Reliability and build order

- Configuration owns the URL, retries, trace, screenshot, video, and browser projects.
- Build: authentication/dashboard smoke → transfers/beneficiaries → loans/cards/support/settings.
- Prefer accessible locators; request `data-testid` where semantics are insufficient.
- Generate unique data for create/update/delete cases and clean it up safely.
- Add `@smoke`, `@regression`, and `@critical` tags as the suite grows. Add `storageState` only after login is covered.

## Supplied test-case inventory

| ID | Module | Scenario | Priority | Status |
| --- | --- | --- | --- | --- |
| BANK-AUTH-01 | Authentication | Valid login | P3 | ✅ Automated and passing |
| BANK-AUTH-02 | Authentication | Invalid password | P3 | ✅ Automated and passing |
| BANK-AUTH-03 | Authentication | Unregistered username | P3 | ✅ Automated and passing |
| BANK-AUTH-04 | Authentication | Password-reset OTP | P2 | ✅ Automated and passing |
| BANK-AUTH-05 | Authentication | Valid 2FA OTP login | P1 | ✅ Automated and passing|
| BANK-DASH-01 | Dashboard | Account balances | P3 | ✅ Automated and passing |
| BANK-DASH-02 | Dashboard | Recent transactions | P3 | ✅ Automated and passing |
| BANK-DASH-03 | Dashboard | Net-worth visibility | P3 | ✅ Automated and passing |
| BANK-TRSF-01 | Fund Transfer | Add beneficiary | P2 | ⬜ Not started |
| BANK-TRSF-02 | Fund Transfer | Duplicate beneficiary blocked | P2 | ⬜ Not started |
| BANK-TRSF-03 | Fund Transfer | Edit beneficiary | P2 | ⬜ Not started |
| BANK-TRSF-04 | Fund Transfer | Delete beneficiary | P3 | ⬜ Not started |
| BANK-TRSF-05 | Fund Transfer | Internal transfer | P2 | ⬜ Not started |
| BANK-TRSF-06 | Fund Transfer | Insufficient funds | P2 | ⬜ Not started |
| BANK-TRSF-07 | Fund Transfer | External wire with SMS OTP | P1 | ⬜ Not started |
| BANK-TRSF-08 | Fund Transfer | Negative amount | P3 | ⬜ Not started |
| BANK-TRSF-09 | Fund Transfer | Zero amount | P3 | ⬜ Not started |
| BANK-LOAN-01 | Loan Center | Personal loan EMI | P3 | ⬜ Not started |
| BANK-LOAN-02 | Loan Center | Home loan EMI | P3 | ⬜ Not started |
| BANK-LOAN-03 | Loan Center | Successful application | P2 | ⬜ Not started |
| BANK-LOAN-04 | Loan Center | Insufficient-income rejection | P2 | ⬜ Not started |
| BANK-CARD-01 | Cards Control | Freeze card | P3 | ⬜ Not started |
| BANK-CARD-02 | Cards Control | Purchase limit | P2 | ⬜ Not started |
| BANK-CARD-03 | Cards Control | International usage | P3 | ⬜ Not started |
| BANK-CARD-04 | Cards Control | Replace damaged card | P2 | ⬜ Not started |
| BANK-SUPP-01 | Support Hub | Ticket with attachment | P2 | ⬜ Not started |
| BANK-SUPP-02 | Support Hub | Ticket filtering | P3 | ⬜ Not started |
| BANK-SUPP-03 | Support Hub | Empty-ticket validation | P3 | ⬜ Not started |
| BANK-SETT-01 | Settings | Update phone | P3 | ⬜ Not started |
| BANK-SETT-02 | Settings | Change password | P2 | ⬜ Not started |
| BANK-SETT-03 | Settings | Login activity | P3 | ⬜ Not started |

## Technology stack

| Area           | Choice                            | Purpose                                                                             |
| -------------- | --------------------------------- | ----------------------------------------------------------------------------------- |
| Language       | TypeScript                        | Adds static type checking and safer refactoring.                                    |
| Test framework | Playwright Test                   | Provides browser automation, fixtures, assertions, parallel execution, and reports. |
| Browser        | Chromium                          | A focused starting browser for stable, fast feedback.                               |
| Test design    | Page Object Model with components | Separates reusable UI actions from business expectations in specs.                  |
| Formatting     | Prettier                          | Keeps the codebase consistent and easy to review.                                   |
| Reporting      | Playwright HTML reporter          | Produces a searchable local report with failure evidence.                           |

## Why this is an intermediate-to-advanced automation foundation

This is more than a collection of recorded browser steps. It has a maintainable test architecture designed to grow with the product.

- **Correct POM separation:** page and component objects own locators and reusable UI actions. Test specs own the assertions, so each test clearly communicates the expected business behaviour.
- **Component-based design:** the login form and password-reset modal are separate components composed by `LoginPage`. When the reset flow grows, it can change without making the login flow difficult to maintain.
- **Reusable setup:** the authenticated fixture removes repeated login steps from signed-in tests while dedicated authentication specs still test login itself.
- **Centralised configuration:** base URL, retries, browser settings, screenshots, videos, traces, and reporters are controlled in one place rather than repeated in every spec.
- **Traceability:** automated test titles use the supplied IDs such as `BANK-AUTH-04`, connecting automated results directly to the manual test-case inventory.
- **Type-safe and formatted:** strict TypeScript catches mistakes before browser execution, while Prettier keeps the project style consistent.
- **Failure diagnostics:** on failure, Playwright can preserve screenshots, video, trace information, and the HTML report so a failing test is diagnosable rather than just marked red.

## Reporting and evidence

Run the suite with `npm test`. Playwright prints a concise terminal result and creates an HTML report in `playwright-report/`. Open it with:

```bash
npm run report
```

Failure-only artifacts are stored in `test-results/`. These generated folders are ignored by Git, keeping source control focused on test code while retaining useful evidence locally or in CI.

## CI readiness

A CI YAML workflow is intentionally not included yet because this suite targets a public sandbox that can be externally unstable. Once a stable test environment is available, add a CI workflow that installs dependencies and browsers, runs `npm test`, and uploads `playwright-report/` and `test-results/` as build artifacts.
