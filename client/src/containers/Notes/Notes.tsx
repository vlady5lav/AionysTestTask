import { Box, Grid } from '@mui/material';
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
    const getNotes = async () => {
      await store.getAll();
    };
    getNotes();
  }, [store, store.count]);

  return (
    <Grid container justifyContent="center">
      {store.isLoading ? (
        <Box className="absoluteCentered">
          <LoadingSpinner />
        </Box>
      ) : (
        <>
          <Grid key={Math.random() * 12345} container justifyContent="center" margin={2} mt={6}>
            <h1>{t('title.notes')}</h1>
          </Grid>
          <Grid key={Math.random() * 12345} container justifyContent="center" margin={2}>
            {store.count! > 0
              ? store.notes?.map((note, key) => (
                  <Grid key={key} item margin={2}>
                    <NoteCard note={{ ...note }} />
                  </Grid>
                ))
              : null}
          </Grid>
        </>
      )}
    </Grid>
  );
});

export default Notes;
