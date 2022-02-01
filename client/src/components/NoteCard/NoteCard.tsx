/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Avatar,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  TextField,
} from '@mui/material';
import i18n from 'locales/config';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { NoteType } from '../../enums';
import { IoCTypes, useInjection } from '../../ioc';
import { Note } from '../../models';
import { NoteStore } from '../../stores';

interface Props {
  note: Note | null;
}

export const NoteCard = observer((props: Props) => {
  const navigate = useNavigate();
  const store = useInjection<NoteStore>(IoCTypes.noteStore);
  const { t } = useTranslation(['notes']);
  const [expanded, setExpanded] = useState<boolean>(false);

  if (!props.note) {
    return null;
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const { id, createdAt, updatedAt, title, typeId, description, pictureUrl } = props.note;

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  let lng = i18n.language === 'en' ? 'en-US' : 'ru-RU';
  let updated = updatedAt ? new Date(updatedAt).toLocaleString(`${lng}`, dateOptions) : undefined;
  let type = NoteType[typeId ?? 0].toLowerCase();

  return (
    <Card className="noteCard" sx={{ width: 350, maxWidth: 350, padding: 1.5 }}>
      <CardHeader
        sx={{ height: 50, maxHeight: 50, padding: 1.5 }}
        avatar={<Avatar className="inverted" src={`${pictureUrl}`} />}
        action={
          <IconButton className="goToNoteButton" onClick={() => navigate(`/notes/${id}`, { replace: true })}>
            <MoreVertIcon />
          </IconButton>
        }
        title={updated}
        subheader={t(`type.${type}`)}
      />
      <CardContent sx={{ height: 120, maxHeight: 120, padding: 1.5 }}>
        <TextField
          InputProps={{
            readOnly: true,
          }}
          fullWidth
          id="outlined-multiline-static"
          label={t(`properties.title`)}
          multiline
          rows={3}
          value={title}
        />
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', height: 50, maxHeight: 50, padding: 1.5 }}>
        <ButtonGroup>
          <Button
            className="deleteNoteButton"
            onClick={() => {
              store.delete(id);
              navigate('/notes'), { replace: true };
            }}
          >
            <DeleteIcon />
          </Button>
          <Button
            className="editNoteButton"
            onClick={() => {
              navigate(`/notes/edit/${id}`), { replace: true };
            }}
          >
            <EditIcon />
          </Button>
        </ButtonGroup>
        <Button
          className="expandNoteButton"
          sx={{ transform: !expanded ? 'rotate(0deg)' : 'rotate(180deg)' }}
          onClick={handleExpandClick}
        >
          <ExpandMoreIcon />
        </Button>
      </CardActions>
      <Collapse in={expanded} unmountOnExit>
        <CardContent>
          <TextField
            InputProps={{
              readOnly: true,
            }}
            fullWidth
            id="outlined-multiline-static"
            label={t(`properties.description`)}
            multiline
            rows={10}
            value={description}
          />
        </CardContent>
      </Collapse>
    </Card>
  );
});

export default NoteCard;
