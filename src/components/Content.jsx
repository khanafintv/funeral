import { useSelector, useDispatch } from 'react-redux';
import dateFormat, { masks } from 'dateformat';
import { AddPhoto } from './AddPhoto';
import { RemovePhoto } from './RemovePhoto';

import {
  DELETECOMPANIE_ON,
  MODAL_ON,
  UPDATECONTACTS_ON,
  UPDATEINFO_ON,
  UPDATENAME_ON,
} from '../store/reducers';

export const Content = () => {
  const dispatch = useDispatch();
  const companie = useSelector((state) => state.reducer.companie);
  const contacts = useSelector((state) => state.reducer.contacts);
  const photos = useSelector((state) => state.reducer.photos);
  //let date = dateFormat(companie.contract?.issue_date, 'dd.mm.yyyy');

  return (
    <div className="content">
      <header className="top">
        <div className="back">
          <div className="arrow-left"></div>
          <div className="top__text">К списку юридических лиц</div>
        </div>
        <div className="icons-top-right">
          <div className="icon-link"></div>
          <div className="icon-rotate"></div>

          <div
            className="icon-delete-companie"
            onClick={() => {
              dispatch({ type: DELETECOMPANIE_ON });
              dispatch({ type: MODAL_ON });
            }}
          ></div>
        </div>
      </header>
      <section className="main-content center">
        <div className="main-content__title">
          <h1>{companie.shortName}</h1>
          <div
            onClick={async () => {
              dispatch({ type: MODAL_ON });
              dispatch({ type: UPDATENAME_ON });
            }}
            className="edit"
          ></div>
        </div>
        <div className="main-content__subtitle general-info">
          <h2>Общая информация</h2>
          <div
            onClick={async () => {
              dispatch({ type: MODAL_ON });
              dispatch({ type: UPDATEINFO_ON });
            }}
            className="edit"
          ></div>
        </div>
        <div className="info-companie">
          <ul className="info-companie__list-left">
            <li className="info-companie__item">Полное название:</li>
            <li className="info-companie__item">Договор:</li>
            <li className="info-companie__item">Форма:</li>
            <li className="info-companie__item">Тип:</li>
          </ul>
          <ul className="info-companie__list-right">
            <li className="info-companie__item">{companie.name}</li>
            <li className="info-companie__item">
              {companie.contract?.no} от {companie.contract?.issue_date}
            </li>
            <li className="info-companie__item">{companie.businessEntity}</li>
            <li className="info-companie__item">
              {companie.type?.map((i) =>
                i === 'agent' ? ' Агент ' : ' Подрядчик '
              )}
            </li>
          </ul>
        </div>
        <div className="main-content__subtitle">
          <h2>Контакные данные</h2>
          <div
            onClick={async () => {
              dispatch({ type: MODAL_ON });
              dispatch({ type: UPDATECONTACTS_ON });
            }}
            className="edit"
          ></div>
        </div>
        <div className="info-companie">
          <ul className="info-companie__list-left">
            <li className="info-companie__item">ФИО:</li>
            <li className="info-companie__item">Телефон:</li>
            <li className="info-companie__item">Эл. почта:</li>
          </ul>
          <ul className="info-companie__list-right">
            <li className="info-companie__item">
              {contacts.lastname} {contacts.firstname} {contacts.patronymic}
            </li>
            <li className="info-companie__item">{contacts.phone}</li>
            <li className="info-companie__item email">{contacts.email}</li>
          </ul>
        </div>
        <div className="main-content__subtitle">
          <h2>Приложенные фото</h2>
        </div>
        <div className="photos">
          <div className="photos__wrapper">
            {photos.map((i) => (
              <div key={i.name} className="photos__card">
                <img src={i.thumbpath} alt={i.name} />
                <div className="photo-name">{i.name}</div>
                <div className="photo-date">{'11 июня 2018'}</div>
                <RemovePhoto imageName={i.name} />
              </div>
            ))}
          </div>
          <AddPhoto>
            <div className="add-photo-btn">
              <div className="add-photo-btn__img"></div>
              <div className="add-photo-btn__text">Добавить изображение</div>
            </div>
          </AddPhoto>
        </div>
      </section>
    </div>
  );
};
