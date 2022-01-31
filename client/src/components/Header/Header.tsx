import AddCircleIcon from '@mui/icons-material/AddCircle';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import DescriptionIcon from '@mui/icons-material/Description';
import SearchIcon from '@mui/icons-material/Search';
import { AppBar, Badge, Button, Container, Stack, Toolbar } from '@mui/material';
import LanguageChangerButton from 'components/LanguageChangerButton';
import { IoCTypes, useInjection } from 'ioc';
import { observer } from 'mobx-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { NotesStore } from 'stores';

const Header = observer(() => {
  const navigate = useNavigate();
  const store = useInjection<NotesStore>(IoCTypes.notesStore);
  const { t } = useTranslation(['header']);

  return (
    <AppBar position="static">
      <Container>
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={6}>
            <Button
              className="createNoteButton"
              color="success"
              onClick={() => navigate('/notes/create', { replace: true })}
              startIcon={<AddCircleIcon />}
              variant="contained"
            >
              {t('create')}
            </Button>
            <Badge color="secondary" badgeContent={store.count}>
              <Button
                className="allNotesButton"
                color="warning"
                onClick={() => navigate('/notes')}
                endIcon={<DescriptionIcon />}
                variant="contained"
              >
                {t('notes')}
              </Button>
            </Badge>
            <Button
              className="paginatedNotesButton"
              color="secondary"
              onClick={() => navigate('/notes/paginated', { replace: true })}
              endIcon={<AutoStoriesIcon />}
              variant="contained"
            >
              {t('paginatedNotes')}
            </Button>
            <Button
              className="notesFinderButton"
              color="error"
              onClick={() => navigate('/notes/finder', { replace: true })}
              endIcon={<SearchIcon />}
              variant="contained"
            >
              {t('notesFinder')}
            </Button>
            <LanguageChangerButton />
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
});

export default Header;
