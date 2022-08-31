import { ILogErrorRepository } from '@data/interfaces/db/Log/ILogErrorRepository';

export const mockLogErrorRepository = (): ILogErrorRepository => {
  class LogErrorRepositoryStub implements ILogErrorRepository {
    async logError(_: string): Promise<void> {
      return Promise.resolve();
    }
  }
  return new LogErrorRepositoryStub();
};
