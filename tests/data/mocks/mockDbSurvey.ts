import faker from 'faker';
import {
  IAddSurveyRepository,
  ILoadSurveyByIdRepository,
  ILoadSurveysRepository,
  ICheckSurveyByIdRepository,
  ILoadAnswersBySurveyRepository,
} from '@data/protocols';
import { mockSurveyModel, mockSurveyModels } from '@tests/domain/mocks';

export class AddSurveyRepositorySpy implements IAddSurveyRepository {
  params: IAddSurveyRepository.Params;

  async add(params: IAddSurveyRepository.Params): Promise<void> {
    this.params = params;
  }
}

export class LoadSurveyByIdRepositorySpy implements ILoadSurveyByIdRepository {
  id: string;
  result = mockSurveyModel();

  async loadById(id: string): Promise<ILoadSurveyByIdRepository.Result> {
    this.id = id;
    return this.result;
  }
}

export class LoadAnswersBySurveyRepositorySpy
  implements ILoadAnswersBySurveyRepository
{
  id: string;
  result = [faker.random.word(), faker.random.word()];

  async loadAnswers(
    id: string,
  ): Promise<ILoadAnswersBySurveyRepository.Result> {
    this.id = id;
    return this.result;
  }
}

export class CheckSurveyByIdRepositorySpy
  implements ICheckSurveyByIdRepository
{
  id: string;
  result = true;

  async checkById(id: string): Promise<ICheckSurveyByIdRepository.Result> {
    this.id = id;
    return this.result;
  }
}

export class LoadSurveysRepositorySpy implements ILoadSurveysRepository {
  accountId: string;
  result = mockSurveyModels();

  async loadAll(accountId: string): Promise<ILoadSurveysRepository.Result> {
    this.accountId = accountId;
    return this.result;
  }
}
