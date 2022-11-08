import { Component } from 'react';
import PropTypes from 'prop-types';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import musicsApi from '../services/musicsAPI';

class Album extends Component {
  state = {
    album: {},
    musica: [],
    favoritaMusi: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const [album, ...musica] = await musicsApi(id);
    const favoritaMusi = await getFavoriteSongs();
    this.setState({
      album,
      musica,
      favoritaMusi,
    });
    // console.log(favoritaMusi)
  }

  render() {
    const { album, musica, favoritaMusi } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <h3 data-testid="album-name">{album.collectionName}</h3>
          <p data-testid="artist-name">{album.artistName}</p>
        </div>
        {musica.map((music) => (
          <MusicCard
            key={ music.trackId }
            music={ music }
            favoritaMusi={ favoritaMusi }
            // array={ [music] }
            // { ...this.state }
          />))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.oneOfType({
    params: PropTypes.oneOfType({
      id: PropTypes.number,
    }),
  }).isRequired,
};

export default Album;
