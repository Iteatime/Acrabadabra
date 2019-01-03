import { Directive, HostBinding, Input, OnInit, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[companyHeaderDirective]'
})
export class CompanyHeaderDirectiveDirective implements OnInit {

  @HostBinding('innerHTML') content;
  @Input('companyHeaderDirective') data;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit(): void {

    const parent = this.el.nativeElement.parentElement;
    this.renderer.removeChild(parent, this.el.nativeElement);

    const companyName = this.renderer.createElement('h2');
    this.renderer.appendChild(companyName, this.renderer.createText(this.data.name));
    this.renderer.appendChild(parent, companyName);

    const companyAddress = document.createElement('div');
    this.renderer.appendChild(companyAddress, this.renderer.createText(this.data.address));
    this.renderer.appendChild(parent, companyAddress);

    const companyTelephone = document.createElement('div');
    this.renderer.appendChild(companyTelephone, this.renderer.createText(this.formatTelephon(this.data.telephone)));
    this.renderer.appendChild(parent, companyTelephone);

    this.appendSIREN(parent);
  }

  appendSIREN(parent: any): void {
    if (this.data.tradeAndCompaniesRegisterExemption) {
      const companySIREN = document.createElement('div');
      this.renderer.appendChild(companySIREN, this.renderer.createText(this.formatSIREN(this.data.siren)));
      this.renderer.appendChild(parent, companySIREN);

      this.appendVAT(parent);

      const companyTradeAndCompaniesRegisterExemption = document.createElement('div');
      this.renderer.appendChild(companyTradeAndCompaniesRegisterExemption, this.renderer.createText(
        'Dispensé d’immatriculation au registre du commerce et des sociétés (RCS) et au répertoire des métiers (RM)'
      ));
      this.renderer.appendChild(parent, companyTradeAndCompaniesRegisterExemption);
    } else {
      const companySIREN = document.createElement('div');
      this.renderer.appendChild(companySIREN, this.renderer.createText(
        this.formatSIREN(this.data.siren) +
        ' R.C.S ' +
        this.data.tradeAndCompaniesRegisterCity
      ));
      this.renderer.appendChild(parent, companySIREN);
      this.appendVAT(parent);
    }
  }

  appendVAT(parent: any): void {
    if (!this.data.vatExemption) {
      const companyVAT = document.createElement('div');
      this.renderer.appendChild(companyVAT, this.renderer.createText(this.formatVAT(this.data.vatNumber)));
      this.renderer.appendChild(parent, companyVAT);
    }
  }

  formatTelephon(telephone: string): string {
    switch (telephone.length) {
      case 10:
        // Tel : 01;23.45.67.89
        return  'Tel : ' +
              telephone.substring(0, 2) + '.' +
              telephone.substring(2, 4) + '.' +
              telephone.substring(4, 6) + '.' +
              telephone.substring(6, 8) + '.' +
              telephone.substring(8, 10);
      default:
        return  'Tel : ' + telephone;
    }
  }

  formatSIREN(siren: string): string {
    switch (siren.length) {
      case 9:
        // SIREN : 810 581 900
        return  'SIREN : ' +
                siren.substring(0, 3) + ' ' +
                siren.substring(3, 6) + ' ' +
                siren.substring(6, 9);
      case 10:
        // SIRET : B 793 569 757
        return  'SIRET : ' +
                siren.substring(0, 1) + ' ' +
                siren.substring(1, 4) + ' ' +
                siren.substring(4, 7) + ' ' +
                siren.substring(7, 10);
      default:
        return siren;
    }
  }

  formatVAT(tva: string): string {
    // N° TVA intra-communautaire : FR 24 790 488 894.
    return  'N° TVA intra-communautaire : ' +
            tva.substring(0, 2) + ' ' +
            tva.substring(2, 4) + ' ' +
            tva.substring(4, 7) + ' ' +
            tva.substring(7, 10) + ' ' +
            tva.substring(10, 13) + '.';
  }
}

