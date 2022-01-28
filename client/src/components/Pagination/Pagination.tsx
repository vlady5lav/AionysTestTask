import { Pagination as MPagination } from '@mui/material';
import React, { ChangeEvent } from 'react';

interface Props {
  totalCount: number;
  currentPage: number;
  onChange: (event: ChangeEvent<unknown>, value: number) => void;
}

const Pagination = ({ totalCount, currentPage, onChange }: Props) => {
  const [page, setPage] = React.useState(1);

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
    onChange(event, value);
  };

  return (
    <>
      <MPagination count={totalCount} page={page} onChange={handleChange} />
    </>
  );
};

export default Pagination;
