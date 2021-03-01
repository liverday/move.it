import { NextApiRequest, NextApiResponse } from 'next';
import { getDatabase } from '../../../utils/database';

export default async (_: NextApiRequest, res: NextApiResponse) => {
    const database = await getDatabase();

    return database
        .collection('users')
        .find()
        .sort({ level: -1 })
        .toArray((err, docs) => {
            if (err) {
                return res.status(400);
            }

            return res.json(docs);
        })
}