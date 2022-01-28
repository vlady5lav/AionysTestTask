/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button, Card } from '@mui/material';
import { observer } from 'mobx-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoCTypes, useInjection } from '../../ioc';
import { NoteStore } from '../../stores';

export const CreateNoteCard = observer(() => {
  const navigate = useNavigate();
  const store = useInjection<NoteStore>(IoCTypes.noteStore);

  return (
    <Card className="createNoteCard" sx={{ width: 310, height: 180, display: 'grid', justifyContent: 'center' }}>
      <Button className="createNoteButton" onClick={() => navigate(`/notes/create`, { replace: true })}>
        <AddCircleIcon sx={{ width: 100, height: 100 }} />
      </Button>
    </Card>
  );
});

export default CreateNoteCard;
