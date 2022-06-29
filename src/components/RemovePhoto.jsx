import { useSelector, useDispatch } from 'react-redux';
import { FETCH_PHOTOS } from '../store/reducers';
import { token } from '../token.js';

export const RemovePhoto = ({ imageName }) => {
  const dispatch = useDispatch();
  const photos = useSelector((state) => state.reducer.photos);

  const removePhoto = async () => {
    let response = await fetch(
      `http://135.181.35.61:2112/companies/12/image/${imageName}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    let result = photos.filter((i) => imageName !== i.name);
    dispatch({ type: FETCH_PHOTOS, payload: result });
    console.log(response);
  };

  return <div onClick={removePhoto} className="photo-delete-btn"></div>;
};
