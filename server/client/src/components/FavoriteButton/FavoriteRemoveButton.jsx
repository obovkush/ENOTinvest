import axios from 'axios';
import { useSelector } from 'react-redux';

import { IconButton } from '@mui/material';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';

function FavoriteRemoveButton({ secid }) {
  const user = useSelector((state) => state.user);

  const handleCreateFavorite = (event) => {
    event.stopPropagation();
    console.log('work');
    axios.delete(
      `${process.env.REACT_APP_API_URL}api/favorite/user/${user.id}/stock/${secid}/delete`,
    );
  };

  return (
    <>
      <IconButton
        aria-label="delete"
        title="Удалить из избранного"
        onClick={handleCreateFavorite}
        sx={{ display: 'inline-block' }}
      >
        <BookmarkRemoveIcon />
      </IconButton>
    </>
  );
}

export default FavoriteRemoveButton;
