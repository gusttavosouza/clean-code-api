import { MongoClient, Collection } from 'mongodb';

export const MongoHelper = {
  client: null as MongoClient,
  async connect(uri: string) {
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  },

  async disconnect(): Promise<void> {
    await this.client.close(true);
  },

  getCollection(name: string): Collection {
    return this.client.db().collection(name);
  },

  mapper(collection: any): any {
    const { _id, ...collectionWithoutId } = collection;
    return { ...collectionWithoutId, id: _id };
  },
};
