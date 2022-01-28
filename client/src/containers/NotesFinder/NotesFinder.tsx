import { Grid, Stack, TextField } from '@mui/material';
import { observer } from 'mobx-react';
import React, { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { ButtonSpinner, ErrorMessage, LoadingSpinner } from '../../components';
import { NoteCard } from '../../components/';
import { IoCTypes, useInjection } from '../../ioc';
import { NotesStore } from '../../stores/components';

const NotesFinder = observer(() => {
  const navigate = useNavigate();
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
      <Grid>
        {store.isLoading ? (
          <LoadingSpinner />
        ) : (
          <Grid>
            <Grid item textAlign="center">
              <h1>{t('title.notesFinder')}</h1>
            </Grid>
            <Grid item justifyContent="center">
              <Stack spacing={2}>
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
                  <Grid item>
                    <NoteCard note={store.note} />
                  </Grid>
                )}
              </Stack>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
});

export default NotesFinder;
