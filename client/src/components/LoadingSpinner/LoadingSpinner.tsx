import { CircularProgress, Container } from '@mui/material';
import React, { ReactElement } from 'react';

const LoadingSpinner = (): ReactElement => (
  <Container className="centered">
    <span>Loading... </span>
    <CircularProgress role="status" className="centered" />
  </Container>
);

export default LoadingSpinner;
