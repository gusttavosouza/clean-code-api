import {
  ILoadSurveyByIdRepository,
  SurveyModel,
  ILoadSurveyById,
} from './DbLoadSurveyByIdProtocols';

export class DbLoadSurveyById implements ILoadSurveyById {
  constructor(
    private readonly loadSurveyByIdRepository: ILoadSurveyByIdRepository,
  ) {
    this.loadSurveyByIdRepository = loadSurveyByIdRepository;
  }

  public async loadById(id: string): Promise<SurveyModel> {
    const survey = await this.loadSurveyByIdRepository.loadById(id);
    return survey;
  }
}
