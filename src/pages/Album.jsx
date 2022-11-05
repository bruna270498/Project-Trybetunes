import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import musicsApi from '../services/musicsAPI';

class Album extends Component {
  state = {
    album: {},
    musica: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const [album, ...musica] = await musicsApi(id);
    this.setState({
      album,
      musica,
    });
  }

  render() {
    const { album, musica } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <h3 data-testid="album-name">{album.collectionName}</h3>
          <p data-testid="artist-name">{album.artistName}</p>
        </div>
        <button type="button" onClick={ album }>oi</button>
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
