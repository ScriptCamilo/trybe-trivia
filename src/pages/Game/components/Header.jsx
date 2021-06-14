import React from 'react';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      hashToGravatar: '',
    };
  }

  componentDidMount() {
    this.storeEmailHashToGravatar();
  }

  storeEmailHashToGravatar() {
    const email = '';

    this.setState({
      hashToGravatar: String(md5(email)),
    });
  }

  render() {
    const { hashToGravatar } = this.state;
    return (
      <div>
        <img
          src={ `https://www.gravatar.com/avatar/${hashToGravatar}` }
          alt="Nome"
          data-testid="header-profile-picture"
        />
        <strong data-testid="header-player-name">Nome</strong>
        <span>
          Pontos:
          <span data-testid="header-score">0</span>
        </span>
      </div>
    );
  }
}

export default Header;
