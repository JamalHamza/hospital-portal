import React from 'react';
import styles from './Card.module.scss';

function Card({ children, cardclass }) {
  return <div className={`${styles.card} ${cardclass}`}>{children}</div>;
}

export default Card;
