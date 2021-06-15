import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

function Header({ user }) {
  const hash = String(md5(user.email));

  return (
    <div>
      <img
        src={ `https://www.gravatar.com/avatar/${hash}` }
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
