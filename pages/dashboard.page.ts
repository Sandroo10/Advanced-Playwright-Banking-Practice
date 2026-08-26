import type { Page } from "@playwright/test";
import { BasePage } from "./base.page";
import { AccountsSummaryComponent } from "./components/dashboard/accounts-summary.component";
import { CardsControlsComponent } from "./components/dashboard/cards-controls.component";
import { CustomerSupportComponent } from "./components/dashboard/customer-support.component";
import { FundsTransferComponent } from "./components/dashboard/funds-transfer.component";
import { LoansCenterComponent } from "./components/dashboard/loans-center.component";
import { PreferencesComponent } from "./components/dashboard/preferences.component";

export class DashboardPage extends BasePage {
  readonly accountsSummary: AccountsSummaryComponent;
  readonly fundsTransfer: FundsTransferComponent;
  readonly cardsControls: CardsControlsComponent;
  readonly loansCenter: LoansCenterComponent;
  readonly customerSupport: CustomerSupportComponent;
  readonly preferences: PreferencesComponent;

  constructor(page: Page) {
    super(page);
    this.accountsSummary = new AccountsSummaryComponent(page);
    this.fundsTransfer = new FundsTransferComponent(page);
    this.cardsControls = new CardsControlsComponent(page);
    this.loansCenter = new LoansCenterComponent(page);
    this.customerSupport = new CustomerSupportComponent(page);
    this.preferences = new PreferencesComponent(page);
  }
}
