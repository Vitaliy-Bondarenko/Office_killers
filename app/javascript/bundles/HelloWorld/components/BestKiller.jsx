import React from 'react';
import { Button } from 'semantic-ui-react';
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
      <div className='mm-list' style={{transform: 'translate(0, 13%)'}}>
        <h1 style={{margin: "0 0 0 0"}}> BEST KILLER </h1>
        <div style={{margin: "20px 0 5px 0"}}>
          <img id="img-target" src={top_killer.image_URL} />
        </div>
        <h3 style={{color: "white", fontSize: '1.5rem', marginBottom: '30px'}}>
          {top_killer.email} killed {top_killer.target_ids.length - 1} players
        </h3>
        <div>
          <Link to='/'>
            <Button id="mm-btn-right-margin" style={{marginRight: '20px'}}>BACK TO MENU</Button>
          </Link>
          <Link to='/statistic'>
            <Button id="mm-btn-right-margin" style={{marginLeft: '20px', backgroundColor: '#a8f7a8'}}>
              GAME STATISTIC
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default BestKiller;
