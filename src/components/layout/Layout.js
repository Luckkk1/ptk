import { Fragment } from 'react';
import Header from './Header';
import classes from './Layout.module.css';

const Layout = props => {
  return (
    <div>
      <Header />
      <main>{props.children}</main>
    </div>
  );
};

export default Layout;
