import React, { useState } from 'react';
import GameScreen from './GameScreen';
import HomeScreen from './HomeScreen';

const Styles = () => {
  return (
    <style>
      {`
      .Pong {
        border: 2px solid black;
        border-radius: 2px;
        width: 1000px;
        height: 600px;
        margin-left: auto;
        margin-right: auto;
      }
      `}
    </style>
  );
}

const Pong = ({ initConfig }) => {
  const [currentGame, setCurrentGame] = useState(null);

  const screen = currentGame ?
    <GameScreen /> :
    <HomeScreen
      setCurrentGame={setCurrentGame}
    />;

  return (
    <>
      <Styles />
      <div className='Pong'>
        {screen}
      </div>
    </>
  );

}

export default Pong;
