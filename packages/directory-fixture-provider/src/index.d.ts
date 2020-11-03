declare module 'directory-fixture-provider' {
  export default function dfp(location: string): () => {
    get(fixtureDirectory: string): {
      dir: string;
      fixturePath: string;
      getFixtureFiles: () => object;
      getDestinationFiles: () => object;
      getStatus: () => {
        paths: {
          destination: string;
          fixtures: string;
        };
        changeList: object;
        changeNumbers: {
          deleted: number;
          changed: number;
          new: number;
        };
        changeTotals: number;
        contents: any;
        changed: boolean;        
      };
      getFixtureContent: (fixturesRoot: string, fixturesDirectory: string) => any;
    }
  };
}
