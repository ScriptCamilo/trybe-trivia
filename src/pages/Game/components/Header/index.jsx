import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

import styles from './styles.module.css';

function Header({ user, totalScore }) {
  const hash = String(md5(user.email));

  return (
    <div className={ styles.header }>
      <span className={ styles.user }>
        <img
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt={ user.name }
          data-testid="header-profile-picture"
        />
        <strong data-testid="header-player-name">{user.name}</strong>
      </span>
      <span className={ styles.score }>
        Pontos:
        <span data-testid="header-score">{totalScore}</span>
      </span>
    </div>
  );
}

const mapStateToProps = ({ settings: { user }, game: { totalScore } }) => ({
  user,
  totalScore,
});

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    name: PropTypes.string,
  }),
  totalScore: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Header);
