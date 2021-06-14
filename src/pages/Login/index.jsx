import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { tokenResponseAPI } from '../../actions/tokenAction';

class Login extends Component {
  constructor(props) {
    super(props);

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
    this.goToGamePage = this.goToGamePage(this);
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

  async goToGamePage() {
    const { token } = this.props;
    await token();
    const { history: { push } } = this.props;
    push('/game');
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
          onClick={ () => this.goToGamePage }
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

const mapDispatchToProps = (dispatch) => ({
  token: (response) => dispatch(tokenResponseAPI(response)),
});

Login.propTypes = {
  token: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }) }.isRequired;

export default connect(null, mapDispatchToProps)(Login);
