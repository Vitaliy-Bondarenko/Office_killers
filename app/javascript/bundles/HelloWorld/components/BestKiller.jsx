import React from 'react';
import { Link } from 'react-router-dom';

class BestKiller extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current_game: props.current_game
    };
  }

  getTopKiller = (players) => {
    players.sort((a, b ) => b.killed_targets.length - a.killed_targets.length);
    return players[0];
  }

  render(){
    const { current_game } = this.state;
    const top_killer = this.getTopKiller(current_game.players);
    return (
      <div className='align-text-center'>
        <div className='d-flex f-direction-col adaptive-width'>
          <h1 className='big-font whitespace-nowrap'> BEST KILLER </h1>
          <div style={{margin: "20px 0 5px 0"}}>
            <img
                className="profile-img"
                src={top_killer.image_URL} />
          </div>
          <div>
            <h1 style={{color: "white", fontSize: '40px', fontWeight: '300'}}>
              {top_killer.first_name} {top_killer.last_name}
            </h1>
            <h2 style={{marginTop: '0'}}> killed {top_killer.killed_targets.length} players</h2>
          </div>
          <div className='d-flex f-direction-row top-btm-mar-30px double-link-btn-wrapper j-content-space-between'>
            <Link to='/'>
              <button>BACK TO MENU</button>
            </Link>
            <Link to='/statistic'>
              <button
                  className="green-btn">GAME STATISTIC</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default BestKiller;
