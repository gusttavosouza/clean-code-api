import { IAddSurveyRepository } from '@data/interfaces/db/IAddSurveyRepository';
import { IAddSurvey } from '@domain/usecases/AddSurvey';

export class DbAddSurvey implements IAddSurvey {
  constructor(private readonly addSurveyRepository: IAddSurveyRepository) {
    this.addSurveyRepository = addSurveyRepository;
  }

  public async add(data: IAddSurvey.Params): Promise<void> {
    await this.addSurveyRepository.add(data);

    return Promise.resolve();
  }
}
