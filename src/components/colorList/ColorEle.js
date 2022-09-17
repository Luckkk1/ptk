import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import classes from './ColorEle.module.css';
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

const ColorEle = props => {
  const [success, setSuccess] = useState(false);
  const [newLikes, setNewLikes] = useState(props.like);
  const dispatch = useDispatch();

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
    }, 400);
  };

  const likeUpClickHandler = async e => {
    props.onLikeUp(e.target.parentNode.parentNode.id);
    setNewLikes(prev => (prev += 1));
  };

  return (
    <div className={classes.ele} id={props.id}>
      <div className={classes.title}>
        <h3>{props.title}</h3>
        <p onClick={likeUpClickHandler}>Likes: {newLikes}</p>
      </div>
      <div className={classes.list}>
        {props.colors.map((hex, i) => {
          const rgb = hexToRgb(hex);
          const rgbArr = rgb.split(',').map(e => +e.trim());
          const [r, g, b] = rgbArr;
          let key = 'cc' + i;
          return (
            <div
              style={{
                backgroundColor: hex,
                color: r + g + b > 250 ? '#011627' : 'white',
              }}
              onClick={copyClickHandler}
              key={key}
            >
              <p>{success ? 'Copied!' : hex}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ColorEle;
