declare namespace Cypress {
  interface BaseTimesheet {
    title: string;
    finalClientName: string;
    consultant: { name: string; email: string };
    invoice: {
      number: string;
      date: string;
      workedRate: number;
      provider: {};
      client: {
        ref: string;
      };
    };
  }

  interface Chainable<Subject = any> {
    /**
     * Create and initialize a new Cypress session that will be reused for evey tests requiring a login
     * @param sessionName session to use (defaults to: default-user)
     */
    netlifyLogin(sessionName?: string): void;

    /**
     * Returns Netlify's Identity iframe body
     */
    getNetlifyIdentityFrame(): Chainable<
      JQuery<HTMLIFrameElement | Document | Text | Comment>
    >;

    /**
     * Check if the current url ends with the specified value
     * @param value
     */
    urlEndsWith(value: string): void;

    /**
     * Seeds MongoDB using the speficied seeds in `seeds/<seedName>`
     * @param seedName seed to use (defaults to main)
     */
    seed(seedName?: string): void;

    shouldBeVisibleAfterScroll(): Chainable<JQuery<HTMLElement>>;

    enterMileageAllowance(
      date: Date,
      journey: string,
      distance: string,
      type: number,
      indexWhenAdded: number,
      mileageRate?: string,
      totalMileage?: string
    ): void;
    checkMileageAllowance(
      date: string,
      journey: string,
      distance: string,
      indexWhenAdded: number,
      mileageRate: string,
      totalMileage: string,
      editMode: boolean
    ): void;

    goToReviewTimesheet(): void;
    goToInvoiceTimesheet(): void;
    goToReInvoiceTimesheet(): void;

    getByCyAttr(
      name: string,
      options?: { log?: boolean }
    ): Chainable<JQuery<HTMLElement>>;

    fillBaseTimesheet(timesheet: Partial<BaseTimesheet>): void;
  }
}
