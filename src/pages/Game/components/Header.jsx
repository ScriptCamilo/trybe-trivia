import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      hashToGravatar: '',
    };
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props;
    const userChanged = prevProps.user !== user;
    if (userChanged) {
      this.storeEmailHashToGravatar();
    }
  }

  storeEmailHashToGravatar() {
    const { user } = this.props;

    this.setState({
      hashToGravatar: String(md5(user.email)),
    });
  }

  render() {
    const { hashToGravatar } = this.state;
    const { user } = this.props;
    if (!user) return <h1>Carregando...</h1>;
    return (
      <div>
        <img
          src={ `https://www.gravatar.com/avatar/${hashToGravatar}` }
          alt={ user.name }
          data-testid="header-profile-picture"
        />
        <strong data-testid="header-player-name">{user.name}</strong>
        <span>
          Pontos:
          <span data-testid="header-score">0</span>
        </span>
      </div>
    );
  }
}

const mapStateToProps = ({ settings: { user } }) => ({
  user,
});

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    name: PropTypes.string,
  }),
}.isRequired;

export default connect(mapStateToProps)(Header);
