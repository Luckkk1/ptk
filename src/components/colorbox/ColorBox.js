import { useSelector, useDispatch } from 'react-redux';
import { useRef, useState } from 'react';
import hexSorter from 'hexsorter';

import classes from './ColorBox.module.css';
import { colorActions } from '../../store/color-slice';

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
        result[3],
        16
      )}`
    : null;
}

const ColorBox = props => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const titleRef = useRef();
  const dispatch = useDispatch();
  const colorArr = useSelector(state => state.colorList);
  const mostBright = hexSorter.sortColors(colorArr, 'mostBrightColor');

  const submitSetHandler = () => {
    if (
      mostBright.length > 4 &&
      mostBright.length < 11 &&
      titleRef.current.value !== ''
    ) {
      props.onPostColorSet({
        title: titleRef.current.value,
        colors: mostBright,
        like: 0,
      });
      dispatch(colorActions.setSubmitTrue());
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  const copyClickHandler = e => {
    const value =
      e.target.nodeName === 'P'
        ? e.target.outerText
        : e.target.children[0].outerText;
    navigator.clipboard.writeText(value);

    setSuccess(true);
    dispatch(colorActions.setCopiedTrue());
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  };

  const content =
    colorArr.length > 0 &&
    mostBright.map((e, i) => {
      const rgb = hexToRgb(e);
      const rgbArr = rgb.split(',').map(e => +e.trim());
      const [r, g, b] = rgbArr;

      let key = 'colorset' + i;
      return (
        <div
          style={{
            backgroundColor: e,
            color: r + g + b > 300 ? '#011627' : '#e5e5e5',
          }}
          key={key}
          onClick={copyClickHandler}
        >
          <p>{success ? 'Copied!' : e}</p>
        </div>
      );
    });

  return (
    <section className={classes.colorBox}>
      <div className={classes.title}>
        <input type="text" placeholder="Title" ref={titleRef} />
        <p>Limit 5 to 10</p>
      </div>
      <div className={classes.boxList}>{content}</div>
      <div className={classes.btnControl}>
        {error && <p>Please submit it according to the format.</p>}
        <button onClick={submitSetHandler}>Submit</button>
      </div>
    </section>
  );
};

export default ColorBox;
