import { Component } from 'react';
import { Link } from 'react-router-dom';
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
      <header data-testid="header-component">
        {carregando ? <Carregando1 />
          : (
            <h3
              className="nomeHeader"
              data-testid="header-user-name"
            >
              { nome }
            </h3>
          )}
        <nav>
          <Link
            className="Nav"
            to="/search"
            data-testid="link-to-search"
          >
            Procurar
          </Link>
          <Link
            className="Nav"
            to="/favorites"
            data-testid="link-to-favorites"
          >
            Favorites
          </Link>
          <Link
            className="Nav"
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
