declare module 'generic-text-linker' {
  type MetaObject = {
    returnData: string;
    meta: object;
  }
  export function linker(inputString: string, beginning: number, closing: number, newValue?: string): MetaObject;
  export function linkerDir(dir: string[], beginning: number, closing: number, newValue?: string): string;
  export function linkerFile(file: string, beginning: number, closing: number, newValue?: string): MetaObject;
  export function substingToLineMapper(input: string, find: string): number[];
  export function fileProvider(rootDir: string): string[];
}
