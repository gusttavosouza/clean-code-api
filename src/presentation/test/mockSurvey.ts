import { IAddSurvey } from '@domain/usecases/Survey/AddSurvey';
import { AddSurveyModel } from '@presentation/controllers/Survey/AddSurvey/AddSurveyControllerProtocols';

import { SurveyModel } from '@domain/models/Survey';
import { ILoadSurveys } from '@domain/usecases/Survey/LoadSurveys';

export const mockAddSurvey = (): IAddSurvey => {
  class AddSurveyStub implements IAddSurvey {
    async add(_: AddSurveyModel): Promise<void> {
      return new Promise(resolve => resolve());
    }
  }
  return new AddSurveyStub();
};

const mockSurveys = (): SurveyModel[] => {
  return [
    {
      id: 'any_id',
      question: 'any_question',
      answers: [
        {
          image: 'any_image',
          answer: 'any_answer',
        },
      ],
      date: new Date(),
    },
    {
      id: 'other_id',
      question: 'other_question',
      answers: [
        {
          image: 'other_image',
          answer: 'other_answer',
        },
      ],
      date: new Date(),
    },
  ];
};

export const mockLoadSurveys = (): ILoadSurveys => {
  class LoadSurveysStub implements ILoadSurveys {
    async loadAll(): Promise<SurveyModel[]> {
      return new Promise(resolve => resolve(mockSurveys()));
    }
  }
  return new LoadSurveysStub();
};
