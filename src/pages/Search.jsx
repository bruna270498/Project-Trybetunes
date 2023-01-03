import { Component } from 'react';
import { Link } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import Header from '../components/Header';
import simbol from './simbolo.jpeg';
import searcAlbumsApi from '../services/searchAlbumsAPI';
import Carregando from './carregando2';

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
                <section className="secAlbumFil" key={ art.artistName }>
                  <img
                    src={ art.artworkUrl100 }
                    alt={ art.artistName }
                    className="album "
                  />
                  <h3 className="nomeArtista">{art.artistName}</h3>
                  <Link
                    className="nomeAlbum"
                    data-testid={ `link-to-album-${art.collectionId}` }
                    to={ `/album/${art.collectionId}` }
                  >
                    {art.collectionName}
                  </Link>
                </section>
              ))}
            </section>
          )
      ),
    });
  };

  AlbumPesquisa = async () => {
    const { artista } = this.state;
    this.carregandoTela(true);
    const resposta = await searcAlbumsApi(artista);
    this.setState({
      artistaPesq: artista,
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
        <div className="pesquisa">
          <img className="imgSimbolo" src={ simbol } alt="simbolo" />
          <div className="control">
            <input
              className="ArtNome input"
              name="artista"
              type="text"
              value={ artista }
              placeholder="Pesquisar"
              data-testid="search-artist-input"
              onChange={ this.ValidarBtn }
            />
            <button
              type="submit"
              className="BtnProcura BtnIcon "
              data-testid="search-artist-button"
              disabled={ !isBtnDisabled }
              onClick={ this.AlbumPesquisa }
            >
              <i className="iconPes"><BsSearch /></i>
            </button>
          </div>
        </div>
        {carregando && <Carregando />}
        <div className="divAlbum">
          { resultArt }
        </div>
      </div>
    );
  }
}

export default Search;
