import { ILoadSurveys } from '@domain/usecases';
import { ILoadSurveysRepository } from '@data/protocols';

export class DbLoadSurveys implements ILoadSurveys {
  constructor(private readonly loadSurveysRepository: ILoadSurveysRepository) {}

  async load(accountId: string): Promise<ILoadSurveys.Result> {
    return this.loadSurveysRepository.loadAll(accountId);
  }
}
