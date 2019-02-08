import React from "react";

const Ad300x600 = ({ img1, src1, img2, src2 }) => {
  let first_ad, second_ad;

  img1 && src1
    ? (first_ad = (
        <div className="advertisement">
          <span>Advertisement</span>
          <a href={src1} alt="advertisement link">
            <img className="img-responsive" src={img1} alt="Advertisement" />
          </a>
        </div>
      ))
    : (first_ad = null);

  img2 && src2
    ? (second_ad = (
        <div className="advertisement">
          <span>Advertisement</span>
          <a href={src2} alt="advertisement link">
            <img className="img-responsive" src={img2} alt="Advertisement" />
          </a>
        </div>
      ))
    : (second_ad = null);
  return (
    <div className="ads-container">
      {first_ad}
      {second_ad}
    </div>
  );
};

export default Ad300x600;
