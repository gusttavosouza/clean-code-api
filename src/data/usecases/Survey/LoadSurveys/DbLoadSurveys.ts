import { ILoadSurveys } from '@domain/usecases/Survey/LoadSurveys';
import { ILoadSurveysRepository, SurveyModel } from './DbLoadSurveysProtocols';

export class DbLoadSurveys implements ILoadSurveys {
  constructor(private readonly loadSurveysRepository: ILoadSurveysRepository) {
    this.loadSurveysRepository = loadSurveysRepository;
  }

  public async load(accountId: string): Promise<SurveyModel[]> {
    const surveys = await this.loadSurveysRepository.loadAll(accountId);
    return surveys;
  }
}
