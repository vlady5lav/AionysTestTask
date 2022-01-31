import { Typography } from '@mui/material';
import React, { ReactElement } from 'react';

interface Props {
  error?: string | null;
}

const ErrorMessage = (props: Props): ReactElement => {
  return (
    <Typography maxWidth={620} style={{ color: 'red', fontSize: 14, fontWeight: 700, overflowWrap: 'break-word' }}>
      {props.error ?? null}
    </Typography>
  );
};

export default ErrorMessage;
