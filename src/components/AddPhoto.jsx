import { useRef } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { FETCH_PHOTOS } from '../store/reducers';
import { token } from '../token.js';

export const AddPhoto = ({ children }) => {
  const dispatch = useDispatch();
  const photos = useSelector((state) => state.reducer.photos);

  const fileInput = useRef();

  const addPhoto = async () => {
    const formData = new FormData();
    let file = fileInput.current.files[0];
    formData.append('file', file, file.name);

    let response = await fetch(
      'http://135.181.35.61:2112/companies/12/image?file=FILE',
      {
        method: 'POST',
        headers: {
          //'Content-Type': 'application/json',
          //'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );
    let data = await response.json();
    let result = [...photos, data];
    dispatch({ type: FETCH_PHOTOS, payload: result });
    console.log(data);
  };

  return (
    <div onClick={() => fileInput.current.click()}>
      <input
        style={{ display: 'none' }}
        onChange={addPhoto}
        ref={fileInput}
        type="file"
        accept="image/*"
      />
      {children}
    </div>
  );
};
