import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading">
      <div className="preloader">
        <div className="box">
          <div className="box__inner">
            <div className="box__back-flap"></div>
            <div className="box__right-flap"></div>
            <div className="box__front-flap"></div>
            <div className="box__left-flap"></div>
            <div className="box__front"></div>
          </div>
        </div>
        <div className="box">
          <div className="box__inner">
            <div className="box__back-flap"></div>
            <div className="box__right-flap"></div>
            <div className="box__front-flap"></div>
            <div className="box__left-flap"></div>
            <div className="box__front"></div>
          </div>
        </div>
        <div className="line">
          <div className="line__inner"></div>
        </div>
        <div className="line">
          <div className="line__inner"></div>
        </div>
        <div className="line">
          <div className="line__inner"></div>
        </div>
        <div className="line">
          <div className="line__inner"></div>
        </div>
        <div className="line">
          <div className="line__inner"></div>
        </div>
        <div className="line">
          <div className="line__inner"></div>
        </div>
        <div className="line">
          <div className="line__inner"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
