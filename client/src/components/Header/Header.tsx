import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import DescriptionIcon from '@mui/icons-material/Description';
import SearchIcon from '@mui/icons-material/Search';
import { AppBar, Badge, Button, Container, Stack, Toolbar, Typography } from '@mui/material';
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
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography>AIONYS NOTES</Typography>
          <Stack direction="row" spacing={2}>
            <Badge badgeContent={store.count}>
              <Button
                color="secondary"
                onClick={() => navigate('/notes')}
                endIcon={<DescriptionIcon />}
                variant="contained"
              >
                {t('notes')}
              </Button>
            </Badge>
            <Button
              color="secondary"
              onClick={() => navigate('/notes/paginated')}
              endIcon={<AutoStoriesIcon />}
              variant="contained"
            >
              {t('paginatedNotes')}
            </Button>
            <Button
              color="secondary"
              onClick={() => navigate('/notes/finder')}
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
