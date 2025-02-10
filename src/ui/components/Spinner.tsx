import React from 'react';
import '../spinner.css';
const Spinner = () => {
  return (
    <>
      {/* <h1>{title}</h1> */}
      <div id='cooking'>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div className='bubble'></div>
        <div id='area'>
          <div id='sides'>
            <div id='pan'></div>
            <div id='handle'></div>
          </div>
          <div id='pancake'>
            <div id='pastry'></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Spinner;
