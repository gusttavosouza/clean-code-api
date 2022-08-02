import { ILoadSurveysRepository } from '@data/interfaces/db/Survey/ILoadSurveysRepository';
import { SurveyModel } from '@domain/models/Survey';

export class DbLoadSurveys implements ILoadSurveysRepository {
  constructor(private readonly loadSurveysRepository: ILoadSurveysRepository) {
    this.loadSurveysRepository = loadSurveysRepository;
  }

  public async loadAll(): Promise<SurveyModel[]> {
    const surveys = await this.loadSurveysRepository.loadAll();
    return surveys;
  }
}
