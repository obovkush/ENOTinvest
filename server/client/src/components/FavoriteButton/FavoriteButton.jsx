import axios from 'axios';
import { useSelector } from 'react-redux';

import { IconButton } from '@mui/material';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';

function FavoriteButton() {
  const user = useSelector((state) => state.user);
  const stocks = useSelector((state) => state.stocks);

  const handleCreateFavorite = (event) => {
    event.stopPropagation();
    console.log('work');
    axios.post(
      `${process.env.REACT_APP_API_URL}api/favorite/user/${user.id}/stock/${stocks[5].secid}/create`,
    );
  };

  return (
    <>
      <IconButton
        aria-label="delete"
        onClick={handleCreateFavorite}
        sx={{ display: 'inline-block' }}
      >
        <BookmarkAddOutlinedIcon />
      </IconButton>
    </>
  );
}

export default FavoriteButton;
