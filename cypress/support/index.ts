declare namespace Cypress {
  interface Chainable<Subject = any> {
    netlifyLogin(sessionName?: string): void;
    getNetlifyIdentityFrame(): Chainable<
      JQuery<HTMLIFrameElement | Document | Text | Comment>
    >;
    urlEndsWith(value: string): void;
  }
}
