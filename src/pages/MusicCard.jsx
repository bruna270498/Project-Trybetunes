import { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { musica } = this.props;
    return (
      musica.map(({ previewUrl, trackName }, i) => (
        <div className="MusicaDiv" key={ i }>
          <span className="nomeMusic">{trackName}</span>
          <audio
            className="Music"
            data-testid="audio-component"
            src={ previewUrl }
            controls
          >
            <track kind="captions" />
          </audio>
        </div>
      ))
    );
  }
}

MusicCard.propTypes = {
  musica: PropTypes.arrayOf.isRequired,
};

export default MusicCard;
