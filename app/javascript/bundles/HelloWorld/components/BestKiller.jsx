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
    players.sort((a, b ) => b.target_ids.length - a.target_ids.length);
    return players[0];
  }

  render(){
    const { current_game } = this.state;
    const top_killer = this.getTopKiller(current_game.players);
    return (
      <div className='mm-list'>
        <h1 className='big-font' style={{margin: "0", whiteSpace: 'nowrap'}}> BEST KILLER </h1>
        <div style={{margin: "20px 0 5px 0"}}>
          <img
              id="img-target"
              src={top_killer.image_URL}
              style={{maxWidth: '400px'}} />
        </div>
        <h3 style={{color: "white", fontSize: '1.5rem', marginBottom: '30px', fontWeight: '300'}}>
          {top_killer.first_name} {top_killer.last_name} killed {top_killer.target_ids.length - 1} players
        </h3>
        <div>
          <Link to='/'>
            <input
                className="mm-btn"
                value='BACK TO MENU' />
          </Link>
          <Link to='/statistic'>
            <input
                className="mm-btn"
                style={{backgroundColor: '#a8f7a8'}}
                value='GAME STATISTIC' />
          </Link>
        </div>
      </div>
    );
  }
}

export default BestKiller;
