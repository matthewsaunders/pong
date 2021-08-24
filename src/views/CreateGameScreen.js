import React, { useState, useEffect } from 'react';

const Styles = () => {
  return (
    <style>
      {`
      .CreateGameScreen {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      .CreateGameScreen__selections {
        border-bottom: 2px solid black;
      }
      .CreateGameScreen__availableSelections {
        flex: 1;
        overflow: hidden;
      }

      .AvailableSelections {
        display: flex;
        flex-direciton: row;
      }
      .AvailableSelections__column {
        flex: 1;
      }
      .AvailableSelections__column:first-child {
        border-right: 2px solid black;
      }

      .Column {
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 8px 16px;
      }
      .Column__title {
        font-size: 16px;
        font-weight: 500;
      }
      .Column__data {
        flex: 1;
        overflow-y: scroll;
        margin-bottom: 8px;
      }

      .ListItem {
        border: 1px solid black;
        border-radius: 2px;
        padding: 8px;
        margin-bottom: 8px;
      }

      .Player {
        display: flex;
        align-items: center;
      }
      .Player__avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
      .Player__name {
        margin: 0;
        margin-left: 8px;
        font-size: 12px;
      }
      .Player--selected {
        background-color: #e8f4f8;
      }

      .Feature {
        
      }
      .Feature__referenceNum {
        font-size: 14px;
        margin: 0;
      }
      .Feature__name {
        color: rgb(153,153,153);
        margin: 0;
        font-size: 12px;
      }
      .Feature--selected {
        background-color: #e8f4f8;
      }

      .Selections {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 8px;
      }
      .Selections__symbol {
        font-size: 24px;
      }

      .Selection {
        font-size: 14px;
        padding: 8px;
        margin: 0px 8px;
        border-radius: 4px;
        border: 1px solid black;
      }
      .Selection--empty {
        color: rgb(153,153,153);
        border: 1px dashed rgb(153,153,153);
      }

      .PlayButton:hover {
        cursor: pointer;
      }
      .PlayButton--enabled {
        color: white;
        background-color: #28a745;
        border-color: #28a745;
      }
      `}
    </style>
  );
}

const CreateGameScreen = ({ setCurrentGame }) => {
  const projectId = aha.project.id;
  const userId = aha.user.id;
  const [availablePlayers, setAvailablePlayers] = useState(null);
  const [availableFeatures, setAvailableFeatures] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);

  const allSelectionsMade = selectedPlayer && selectedFeature;
  const allOptionsLoaded = availablePlayers && availableFeatures;

  useEffect(() => {
    async function fetchAvailablePlayers() {
      const response = await aha.graphQuery(`
        {
          users(filters: {projectId: "${projectId}"}) {
            nodes {
              avatarUrl(size: SIZE_40)
              id
              name
            }
          }
        }
      `);

      setAvailablePlayers(response.users["nodes"]);
    }

    async function fetchAvailableFeatures() {
      const response = await aha.graphQuery(`
        {
          features(filters: {projectId: "${projectId}", assignedToUserId: null}) {
            nodes {
              id
              name
              referenceNum
              path
            }
          }
        }
      `);

      setAvailableFeatures(response.features["nodes"]);
    }

    fetchAvailablePlayers();
    fetchAvailableFeatures();
  }, []);

  function isSelectedPlayer(id) {
    return selectedPlayer && selectedPlayer.id === id;
  }

  function isSelectedFeature(id) {
    return selectedFeature && selectedFeature.id === id;
  }

  function renderAvailablePlayers() {
    if (!availablePlayers) return '';

    return (
      <>
        {
          availablePlayers
            .filter(player => player.id !== userId)
            .map((player) => {
              return (
                <div className={`ListItem Player ${isSelectedPlayer(player.id) ? 'Player--selected' : '' }`} onClick={() => setSelectedPlayer(player) }>
                  <img className="Player__avatar" src={ player.avatarUrl } />
                  <p className="Player__name">{ player.name }</p>
                </div>
              )
            })
        }
      </>
    );
  }

  function renderAvailableFeatures() {
    if (!availableFeatures) return '';

    return (
      <>
        {
          availableFeatures
            .map((feature) => {
              return (
                <div className={`ListItem Feature ${isSelectedFeature(feature.id) ? 'Feature--selected' : '' }`} onClick={() => setSelectedFeature(feature) }>
                  <h3 className="Feature__referenceNum">{ feature.referenceNum }</h3>
                  <p className="Feature__name">{ feature.name }</p>
                </div>
              )
            })
        }
      </>
    );
  }

  function renderSelectedPlayer() {
    if (!selectedPlayer) {
      return (
        <div className="Selection Selection--empty">
          Player
        </div>
      );
    }

    return (
      <div className="Selection Player">
        <img className="Player__avatar" src={ selectedPlayer.avatarUrl } />
        <p className="Player__name">{ selectedPlayer.name }</p>
      </div>
    );
  }

  function renderSelectedFeature() {
    if (!selectedFeature) {
      return (
        <div className="Selection Selection--empty">
          Feature
        </div>
      );
    }

    return (
      <div className="Selection Feature">
        <h3 className="Feature__referenceNum">{ selectedFeature.referenceNum }</h3>
        <p className="Feature__name">{ selectedFeature.name }</p>
      </div>
    );
  }

  function startGame() {
    console.log('Start Game!');
  }

  return (
    <div className="CreateGameScreen">
      <Styles />
      <div className="CreateGameScreen__selections">
        <div className="Selections">
          { renderSelectedPlayer() }
          <div className="Selections__symbol">+</div>
          { renderSelectedFeature() }
          <div className="Selections__symbol">=</div>
          <button
            className={`Selection PlayButton ${allSelectionsMade ? 'PlayButton--enabled' : ''}`}
            onClick={() => startGame()}
            disabled={!allSelectionsMade}
          >
            Play!
          </button>
        </div>
      </div>

      { !allOptionsLoaded && 
        <div style={{ display: 'flex', alignItems: 'center', alignContent: 'center', height: '100%', width: '100%' }} >
          <div style={{ flex: '1' }} />
          <aha-spinner style={{ height: '60px', width: '60px' }} />
          <div style={{ flex: '1' }} />
        </div>
      }

      { allOptionsLoaded &&
        <div className="CreateGameScreen__availableSelections AvailableSelections">
          <div className="AvailableSelections__column">
            <div className="Column">
              <h2 className="Column__title">Select a Player</h2>
              <div className="Column__data">
                { renderAvailablePlayers() }
              </div>
            </div>
          </div>
          <div className="AvailableSelections__column">
            <div className="Column">
              <h2 className="Column__title">Select a Feature</h2>
              <div className="Column__data">
                { renderAvailableFeatures() }
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default CreateGameScreen;