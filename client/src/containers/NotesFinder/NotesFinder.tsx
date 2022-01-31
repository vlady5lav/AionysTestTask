import { Box, Grid, Stack, TextField } from '@mui/material';
import { observer } from 'mobx-react';
import React, { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { ButtonSpinner, ErrorMessage, LoadingSpinner } from '../../components';
import { NoteCard } from '../../components/';
import { IoCTypes, useInjection } from '../../ioc';
import { NotesStore } from '../../stores/components';

const NotesFinder = observer(() => {
  const store = useInjection<NotesStore>(IoCTypes.notesStore);
  const { t } = useTranslation(['notes']);
  const { id } = useParams();

  useEffect(() => {
    const getNote = async () => {
      store.queryString = id ?? '1';
      await store.search();
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
            <h1>{t('title.notesFinder')}</h1>
          </Grid>
          <Grid container justifyContent="center" margin={2}>
            <Stack spacing={2} justifyContent="center" margin={2}>
              <TextField
                name={t('placeholder.id')}
                label={t('placeholder.id')}
                variant="outlined"
                type="number"
                placeholder={t('placeholder.search')}
                value={store.queryString}
                onChange={(ev: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                  store.changeQueryString(ev.target.value);
                }}
              />
              <ButtonSpinner
                isLoading={store.isLoading}
                disabled={!store.queryString}
                onClick={() => {
                  store.search();
                }}
                onChange={() => {}}
                type="button"
                text={t('submit')}
              />
              {!!store.error && <ErrorMessage error={store.error} />}
              {!!store.note && (
                <Grid item margin={2}>
                  <NoteCard note={store.note} />
                </Grid>
              )}
            </Stack>
          </Grid>
        </>
      )}
    </Grid>
  );
});

export default NotesFinder;
