import { MongoClient, ObjectId } from 'mongodb';

const handler = async (req, res) => {
  const MONGODBKEY = process.env.REACT_APP_MONGODB_KEY;

  if (req.method === 'POST') {
    const data = req.body;

    const client = await MongoClient.connect(MONGODBKEY);

    const db = client.db();

    const colorSetCollection = db.collection('colorSet');

    const result = await colorSetCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: 'colorSet inserted' });
  }
  if (req.method === 'PUT') {
    const data = req.body;

    const client = await MongoClient.connect(MONGODBKEY);

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
  if (req.method === 'GET') {
    const client = await MongoClient.connect(MONGODBKEY);

    const db = client.db();

    const colorSetCollection = db.collection('colorSet');

    let colorSet = await colorSetCollection.find().toArray();

    colorSet = colorSet
      .map(set => ({
        title: set.title,
        id: set._id.toString(),
        colors: set.colors,
        like: set.like,
      }))
      .sort((a, b) => b.like - a.like);

    client.close();

    return res.status(200).json({ colorSet });
  }
};

export default handler;
