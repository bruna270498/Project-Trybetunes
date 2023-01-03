import { Component } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai';
import { BsSearch, BsStar } from 'react-icons/bs';
import music from './musica5.png';
import { getUser } from '../services/userAPI';
import Carregando1 from '../pages/carregando1';

class Header extends Component {
  state = {
    nome: '',
    carregando: false,
  };

  componentDidMount() {
    this.buscaNome();
  }

  buscaNome = async () => {
    this.setState({ carregando: true });
    const usuario = await getUser();
    this.setState({
      nome: usuario.name,
      carregando: false,
    });
  };

  render() {
    const { nome, carregando } = this.state;
    return (
      <header className="cabecalhoLateral" data-testid="header-component">
        <img className="imgMusicHeader" src={ music } alt="music" />
        {carregando ? <Carregando1 />
          : (
            <>
              <i className="iconNome"><AiOutlineUser /></i>
              <h3
                className="nomeHeader"
                data-testid="header-user-name"
              >
                { nome }
              </h3>
            </>
          )}
        <nav className="nav flex-column">
          <i className="iconBuscar"><BsSearch /></i>
          <Link
            className="Nav nav-link"
            to="/search"
            data-testid="link-to-search"
          >
            Procurar
          </Link>
          <i className="iconFav"><BsStar /></i>

          <Link
            className="Nav1 nav-link"
            to="/favorites"
            data-testid="link-to-favorites"
          >
            Favorites
          </Link>
          <i className="iconPerfil"><AiOutlineUser /></i>
          <Link
            className="Nav2 nav-link"
            to="/profile"
            data-testid="link-to-profile"
          >
            Perfil
          </Link>
        </nav>
      </header>
    );
  }
}

export default Header;
