import { Grid } from '@mui/material';
import { CreateNoteCard } from 'components';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LoadingSpinner, NoteCard } from '../../components';
import { IoCTypes, useInjection } from '../../ioc';
import { NotesStore } from '../../stores';

const Notes = observer(() => {
  const store = useInjection<NotesStore>(IoCTypes.notesStore);
  const { t } = useTranslation(['notes']);

  useEffect(() => {
    const getNotes = () => {
      store.getAll();
    };
    getNotes();
  }, [store]);

  return (
    <Grid container justifyContent="center" margin={2} padding={2}>
      {store.isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Grid key={Math.random() * 12345} container justifyContent="center" margin={2} padding={2}>
            <h1>{t('title.notes')}</h1>
          </Grid>
          <Grid key={Math.random() * 12345} container justifyContent="center" margin={2} padding={2}>
            <Grid key={Math.random() * 12345} item margin={2} padding={2}>
              <CreateNoteCard />
            </Grid>
            {store.notes?.map((note, key) => (
              <Grid key={key} item margin={2} padding={2}>
                <NoteCard note={{ ...note }} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Grid>
  );
});

export default Notes;
