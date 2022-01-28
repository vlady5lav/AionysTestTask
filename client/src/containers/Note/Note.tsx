import { Grid } from '@mui/material';
import { NoteCard } from 'components';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import { IoCTypes, useInjection } from '../../ioc';
import { NotesStore } from '../../stores';

const Note = observer(() => {
  const store = useInjection<NotesStore>(IoCTypes.notesStore);
  const { t } = useTranslation(['notes']);
  const { id } = useParams();

  useEffect(() => {
    const getNote = async () => {
      store.getById(Number(id));
    };
    getNote();
  }, [store, id]);

  return (
    <Grid container spacing={4} justifyContent="center" mt={4}>
      {store.isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Grid container justifyContent="center">
            <h1>
              {t('title.note')} {id}
            </h1>
          </Grid>
          <Grid className="noteCardGrid" item>
            <NoteCard note={store.note} />
          </Grid>
        </>
      )}
    </Grid>
  );
});

export default Note;
