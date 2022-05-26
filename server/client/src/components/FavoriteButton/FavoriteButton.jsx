import { IconButton } from '@mui/material';
import { DeleteIcon } from '@mui/icons-material';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';

function FavoriteButton() {
  const handleClick = (event) => {
    event.stopPropagation();
  };

  return (
    <>
      <IconButton
        aria-label="delete"
        onClick={handleClick}
        sx={{ display: 'inline-block' }}
      >
        <BookmarkAddOutlinedIcon />
      </IconButton>
    </>
  );
}

export default FavoriteButton;
