import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { IconButton } from '@mui/material';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';

function FavoriteButton({ secid }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const favorite = useSelector((state) => state.favorite);
  const isFavorite = () => {
    return favorite.some((favorite) => favorite.secid === secid);
  };

  useEffect(() => {
    setStatusFavIcon(isFavorite());
  }, [favorite]);

  const [statusFavIcon, setStatusFavIcon] = useState(false);

  // console.log('isFavorite', statusFavIcon);
  // console.log('=================Favorite', favorite);
  // console.log('secid', secid);

  const handleCreateFavorite = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log('work');
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}api/favorite/user/${user.id}/stock/${secid}/create`,
      )
      .then((data) => {
        console.log(data);
        dispatch({ type: 'SET_FAVORITE', payload: data.data });
      });
    setStatusFavIcon(!statusFavIcon);
  };

  const handleRemoveFavorite = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log('work');
    await axios
      .delete(
        `${process.env.REACT_APP_API_URL}api/favorite/user/${user.id}/stock/${secid}/delete`,
      )
      .then(() => dispatch({ type: 'REMOVE_FAVORITE', payload: secid }));
    setStatusFavIcon(!statusFavIcon);
  };

  return (
    <>
      <IconButton
        aria-label="delete"
        title={statusFavIcon ? 'Удалить из избранного' : 'Добавить в избранное'}
        onClick={statusFavIcon ? handleRemoveFavorite : handleCreateFavorite}
        sx={[
          { margin: 0, padding: 0, width: '30px' },
          {
            '&.active, &:hover': {
              color: '#f07800',
            },
          },
        ]}
      >
        {statusFavIcon ? <BookmarkRemoveIcon /> : <BookmarkAddOutlinedIcon />}
      </IconButton>
    </>
  );
}

export default FavoriteButton;
