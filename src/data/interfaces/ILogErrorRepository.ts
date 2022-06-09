interface ILogErrorRepository {
  logError(stack: string): Promise<void>;
}

export default ILogErrorRepository;
