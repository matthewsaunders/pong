import React, { useState } from 'react';
import HomeScreen from './HomeScreen';
import GameScreen from './GameScreen';
import CreateGameScreen from './CreateGameScreen';

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
  const [currentScreen, setCurrentScreen] = useState('home');

  let screen;
  switch (currentScreen) {
    case 'create':
      screen = <CreateGameScreen />;
      break;
    case 'game':
      screen = <GameScreen />;
      break;
    case 'home':
    default:
      console.log(`DEFAULT: '${currentScreen}'`)
      screen = <HomeScreen setScreen={setCurrentScreen} />;
  }

  return (
    <>
      <Styles />
      <div className='Pong'>
        { screen }
      </div>
    </>
  );

}

export default Pong;
