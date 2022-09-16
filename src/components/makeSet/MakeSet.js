import { useState, useRef } from 'react';

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

  const rgbTextChangeHandler = e => {
    const rgbArr = e.target.value.split(',').map(e => +e.trim());
    setRgb(e.target.value);
    setRgbHex(rgbToHex(rgbArr[0], rgbArr[1], rgbArr[2]));
    setOpp(rgbToOpp(rgbArr[0], rgbArr[1], rgbArr[2]));
    if (e.target.value === '') {
      setRgbHex('');
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
    const rgbArr = rgb.split(',').map(e => +e.trim());
    setRgbHex(e.target.value);
    setRgb(hexToRgb(e.target.value));
    setOpp(rgbToOpp(rgbArr[0], rgbArr[1], rgbArr[2]));
    if (e.target.value === '') {
      setRgb('');
    }
  };

  const hexColorChangeHandler = e => {
    const rgbArr = rgb.split(',').map(e => +e.trim());
    setRgb(hexToRgb(e.target.value));
    setRgbHex(e.target.value);
    setOpp(rgbToOpp(rgbArr[0], rgbArr[1], rgbArr[2]));
  };

  return (
    <section className={classes.makeSet}>
      <div className={classes.colorControl}>
        <h3>RGB</h3>
        <input type="text" onChange={rgbTextChangeHandler} value={rgb} />
        <input type="color" onChange={rgbColorChangeHandler} value={rgbHex} />
      </div>
      <div className={classes.colorControl}>
        <h3>HEX</h3>
        <input type="text" onChange={hexTextChangeHandler} value={rgbHex} />
        <input type="color" onChange={hexColorChangeHandler} value={rgbHex} />
      </div>
      <div className={classes.colorControl}>
        <h3>OPP</h3>
        <input type="text" value={opp} disabled />
        <input type="color" value={opp} disabled />
      </div>
      <div className={classes.btnControl}>
        <button>Put</button>
        <p>Share your own Color Set with others.</p>
      </div>
    </section>
  );
};

export default MakeSet;
