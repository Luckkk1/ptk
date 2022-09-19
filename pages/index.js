import { MongoClient } from 'mongodb';
import Head from 'next/head';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { colorActions } from '../src/store/color-slice';

import Intro from '../src/components/layout/Intro';
import ColorList from '../src/components/colorList/ColorList';

export default function Home(props) {
  const dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(colorActions.setMainList(props.colorSet));
  }, [dispatch]);

  return (
    <div>
      <Head>
        <title>
          Pick The Color | Color palette for CSS users and Designers
        </title>
        <meta
          name="google-site-verification"
          content="aj3LlJ97q8xn0V6bc60sO1gTDg4PYSrgyJSIROzeF8E"
        />
        <meta name="author" content="Ys Lee" />
        <meta
          name="description"
          content="Get inspiration from colorful waterfalls! Use the color palette of various movies and brand themes."
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Intro />
      <ColorList onLikeUp={likeUp} />
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
