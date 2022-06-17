export interface ITokenGenerator {
  generate(_: string): Promise<string>;
}
