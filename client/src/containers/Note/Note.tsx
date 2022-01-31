import { Box, Grid } from '@mui/material';
import { NoteCard } from 'components';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import { IoCTypes, useInjection } from '../../ioc';
import { NotesStore } from '../../stores';

const Note = observer(() => {
  const store = useInjection<NotesStore>(IoCTypes.notesStore);
  const navigate = useNavigate();
  const { t } = useTranslation(['notes']);
  const { id } = useParams();

  useEffect(() => {
    const getNote = async () => {
      const result = await store.getById(Number(id));
      if (result === undefined) {
        navigate(`/notes/`, { replace: true });
      }
    };
    getNote();
  }, [store, id]);

  return (
    <Grid container justifyContent="center">
      {store.isLoading ? (
        <Box className="absoluteCentered">
          <LoadingSpinner />
        </Box>
      ) : (
        <>
          <Grid key={Math.random() * 12345} container justifyContent="center" margin={2} mt={6}>
            <h1>
              {t('title.note')} {id}
            </h1>
          </Grid>
          <Grid key={Math.random() * 12345} container justifyContent="center" margin={2}>
            <Grid item margin={2}>
              <NoteCard note={store.note} />
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
});

export default Note;
