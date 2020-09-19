export class LocalStorageBackup {
  private _backupFilePath = 'cypress/fixtures/.local-storage-backup';

  backup() {
    return cy.writeFile(this._backupFilePath, JSON.stringify(localStorage));
  }

  /* Return a promise resolved to true or false depending on success. */
  tryRestore(): Cypress.Chainable<boolean> {
    return (cy
      .exec(`test -f ${this._backupFilePath}`, {
        /* Don't fail if enable to execute command (ex.: windows) or if file is not found. */
        failOnNonZeroExit: false,
      })
      .then(result => {
        if (result.code !== 0) {
          return false;
        }

        return cy.readFile(this._backupFilePath).then(rawData => {
          const data = JSON.parse(rawData);

          const entries = Object.entries(data);

          if (entries.length === 0) {
            return false;
          }

          entries.forEach(([key, value]) => {
            localStorage.setItem(key, value as string);
          });

          return true;
        });
      }) as any) as Cypress.Chainable<boolean>;
  }
}

export const localStorageBackup = new LocalStorageBackup();
