import React, { ReactElement } from 'react';

interface Props {
  result?: string | null;
}

const ResultMessage = (props: Props): ReactElement => {
  return <p style={{ color: 'green', fontSize: 14, fontWeight: 700 }}>{props.result ?? null}</p>;
};

export default ResultMessage;
