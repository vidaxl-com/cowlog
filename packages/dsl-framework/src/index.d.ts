declare module 'dsl-framework' {
  export default function unlimitedCurry(callback: (e: any, parameters: object) => any, paramManipulator: (parameters: object) => string): typeof unlimitedCurry | Promise<typeof unlimitedCurry>;
}
