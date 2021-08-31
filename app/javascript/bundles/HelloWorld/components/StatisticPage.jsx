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
      <div key={user.id}>
        <h4>{user.first_name} {user.last_name}</h4>
      </div>
    );
  }

  render(){
    const target_ids = this.state.current_player.dead_targets;
    const your_killers = this.state.current_player.your_killers;
    return (
      <div className='statistic-window'>
        <div
            className='card-center'
            style={{maxWidth: '500px', width: '80%'}}>
          <div className='small-padding'>
            <h3 style={{fontSize: '25px', margin: '0'}}>GAME STATISTIC</h3>
          </div>
          <div className='vertical-align'>
            <div style={{marginBottom: '20px'}}>
              <h3 className='black-text'> Your killers </h3>
              <hr style={{width: "150px", color: 'black', marginTop: '5px'}} />
              {your_killers.map(this.passFullNameTargets)}
            </div>
            <div>
              <h3 className='black-text' style={{marginTop: '13px'}}> You killed </h3>
              <hr style={{width: "150px", color: 'black', marginTop: '5px'}} />
              {target_ids.map(this.passFullNameTargets)}
            </div>
            <Link to='/'>
              <button
                  className="mm-btn"
                  style={{margin: "25px 0", backgroundColor: '#a8f7a8'}}
                  type='button'>BACK TO MAIN MENU</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default StatisticPage;
