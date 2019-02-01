import React from 'react';
import styles from '../css/loading.css';

export const Loading = () => (
  <div className={styles.loading}>
    <div className={styles.loading__loadingAnimation}>
      <span className={styles.loading__loadingAnimation_span}>LOADING</span>
      <div>
        <div className={[styles.loading__loadingAnimation_gearRay, styles.loading__loadingAnimation_gearRay_turnRate_0].join(' ')} />
        <div className={[styles.loading__loadingAnimation_gearRay, styles.loading__loadingAnimation_gearRay_turnRate_45].join(' ')} />
        <div className={[styles.loading__loadingAnimation_gearRay, styles.loading__loadingAnimation_gearRay_turnRate_90].join(' ')} />
        <div className={[styles.loading__loadingAnimation_gearRay, styles.loading__loadingAnimation_gearRay_turnRate_135].join(' ')} />
      </div>
    </div>

  </div>
);
