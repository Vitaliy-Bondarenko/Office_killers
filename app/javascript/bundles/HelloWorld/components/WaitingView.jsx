import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import requestmanager from '../../lib/requestmanager';

class WaitingView extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      game: props.game,
      current_user: props.current_user,
      owner_id: props.owner_id,
      current_player: props.current_player
    };
  }

  handleDestroyPlayer = () => {
    const { current_player } = this.state;
    const url = '/api/v1/players/' + current_player.id;
    requestmanager.request(url, 'delete').then((_resp) => {
      window.location = "/";
    }).catch(() => {});
  }

  render(){
    return(
      <div className='mm-list-small-padding'>
        <h1> KILLER </h1>
        <div className='mm-list-waskilled'>
          <p className='medium-text'> YOUR GAME IS UNSTARTED. WAITING FOR ALL PLAYERS TO CONNECT</p>
          <div className='horizontal-line'> <hr /> </div>
          <p className='small-text'> WE WILL NOTIFY YOU WHEN GAME START </p>
        </div>
        <Link to='/'>
          <Button id="mm-btn-right-margin">BACK TO MENU</Button>
        </Link>
        <input
            id="mm-btn-red-width"
            onClick={this.handleDestroyPlayer}
            style={{marginRight: "43px"}}
            type="button"
            value="DISCONNECT FROM GAME" />
      </div>
    );
  }
}

export default WaitingView;
