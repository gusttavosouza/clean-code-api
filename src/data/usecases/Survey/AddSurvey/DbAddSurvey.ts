import { IAddSurvey, AddSurveyModel } from '@domain/usecases/Survey/AddSurvey';
import { IAddSurveyRepository } from './DbAddSurveyProtocols';

export class DbAddSurvey implements IAddSurvey {
  constructor(private readonly addSurveyRepository: IAddSurveyRepository) {
    this.addSurveyRepository = addSurveyRepository;
  }

  public async add(data: AddSurveyModel): Promise<void> {
    await this.addSurveyRepository.add(data);

    return new Promise(resolve => resolve());
  }
}
