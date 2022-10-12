import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import ColorBox from '../../src/components/colorbox/ColorBox';
import MakeSet from '../../src/components/makeSet/MakeSet';
import { colorActions } from '../../src/store/color-slice';

export default function Home(props) {
  const dispatch = useDispatch();

  const postColorSet = async colorSet => {
    const res = await fetch('../api/newColorSet', {
      method: 'POST',
      body: JSON.stringify(colorSet),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
  };

  const getColorSet = async () => {
    const res = await fetch('../api/newColorSet', { method: 'GET' });
    const data = await res.json();

    data.colorSet.sort((a, b) => b.like - a.like);
    // setColors(data);
    dispatch(colorActions.setMainList(data.colorSet));
  };

  return (
    <div>
      <Head>
        <title>Pick The Color | RGB to HEX and Opposite Color Converter</title>
        <meta
          name="google-site-verification"
          content="aj3LlJ97q8xn0V6bc60sO1gTDg4PYSrgyJSIROzeF8E"
        />
        <meta name="author" content="Ys Lee" />
        <meta
          name="description"
          content="This color waterfall has many functions such as HEX to RGB and RGB to opposite colors. And make your own color palette and share it with people."
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <MakeSet />
      <ColorBox onPostColorSet={postColorSet} onGetColorSet={getColorSet} />
    </div>
  );
}
