export interface BaseLogger {
  log: (message: string) => void;
}

export class ActiveLogger implements BaseLogger {
  constructor(private readonly invoker: Function, private readonly prefix: string) {}

  log(message: string) {
    console.log(`${this.prefix}[${this.invoker.name}]: ${message}`);
  }

  error(e: Error) {
    console.log(`${this.prefix}[${this.invoker.name}]`)
    throw e
  }
}

export class InactiveLogger implements BaseLogger {
  log(_message: string) {
    return;
  }
}

export class VerboseLoggerFactory {
  private isActive: boolean;
  private prefix: string;

  constructor(private readonly namespace: string, private readonly moduleName: string) {
    this.isActive = process.env.QMATE_VERBOSE_MODE === "true" ? true : false;
    this.prefix = `[${this.namespace}][${this.moduleName}]`;
  }

  initLog(invoker: Function) {
    if (!this.isActive) return new InactiveLogger();

    console.log(`${this.prefix}[${invoker.name}]: invoked`);
    return new ActiveLogger(invoker, this.prefix);
  }
}
