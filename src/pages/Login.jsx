import { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { BiUser } from 'react-icons/bi';
import { createUser } from '../services/userAPI';
import Carregando from './Carregando';
import dow from './musica4.png';

class Login extends Component {
  state = {
    name: '',
    isBtnDisabled: '',
    carregando: false,
    login: false,
  };

  ValidarBtn = ({ target }) => {
    const { value } = target;
    const numMin = 3;
    this.setState({
      name: value,
      isBtnDisabled: value.length >= numMin,
    });
  };

  SalvaLogin = async (event) => {
    event.preventDefault();
    const { name } = this.state;
    this.setState({
      carregando: true,
    });
    await createUser({ name });
    this.setState({
      carregando: false,
      login: true,
    });
  };

  render() {
    const { isBtnDisabled, carregando, login } = this.state;
    return (
      <div data-testid="page-login">
        { carregando ? <Carregando />
          : (
            <div className="paginaLogin">
              <img className="imgLogin" src={ dow } alt="sim" />
              <form className="Login">
                <div className="control has-icons-left has-icons-right">
                  <i className="icon"><BiUser /></i>
                  <input
                    className="input is-large nomeInput"
                    type="text"
                    name="name"
                    data-testid="login-name-input"
                    placeholder="Digite seu nome"
                    onChange={ this.ValidarBtn }
                  />
                </div>
                <button
                  type="submit"
                  className="button is-link  btnEntra"
                  data-testid="login-submit-button"
                  onClick={ this.SalvaLogin }
                  disabled={ !isBtnDisabled }
                >
                  Entrar
                </button>
              </form>
            </div>
          )}
        {login && <Redirect to="/search" /> }
      </div>
    );
  }
}

export default Login;
