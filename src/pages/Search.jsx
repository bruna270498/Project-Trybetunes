import { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    isBtnDisabled: '',
  };

  ValidarBtn = ({ target }) => {
    const { value } = target;
    const numMin = 2;
    this.setState({
      isBtnDisabled: value.length >= numMin,
    });
  };

  render() {
    const { isBtnDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <input
          className="ArtNome"
          placeholder="Nome do Artista"
          data-testid="search-artist-input"
          onChange={ this.ValidarBtn }
        />
        <button
          type="button"
          className="BtnProcura"
          data-testid="search-artist-button"
          disabled={ !isBtnDisabled }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
