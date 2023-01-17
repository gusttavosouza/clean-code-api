import {
  IAddSurvey,
  ILoadAnswersBySurvey,
  ILoadSurveys,
  ICheckSurveyById,
} from '@domain/usecases';
import faker from 'faker';
import { mockSurveyModels } from '@tests/domain/mocks';

export class AddSurveySpy implements IAddSurvey {
  params: IAddSurvey.Params;

  async add(params: IAddSurvey.Params): Promise<void> {
    this.params = params;
  }
}

export class LoadSurveysSpy implements ILoadSurveys {
  accountId: string;
  result = mockSurveyModels();

  async load(accountId: string): Promise<ILoadSurveys.Result> {
    this.accountId = accountId;
    return this.result;
  }
}

export class LoadAnswersBySurveySpy implements ILoadAnswersBySurvey {
  id: string;
  result = [faker.random.word(), faker.random.word()];

  async loadAnswers(id: string): Promise<ILoadAnswersBySurvey.Result> {
    this.id = id;
    return this.result;
  }
}

export class CheckSurveyByIdSpy implements ICheckSurveyById {
  id: string;
  result = true;

  async checkById(id: string): Promise<ICheckSurveyById.Result> {
    this.id = id;
    return this.result;
  }
}
