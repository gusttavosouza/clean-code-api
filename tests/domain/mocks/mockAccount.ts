import faker from 'faker';
import { IAddAccount, IAuthentication } from '@domain/usecases';

export const mockAddAccountParams = (): IAddAccount.Params => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockAuthenticationParams = (): IAuthentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});
