import axios from 'axios';
import { useSelector } from 'react-redux';

import { IconButton } from '@mui/material';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';

function FavoriteAddButton({ secid }) {
  const user = useSelector((state) => state.user);

  const handleCreateFavorite = (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log('work');
    axios.post(
      `${process.env.REACT_APP_API_URL}api/favorite/user/${user.id}/stock/${secid}/create`,
    );
  };

  return (
    <>
      <IconButton
        aria-label="delete"
        title="Добавить в избранное"
        onClick={handleCreateFavorite}
        sx={{ margin: '0', padding: '0' }}
      >
        <BookmarkAddOutlinedIcon />
      </IconButton>
    </>
  );
}

export default FavoriteAddButton;
