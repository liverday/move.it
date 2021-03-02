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
            accumulatedExperience,
        } = req.body;

        await database.collection('users').updateOne({ _id: new ObjectId(id as any) }, {
            $set: {
                level,
                currentExperience,
                challengesCompleted,
                accumulatedExperience
            }
        });

        res.json(true);
    } else {
        const session = await getSession({ req });

        if (!session) {
            return res.status(401);
        }

        const user = await database.collection('users').findOne({ _id: new ObjectId(session.id) });

        return res.json(user);
    }
}