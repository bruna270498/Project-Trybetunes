import { Component } from 'react';
import PropTypes from 'prop-types';
import Carregando from '../pages/carregando1';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    check: false,
    carregando: false,
  };

  componentDidMount() {
    const { favoritaMusi, music } = this.props;
    const Favor = favoritaMusi.find((musica) => (music.trackId === musica.trackId));
    if (Favor) this.setState({ check: true });
  }

  componentDidUpdate() {
    return this.Favorito;
  }

  Favorito = async ({ target }) => {
    const { music } = this.props;
    this.setState({ carregando: true });
    if (target.checked) await addSong(music);
    else await removeSong(music);
    this.setState({
      carregando: false,
      check: target.checked,
    });
  };

  render() {
    const { music: { previewUrl, trackName, trackId } } = this.props;
    const { check, carregando } = this.state;
    return (
      (carregando) ? <Carregando />
        : (
          <div className="MusicaDiv">
            <span className="nomeMusic">{trackName}</span>
            <audio
              className="Music"
              data-testid="audio-component"
              src={ previewUrl }
              controls
            >
              <track kind="captions" />
            </audio>
            <label
              htmlFor="favor"
              data-testid={ `checkbox-music-${trackId}` }
            >
              <input
                type="checkbox"
                name={ trackName }
                id={ trackName }
                checked={ check }
                // onClick={ this.Favorito }
                onChange={ this.Favorito }
              />
              Favorita
            </label>
          </div>)
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackId: PropTypes.number.isRequired,
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
  }).isRequired,
  favoritaMusi: PropTypes.arrayOf.isRequired,
};

export default MusicCard;
