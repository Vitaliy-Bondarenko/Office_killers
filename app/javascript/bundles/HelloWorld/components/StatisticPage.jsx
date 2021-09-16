import React from 'react';
import { Link } from 'react-router-dom';

class StatisticPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current_player: props.current_player
    };
  }

  passFullNameTargets = (user) => {
    return (
      <div className='d-flex f-direction-row' style={{marginTop: '10px'}} key={user.id}>
        <img className='player-small-avatar' src={user.image_URL} />
        <h2 className='white-text statistic-user-name'>{user.first_name} {user.last_name}</h2>
      </div>
    );
  }

  renderStatisticsColumn = (text, players) => {
    return (
      <div className='statistics-font-wrapper'>
        <h2 className='white-text'> {text} </h2>
        <hr />
        <div className='d-flex f-direction-col width-100'>
          {players.map(this.passFullNameTargets)}
        </div>
      </div>
    )
  }

  render(){
    const target_ids = this.state.current_player.dead_targets;
    const your_killers = this.state.current_player.your_killers;
    return (
      <div className='align-text-center width-100 d-flex f-direction-col align-items-center'>
        <div className='top-btm-mar-30px'>
          <h3 className='white-text' style={{fontSize: '70px'}}>GAME STATISTIC</h3>
        </div>
        <div className='f-direction-row d-flex width-100 max-width-450 j-content-space-between'>
          { this.renderStatisticsColumn('Your killers', your_killers) }
          { this.renderStatisticsColumn('You killed', target_ids) }
        </div>
        <Link to='/best_killer' className='top-btm-mar-30px'>
            <button
                className="default-btn"
                type='button'>BACK</button>
          </Link>
      </div>
    );
  }
}

export default StatisticPage;
