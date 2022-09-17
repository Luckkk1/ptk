import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import ColorEle from './ColorEle';
import classes from './ColorList.module.css';

const ColorList = props => {
  const likeUpHandler = async id => {
    props.onLikeUp({ id });
  };

  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{ 350: 1, 400: 2, 500: 3, 760: 4, 1000: 5 }}
    >
      <Masonry className={classes.colorList} columnsCount={5} gutter="20px">
        {props.colors.map(color => (
          <ColorEle
            key={color.id}
            id={color.id}
            title={color.title}
            colors={color.colors}
            like={color.like}
            onLikeUp={likeUpHandler}
          />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default ColorList;
