import { Grid } from '@mui/material';
import { CreateNoteCard, Pagination } from 'components';
import { observer } from 'mobx-react';
import React, { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { LoadingSpinner, NoteCard } from '../../components';
import { IoCTypes, useInjection } from '../../ioc';
import { NotesStore } from '../../stores';

const NotesPaginated = observer(() => {
  const store = useInjection<NotesStore>(IoCTypes.notesStore);
  const { t } = useTranslation(['notes']);
  const navigate = useNavigate();

  useEffect(() => {
    const getNotes = () => {
      store.getPaginated(0);
    };
    getNotes();
  }, [store, store.currentPage]);

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
      <Grid container justifyContent="center" mt={4}>
        <Pagination
          totalCount={store.totalPages}
          currentPage={store.currentPage}
          onChange={(event: ChangeEvent<unknown>, value: number) => {
            store.changePage(value);
            {
              value != 1
                ? navigate(`/notes/paginated?_page=${value}`, { replace: true })
                : navigate(`/notes/paginated`, { replace: true });
            }
          }}
        />
      </Grid>
    </Grid>
  );
});

export default NotesPaginated;
