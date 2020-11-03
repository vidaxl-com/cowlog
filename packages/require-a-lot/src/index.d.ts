declare module 'require-a-lot' {
  interface RALMethods {
    (): object;
    alias: (...aliases: string[]) => this;
    from: (...packages: string[]) => this;
    hide: (...packages: string[]) => this;
    log: this;
    info: this;
    tag: (tag: string) => {
      linkDirectory: (dir: string) => RALMethods;
    };
    removeUnused: this;
    define: (name: string, newValue: any) => this;
    compose: (newObjectName: string, fn: Function, packages: string | string[]) => this;
  }

  export default function requireALot(requireModuleInstance: NodeRequire): (...packages: string[]) => RALMethods;
}
