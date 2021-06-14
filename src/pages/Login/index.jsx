import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class index extends Component {
  constructor() {
    super();

    this.state = {
      fields: {
        name: '',
        email: '',
      },
      playBtn: {
        isDisabled: true,
      },
    };

    this.handleInput = this.handleInput.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { fields } = this.state;
    const nameHasChanged = prevState.fields.name !== fields.name;
    const emailHasChanged = prevState.fields.email !== fields.email;
    if (nameHasChanged || emailHasChanged) {
      this.buttonValidation();
    }
  }

  handleInput({ target: { id, value } }) {
    const { fields } = this.state;
    this.setState({
      fields: { ...fields, [id]: value },
    });
  }

  buttonValidation() {
    const { fields, playBtn } = this.state;

    this.setState({
      playBtn: { ...playBtn, isDisabled: !(fields.name !== '' && fields.email !== '') },
    });
  }

  render() {
    const { playBtn, fields } = this.state;
    return (
      <form>
        <input
          type="text"
          id="name"
          onChange={ this.handleInput }
          value={ fields.name }
          data-testid="input-player-name"
        />
        <input
          type="text"
          id="email"
          onChange={ this.handleInput }
          value={ fields.email }
          data-testid="input-gravatar-email"
        />
        <button
          type="submit"
          disabled={ playBtn.isDisabled }
          data-testid="btn-play"
        >
          Jogar
        </button>
        <Link to="/settings">
          <button
            type="button"
            data-testid="btn-settings"
          >
            Configurações
          </button>
        </Link>
      </form>
    );
  }
}
