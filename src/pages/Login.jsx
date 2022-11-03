import { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Carregando from './Carregando';

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
            <form className="Login">
              <input
                className="nome"
                type="text"
                name="name"
                data-testid="login-name-input"
                placeholder="Digite seu nome"
                onChange={ this.ValidarBtn }
              />
              <button
                type="submit"
                className="btnEntrar"
                data-testid="login-submit-button"
                onClick={ this.SalvaLogin }
                disabled={ !isBtnDisabled }
              >
                Entrar
              </button>
            </form>
          )}
        {login && <Redirect to="/search" /> }
      </div>
    );
  }
}

export default Login;
