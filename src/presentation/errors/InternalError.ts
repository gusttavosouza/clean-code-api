export class InternalError extends Error {
  constructor(stack: string) {
    super('Internal server error');
    this.name = 'ServerError';
    this.stack = stack;
  }
}
