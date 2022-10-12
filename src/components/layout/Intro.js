import { useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';

import classes from './Intro.module.css';
import { colorActions } from '../../store/color-slice';

const Intro = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();

  useEffect(() => {
    const checkKeyword = setTimeout(() => {
      if (inputRef.current.value) {
        dispatch(colorActions.mainListFilter(inputRef.current.value));
      }
    }, 300);
    return () => {
      clearTimeout(checkKeyword);
    };
  }, [dispatch]);

  return (
    <div className={classes.introSection}>
      <h2>Welcome to the ColorFalls</h2>
      <p>You can find color palette of various topics.</p>
      <input type="text" placeholder="Search" ref={inputRef} />
    </div>
  );
};

export default Intro;
