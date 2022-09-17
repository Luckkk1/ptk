import { Provider } from 'react-redux';
import Head from 'next/head';

import Layout from '../src/components/layout/Layout';
import store from '../src/store/index';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
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
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
