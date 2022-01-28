import { Button, CircularProgress } from '@mui/material';
import React, { ReactElement } from 'react';

interface Props {
  isLoading: boolean;
  text?: string;
  disabled?: string | boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick: () => void;
  onChange: () => void;
  variant?: 'text' | 'outlined' | 'contained' | undefined;
}

const ButtonSpinner = ({ isLoading, text, disabled, type, onClick, onChange, variant }: Props): ReactElement => {
  return (
    <Button
      variant={variant ? variant : 'outlined'}
      disabled={!!disabled}
      onClick={() => onClick()}
      onChange={() => onChange()}
      type={type}
    >
      {isLoading ? <CircularProgress /> : `${text}`}
    </Button>
  );
};

export default ButtonSpinner;
