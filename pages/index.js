import { MongoClient } from 'mongodb';

import ColorBox from '../src/components/colorbox/ColorBox';
import ColorList from '../src/components/colorList/ColorList';
import MakeSet from '../src/components/makeSet/MakeSet';

export default function Home(props) {
  const postColorSet = async colorSet => {
    const res = await fetch('./api/newColorSet', {
      method: 'POST',
      body: JSON.stringify(colorSet),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
  };

  const likeUp = async id => {
    const res = await fetch('./api/newColorSet', {
      method: 'PUT',
      body: JSON.stringify(id),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
  };

  return (
    <div>
      <MakeSet />
      <ColorBox onPostColorSet={postColorSet} />
      <ColorList onLikeUp={likeUp} colors={props.colorSet} />
    </div>
  );
}

export const getStaticProps = async () => {
  const client = await MongoClient.connect(
    'mongodb+srv://ysLee:4P7m0iViVrrr27eu@pickthecolor.mveb3q5.mongodb.net/colorSet?retryWrites=true&w=majority'
  );

  const db = client.db();

  const colorSetCollection = db.collection('colorSet');

  const colorSet = await colorSetCollection.find().toArray();

  client.close();

  return {
    props: {
      colorSet: colorSet.map(set => ({
        title: set.title,
        id: set._id.toString(),
        colors: set.colors,
        like: set.like,
      })),
    },
    revalidate: 1,
  };
};
