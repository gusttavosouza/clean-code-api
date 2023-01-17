import { ILogErrorRepository } from '@data/protocols';

export class LogErrorRepositorySpy implements ILogErrorRepository {
  stack: string;

  async logError(stack: string): Promise<void> {
    this.stack = stack;
  }
}
