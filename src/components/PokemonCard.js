import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
       clicked: true
    }
  }
  
  handleClick = (e)=>{
    console.log('clicked', e.target)
    this.setState({clicked: !this.state.clicked})
  }
  render() {
    const {name, stats, sprites, } = this.props.pokemon
    const hp = stats[stats.length-1].value
    return (
      <Card onClick={this.handleClick}>
        <div>
          <div className="image">
            <img src={this.state.clicked ? sprites.front : sprites.back }alt="oh no!" />
          </div>
          <div className="content">
            <div className="header">{name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {hp}
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
