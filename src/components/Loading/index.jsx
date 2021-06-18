import React from 'react';
import { VscLoading } from 'react-icons/vsc';
import styles from './styles.module.css';

function Loading() {
  return (
    <div className={ styles.loading }>
      <VscLoading />
    </div>
  );
}
export default Loading;
