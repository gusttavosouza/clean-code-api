import { IController } from '@presentation/protocols';

export const ApolloServerResolverAdapter = async (
  controller: IController,
  args,
): Promise<any> => {
  const httpResponse = await controller.handle(args);
  return httpResponse.body;
};
