import React, { useState, useEffect } from 'react';

const Styles = () => {
  return (
    <style>
      {`
      .HomeScreen {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      .HomeScreen__selections {
        border-bottom: 2px solid black;
      }
      .HomeScreen__availableSelections {
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
        text-transform: uppercase;
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
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      .Player__name {
        margin: 0;
        margin-left: 8px;
        font-size: 12px;
      }
      .Player--selected {
        background-color: lightblue;
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
        background-color: lightblue;
      }

      .Selections {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 8px;
      }
      .Selections__item {
        margin: 0px 4px;
      }

      .Selection {

      }
      .Selection--empty {

      }
      `}
    </style>
  );
}

const HomeScreen = ({ setCurrentGame }) => {
  const projectId = aha.project.id;
  const userId = aha.user.id;
  const [availablePlayers, setAvailablePlayers] = useState(null);
  const [availableFeatures, setAvailableFeatures] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);

  const enablePlayButton = selectedPlayer && selectedFeature;

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

  console.log('availableFeatures');
  console.log(availableFeatures);

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
                  <img className="Player__avatar" src={player.avatarUrl} />
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

  return (
    <div className="HomeScreen">
      <Styles />
      <div className="HomeScreen__selections">
        <div className="Selections">
          <div className="Selections__item Selection">
            Select a Player
          </div>

          <div className="Selections__item">
            +
          </div>

          <div className="Selections__item Selection">
            Select a Feature
          </div>
        </div>
      </div>

      <div className="HomeScreen__availableSelections AvailableSelections">
        <div className="AvailableSelections__column">
          <div className="Column">
            <h2 className="Column__title">Available Players</h2>
            <div className="Column__data">
              { renderAvailablePlayers() }
            </div>
          </div>
        </div>
        <div className="AvailableSelections__column">
          <div className="Column">
            <h2 className="Column__title">Available Features</h2>
            <div className="Column__data">
              { renderAvailableFeatures() }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeScreen;