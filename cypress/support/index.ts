declare namespace Cypress {
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
  }
}
