import { ILoadSurveyByIdRepository } from '@data/interfaces/db';
import { SurveyModel } from '@domain/models/Survey';
import { ILoadSurveyById } from '@domain/usecases/Survey/LoadSurveyById';

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
