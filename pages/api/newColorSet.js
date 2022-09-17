import { MongoClient, ObjectId } from 'mongodb';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const data = req.body;

    const client = await MongoClient.connect(
      'mongodb+srv://ysLee:4P7m0iViVrrr27eu@pickthecolor.mveb3q5.mongodb.net/colorSet?retryWrites=true&w=majority'
    );

    const db = client.db();

    const colorSetCollection = db.collection('colorSet');

    const result = await colorSetCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: 'colorSet inserted' });
  }
  if (req.method === 'PUT') {
    const data = req.body;

    const client = await MongoClient.connect(
      'mongodb+srv://ysLee:4P7m0iViVrrr27eu@pickthecolor.mveb3q5.mongodb.net/colorSet?retryWrites=true&w=majority'
    );

    const db = client.db();

    const colorSetCollection = db.collection('colorSet');

    const filter = { _id: ObjectId(data.id) };

    const updateDoc = {
      $inc: {
        like: 1,
      },
    };

    const result = await colorSetCollection.updateOne(filter, updateDoc);

    console.log(result);

    client.close();

    res.status(201).json({ message: 'Like 1+' });
  }
};

export default handler;
