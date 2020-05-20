import React from 'react';
import { Button, Card, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class StatisticPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current_player: props.current_player
    };
  }

  passEmailTargets = (user) => {
    return (
      <div key={user.id}>
        <div><h4>{user.email}</h4></div>
      </div>
    );
  }

  render(){
    const target_ids = this.state.current_player.dead_targets;
    const your_killers = this.state.current_player.your_killers;
    return (
      <div className='statistic-window'>
        <Card className='card-center' style={{maxWidth: '36%', minWidth: '20%'}}>
          <div className='float-right'>
            <a className='corner-close' href='/'>
              <Icon name='close' />
            </a>
          </div>
          <div className='small-padding'>
            <h3>GAME STATISTIC</h3>
          </div>
          <div className='vertical-align'>
            <div>
              <h3 className='black-text'> Your killers </h3>
              <hr style={{width: "150px", color: 'black', marginTop: '5px'}} />
              {your_killers.map(this.passEmailTargets)}
            </div>
            <div>
              <h3 className='black-text' style={{marginTop: '13px'}}> You killed </h3>
              <hr style={{width: "150px", color: 'black', marginTop: '5px'}} />
              {target_ids.map(this.passEmailTargets)}
            </div>
            <Link to='/'>
              <Button id="mm-btn-green" style={{marginBottom: "25px"}}>BACK TO MAIN MENU</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }
}

export default StatisticPage;
