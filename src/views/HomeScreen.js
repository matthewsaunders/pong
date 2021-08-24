import React, { useState } from 'react';

const Styles = () => {
  return (
    <style>
      {`
      .HomeScreen {
        display: flex;
        flex-direction: column;
        align-items: center;
        align-content: center;
        height: 100%;
      }
      .HomeScreen > button {
        width: 300px;
        padding: 8px;
        margin: 16px 0px;
        cursor: pointer;
      }
      .HomeScreen__spacer {
        flex: 1;
      }
      .HomeScreen__invitiations {
        width: 300px;
      }
      `}
    </style>
  );
}

const HomeScreen = ({ setScreen, invitation }) => {

  return (
    <>
      <Styles />
      <div className="HomeScreen">
        <div className="HomeScreen__spacer" ></div>
        
        <button onClick={() => setScreen('create') }>Start New Game</button>
        
        <div className="HomeScreen__invitiations">
          <h2>Game Invitations</h2>

          { invitation &&
            <p>Let's play</p>
          }

          { !invitation &&
            <p>No invitations</p>
          }
        </div>
        
        <div className="HomeScreen__spacer" ></div>
      </div>
    </>
  )
}

export default HomeScreen;