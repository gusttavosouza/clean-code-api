import { ILoadSurveysRepository } from '@data/interfaces/db/Survey/ILoadSurveysRepository';
import { ISurveyModel } from '@domain/models/Survey';

export class DbLoadSurveys implements ILoadSurveysRepository {
  constructor(private readonly loadSurveysRepository: ILoadSurveysRepository) {
    this.loadSurveysRepository = loadSurveysRepository;
  }

  public async loadAll(): Promise<ISurveyModel[]> {
    const surveys = await this.loadSurveysRepository.loadAll();
    return surveys;
  }
}
