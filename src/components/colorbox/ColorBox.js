import classes from './ColorBox.module.css';

const ColorBox = () => {
  return (
    <section className={classes.colorBox}>
      <div className={classes.title}>
        <input type="text" />
        <p>Limit 5 to 10</p>
      </div>
      <div className={classes.boxList}>
        <div style={{ backgroundColor: '#264653' }}></div>
        <div style={{ backgroundColor: '#2a9d8f' }}></div>
        <div style={{ backgroundColor: '#e9c46a' }}></div>
        <div style={{ backgroundColor: '#f4a261' }}></div>
        <div style={{ backgroundColor: '#e76f51' }}></div>
      </div>
      <div className={classes.btnControl}>
        <button>제출</button>
      </div>
    </section>
  );
};

export default ColorBox;
