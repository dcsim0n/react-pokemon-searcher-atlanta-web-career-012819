import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {
  
    state = {
       pokemon: [],
       searchTerm: ""
    }
  

  componentDidMount(){
    fetch('http://localhost:3000/pokemon')
    .then(resp => resp.json())
    .then(data => {
      this.setState({pokemon: data})
    })
  }
  handleSubmit = (e) =>{
    //console.log('e.target.name.value', e.target.name.value)
    const name = e.target.name.value
    const hp = e.target.hp.value
    const front = e.target.frontUrl.value
    const back = e.target.backUrl.value
    const pokemon = { 
      name: name,
      stats: [{name:"hp",value:hp}],
      sprites: {front: front, back: back}
    }

    fetch('http://localhost:3000/pokemon',{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(pokemon)
    }).then(resp => {
      if(resp.ok){
        this.setState({pokemon: [...this.state.pokemon, pokemon]})
      }
    })
  }
  handleSearch = (e, {value}) => {
    this.setState({searchTerm: value})
  }
  
  filterPokemon(){
  
    const filterString = this.state.searchTerm
    const filteredPokemon = this.state.pokemon.filter((pokemon)=>{
      return pokemon.name.includes(filterString)
    })
    console.log('filteredString :', filterString);
    console.log('filteredPokemon :', filteredPokemon);
    //return array of pokemon
    return filteredPokemon
  }
  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={_.debounce(this.handleSearch, 500)} showNoResults={false} />
        <br />
        <PokemonCollection pokemon={this.filterPokemon()} />
        <br />
        <PokemonForm handleSubmit={this.handleSubmit} />
      </div>
    )
  }
}

export default PokemonPage
