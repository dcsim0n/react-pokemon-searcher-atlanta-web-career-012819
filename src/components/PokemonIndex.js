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
        <PokemonForm />
      </div>
    )
  }
}

export default PokemonPage
