import { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searcAlbums from '../services/searchAlbumsAPI';
import Carregando from './Carregando';

class Search extends Component {
  state = {
    artista: '',
    artistaPesq: '',
    isBtnDisabled: '',
    carregando: false,
    albuns: [],
    resultArt: '',
  };

  ValidarBtn = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const numMin = 2;
      this.setState({
        isBtnDisabled: value.length >= numMin,
        artistaPesq: value,
      });
    });
  };

  carregandoTela = (bool) => {
    this.setState({
      carregando: bool,
    });
  };

  LimparInput = () => {
    this.setState({
      artista: '',
      isBtnDisabled: false,
    });
  };

  PercorreAlbum = () => {
    const { albuns, artistaPesq } = this.state;
    this.setState({
      resultArt: (
        (!albuns.length) ? <h1>Nenhum álbum foi encontrado</h1>
          : (
            <section className="secPaiAlbum">
              <h3 className="TituloAlbum">
                { `Resultado de álbuns de: ${artistaPesq}`}
              </h3>
              {albuns.map((art) => (
                <section key={ art.artistId } className="secAlbum">
                  <img
                    src={ art.artWorkUrl100 }
                    alt={ art.artistName }
                    className="imgAlbum"
                  />
                  <h3 className="artistaAlbum">{art.artistName}</h3>
                  <Link
                    className="LinkAlbum"
                    data-testid={ `link-to-album-${art.collectionId}` }
                    to={ `/album/${art.collectionId}` }
                  >
                    Ver Album
                  </Link>
                </section>
              ))}
            </section>)
      ),
    });
  };

  AlbumPesquisa = async () => {
    const { artista } = this.state;
    this.carregandoTela(true);
    const resposta = await searcAlbums(artista);
    this.setState({
      albuns: resposta,
    }, this.PercorreAlbum);
    this.LimparInput();
    this.carregandoTela(false);
  };

  render() {
    const { isBtnDisabled, artista, carregando, resultArt } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <input
          className="ArtNome"
          name="artista"
          type="text"
          value={ artista }
          placeholder="Nome do Artista"
          data-testid="search-artist-input"
          onChange={ this.ValidarBtn }
        />
        <button
          type="button"
          className="BtnProcura"
          data-testid="search-artist-button"
          disabled={ !isBtnDisabled }
          onClick={ this.AlbumPesquisa }
        >
          Pesquisar
        </button>
        {carregando && <Carregando />}
        { resultArt }
      </div>
    );
  }
}

export default Search;
