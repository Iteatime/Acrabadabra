export class InputConfig {
  inputName: string;
  config: {
    binding: string;
    parent?: string;
    toggle?: string;
  };

  constructor(name, config?: any) {
    this.inputName = name;
    this.config = config || null;
  }

  resolveBinding(object: any): any {
    if (this.config.parent !== undefined) {
      return object[this.config.parent][this.config.binding];
    } else {
      return object[this.config.binding];
    }
  }

  updateBinded(object: any, value: any): void {
    if (this.config.parent !== undefined) {
      object[this.config.parent][this.config.binding] = value;
    } else {
      object[this.config.binding] = value;
    }
  }
}
