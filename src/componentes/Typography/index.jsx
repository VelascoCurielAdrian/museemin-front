import React from 'react';
import propTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import clsx from 'clsx';
import styles from './styles';

const CustomTypography = ({
  children, bold, className, component, style,
  variant, display, aling
}) => {
  const classes = styles();
  return (
    <Typography
      component={component}
      style={style}
      display={display}
      align={aling}
      variant={variant}
      className={clsx(className, classes.root, {
        [classes.bold]: bold,
      })}>
      {children}
    </Typography>
  );
};

CustomTypography.propTypes = {
  /** Children to show  */
  children: propTypes.any.isRequired,
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