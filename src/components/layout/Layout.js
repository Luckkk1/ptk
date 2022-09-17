import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { colorActions } from '../../store/color-slice';

import Header from './Header';
import classes from './Layout.module.css';

const Layout = props => {
  const dispatch = useDispatch();
  const isCopied = useSelector(state => state.copied);

  useEffect(() => {
    const reset = setTimeout(() => {
      dispatch(colorActions.setCopiedFalse());
    }, 4000);
    return () => {
      clearTimeout(reset);
    };
  }, [isCopied]);
  return (
    <div>
      <Header />
      <div className={`${classes.inform} ${isCopied ? classes.flying : ''}`}>
        <p>Copy's complete, buddy</p>
      </div>
      <main>{props.children}</main>
      <footer className={classes.footer}>
        <p>yslee9883@gmail.com</p>
        <p>Copyright 2022. YSLee All rights reserved</p>
      </footer>
    </div>
  );
};

export default Layout;
