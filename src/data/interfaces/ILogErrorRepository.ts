interface ILogErrorRepository {
  log(stack: string): Promise<void>;
}

export default ILogErrorRepository;
