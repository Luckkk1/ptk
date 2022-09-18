import { MongoClient } from 'mongodb';
import Head from 'next/head';
import Script from 'next/script';
import { useState } from 'react';

import ColorBox from '../src/components/colorbox/ColorBox';
import ColorList from '../src/components/colorList/ColorList';
import MakeSet from '../src/components/makeSet/MakeSet';

export default function Home(props) {
  const [colors, setColors] = useState(props.colorSet);

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

  const getColorSet = async () => {
    const res = await fetch('./api/newColorSet', { method: 'GET' });
    const data = await res.json();
    data.sort((a, b) => b.like - a.like);
    setColors(data);
  };

  return (
    <div>
      <Head>
        <title>
          Pick The Color | Color palette that finds the opposite color
        </title>
        <meta
          name="google-site-verification"
          content="aj3LlJ97q8xn0V6bc60sO1gTDg4PYSrgyJSIROzeF8E"
        />
        <meta name="author" content="Ys Lee" />
        <meta
          name="description"
          content="Share your own color palette with a simple color picker."
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <MakeSet />
      <ColorBox onPostColorSet={postColorSet} onGetColorSet={getColorSet} />
      <ColorList onLikeUp={likeUp} colors={colors} />
    </div>
  );
}

export const getStaticProps = async () => {
  const client = await MongoClient.connect(
    'mongodb+srv://ysLee:4P7m0iViVrrr27eu@pickthecolor.mveb3q5.mongodb.net/colorSet?retryWrites=true&w=majority'
  );

  const db = client.db();

  const colorSetCollection = db.collection('colorSet');

  let colorSet = await colorSetCollection.find().toArray();

  colorSet.sort((a, b) => b.like - a.like);

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
