import { Box } from '@mui/material';
import NotesFinder from 'containers/NotesFinder';
import NotesPaginated from 'containers/NotesPaginated';
import { observer } from 'mobx-react';
import React, { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { Layout } from '../containers';
import '../locales/config';

const Notes = React.lazy(() => import('../containers/Notes'));
const Note = React.lazy(() => import('../containers/Note'));
const CreateNote = React.lazy(() => import('../containers/CreateNote'));
const EditNote = React.lazy(() => import('../containers/EditNote'));

const AppRoutes = observer(() => {
  return (
    <Suspense
      fallback={
        <Box className="absoluteCentered">
          <LoadingSpinner />
        </Box>
      }
    >
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navigate replace to="/notes" />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate replace to="/notes" />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/notes/:id" element={<Note />} />
            <Route path="/notes/create" element={<CreateNote />} />
            <Route path="/notes/edit/:id" element={<EditNote />} />
            <Route path="/notes/paginated" element={<NotesPaginated />} />
            <Route path="/notes/finder" element={<NotesFinder />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
});

export default AppRoutes;
