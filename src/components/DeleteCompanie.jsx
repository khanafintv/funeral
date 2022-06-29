import {
  DELETECOMPANIE_OFF,
  FETCH_COMPANIE,
  FETCH_PHOTOS,
  MODAL_OFF,
} from '../store/reducers';
import { useDispatch } from 'react-redux';
import { token } from '../token.js';

export const DeleteCompanie = () => {
  const dispatch = useDispatch();

  const deleteCompanie = async () => {
    let response = await fetch('http://135.181.35.61:2112/companies/12', {
      method: 'DELETE',
      headers: {
        //'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: MODAL_OFF });
    dispatch({ type: FETCH_COMPANIE, payload: {} });
    dispatch({ type: FETCH_PHOTOS, payload: [] });
    dispatch({ type: DELETECOMPANIE_OFF });

    console.log(response);
  };
  return (
    <div className="content-modal-delete">
      <h2>Удалить карточку</h2>
      <p>Отправить карточку организации в архив?</p>
      <div className="modal-delete-actions">
        <div
          onClick={() => {
            dispatch({ type: MODAL_OFF });
            dispatch({ type: DELETECOMPANIE_OFF });
          }}
          className="modal-delete-cancel"
        >
          Отмена
        </div>
        <div onClick={deleteCompanie} className="modal-delete-del">
          Удалить
        </div>
      </div>
    </div>
  );
};
