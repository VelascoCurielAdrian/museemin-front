import React from 'react';
import propTypes from 'prop-types';
import { Typography } from '@mui/material';
import clsx from 'clsx';
// import styles from './styles';

const CustomTypography = ({
  children, className, component, style,
  variant, display, aling
}) => {
  return (
    <Typography
      component={component}
      style={style}
      display={display}
      align={aling}
      variant={variant}
      className={clsx(className)}>
      {children}
    </Typography>
  );
};

CustomTypography.propTypes = {
  /** Children to show  */
  children: propTypes.any,
  /** Flag to show bold font */
  bold: propTypes.bool,
  /** className */
  className: propTypes.string,
  /** component */
  component: propTypes.string,
  /** Styles html */
  style: propTypes.object,
  /** variant */
  variant: propTypes.string,
  /** display */
  display: propTypes.string,
  /** aling */
  aling: propTypes.string,
  /** aling */
  // : propTypes.string,
};

CustomTypography.defaultProps = {
  bold: false,
  className: '',
  component: '',
  style: {},
  variant: 'inherit',
};

export default React.memo(CustomTypography);