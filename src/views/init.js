import React from "react";

import Pong from './Pong';

const Styles = () => {
  return (
    <style>
      {`
    .title {
      color: var(--aha-green-800);
      font-size: 20px;
      text-align: center;
      margin: 20px;
    }
    `}
    </style>
  );
};

aha.on("pong", ({ fields, onUnmounted }, { identifier, settings }) => {
  return (
    <>
      <script src="https://unpkg.com/peerjs@1.3.1/dist/peerjs.min.js"></script>
      <Styles />
      <div className='title'>Pong</div>

      <Pong />
    </>
  );
});