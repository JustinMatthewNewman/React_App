import React from 'react';

const HeaderImage = ({ imageSource, altText }) => {
  return (
    <header>
      <img src={imageSource} alt={altText} className="w-full flex justify-center items-center h-300" />
    </header>
  );
};

export default HeaderImage;

