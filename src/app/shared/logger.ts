export class Logger {
  constructor(private loggerName?: string) {
    if (!loggerName) {
      this.loggerName = 'log';
    }
  }

  log(...args) {
    return console.log.apply(console, [`[${this.loggerName}]`, ...args]);
  }

  logGroup(label: string, ...args) {
    console.groupCollapsed(label);
    args.forEach(group => this.log(...(Array.isArray(group) ? group : [group])));
    console.groupEnd();
  }
}
