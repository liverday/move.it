import { MongoClient, Db } from 'mongodb';

export async function getDatabase(): Promise<Db> {
    const client = await MongoClient.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    return client.db('moveit');
}