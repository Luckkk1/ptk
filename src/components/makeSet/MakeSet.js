import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { colorActions } from '../../store/color-slice';

import classes from './MakeSet.module.css';

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
        result[3],
        16
      )}`
    : null;
}

function rgbToHex(r, g, b) {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function rgbToOpp(r, g, b) {
  const result = `${255 - r}, ${255 - g}, ${255 - b}`;
  const oppArr = result.split(',').map(e => +e.trim());
  const opp = rgbToHex(oppArr[0], oppArr[1], oppArr[2]);
  return opp;
}

const MakeSet = () => {
  const [rgb, setRgb] = useState('');
  const [rgbHex, setRgbHex] = useState('');
  const [opp, setOpp] = useState('');
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const setArr = useSelector(state => state.colorList);

  const rgbTextChangeHandler = e => {
    const rgbArr = e.target.value.split(',').map(e => +e.trim());
    setRgb(e.target.value);
    setRgbHex(rgbToHex(rgbArr[0], rgbArr[1], rgbArr[2]));
    setOpp(rgbToOpp(rgbArr[0], rgbArr[1], rgbArr[2]));
    if (e.target.value === '') {
      setRgbHex('');
      setOpp('');
    }
  };

  const rgbColorChangeHandler = e => {
    const rgb = hexToRgb(e.target.value);
    const rgbArr = rgb.split(',').map(e => +e.trim());
    setRgb(hexToRgb(e.target.value));
    setRgbHex(e.target.value);
    setOpp(rgbToOpp(rgbArr[0], rgbArr[1], rgbArr[2]));
  };

  const hexTextChangeHandler = e => {
    const rgbArr = hexToRgb(e.target.value)
      ? hexToRgb(e.target.value)
          .split(',')
          .map(e => +e.trim())
      : '';
    setRgbHex(e.target.value);
    setRgb(hexToRgb(e.target.value));
    setOpp(rgbToOpp(rgbArr[0], rgbArr[1], rgbArr[2]));
    if (e.target.value === '') {
      setRgb('');
      setOpp('');
    }
  };

  const hexColorChangeHandler = e => {
    const rgbArr = hexToRgb(e.target.value)
      .split(',')
      .map(e => +e.trim());
    setRgb(hexToRgb(e.target.value));
    setRgbHex(e.target.value);
    setOpp(rgbToOpp(rgbArr[0], rgbArr[1], rgbArr[2]));
  };

  const btnClickHandler = () => {
    if (setArr.length < 10 && !setArr.includes(rgbHex) && rgb) {
      dispatch(colorActions.addToList(rgbHex));
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  const oppChangeClickHandler = e => {
    const input = document.querySelector('.oppInput');
    e.preventDefault();
    if (input.value === '') return;
    const inputValue = e.target.parentElement.children[1].value;
    const rgb = hexToRgb(inputValue);
    const rgbArr = rgb.split(',').map(e => +e.trim());
    const hex = rgbToHex(rgbArr[0], rgbArr[1], rgbArr[2]);
    const opp = rgbToOpp(rgbArr[0], rgbArr[1], rgbArr[2]);
    setRgb(rgb);
    setRgbHex(hex);
    setOpp(opp);
  };

  let errMsg =
    error && setArr.length > 10
      ? 'The color set is full.'
      : 'The same color is not allowed.';

  if (setArr.length <= 0) errMsg = 'Select Color';

  return (
    <section className={classes.makeSet}>
      <div className={classes.colorControl}>
        <h3>RGB</h3>
        <input
          type="text"
          onChange={rgbTextChangeHandler}
          value={rgb}
          placeholder="0, 0, 0"
        />
        <input type="color" onChange={rgbColorChangeHandler} value={rgbHex} />
      </div>
      <div className={classes.colorControl}>
        <h3>HEX</h3>
        <input
          type="text"
          onChange={hexTextChangeHandler}
          value={rgbHex}
          placeholder="#000000"
        />
        <input type="color" onChange={hexColorChangeHandler} value={rgbHex} />
      </div>
      <div className={`${classes.colorControl} ${classes.oppBox}`}>
        <h3>OPP</h3>
        <input
          type="text"
          value={opp}
          readOnly
          onClick={oppChangeClickHandler}
          placeholder="#ffffff"
          className="oppInput"
        />
        <input
          type="color"
          value={opp}
          onClick={oppChangeClickHandler}
          readOnly
        />
      </div>
      <div className={classes.btnControl}>
        <button onClick={btnClickHandler}>
          <p>Put</p>
        </button>
        {error ? (
          <p style={{ color: '#e65b5b' }}>{errMsg}</p>
        ) : (
          <p>Share your own Color Set with others.</p>
        )}
      </div>
    </section>
  );
};

export default MakeSet;
