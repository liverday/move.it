import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { ObjectId } from 'mongodb';

import { getDatabase } from '../../../utils/database';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const database = await getDatabase();

    if (req.method === 'PUT') {
        const { id } = req.query;
        const {
            level,
            currentExperience,
            challengesCompleted,
        } = req.body;

        await database.collection('users').updateOne({ _id: new ObjectId(id as any) }, {
            $set: {
                level,
                currentExperience,
                challengesCompleted
            }
        });

        res.json(true);
    } else {
        const { id } = await getSession({ req });

        const user = await database.collection('users').findOne({ _id: new ObjectId(id) });

        return res.json(user);
    }
}