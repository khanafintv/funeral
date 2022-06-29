import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { token } from '../token.js';
import {
  FETCH_CONTACTS,
  MODAL_OFF,
  UPDATECONTACTS_OFF,
} from '../store/reducers';

import InputMask from 'react-input-mask';
import MaterialInput from '@mui/material/Input';
import phoneFormatter from 'phone-formatter';

export const UpdateContacts = (props) => {
  const dispatch = useDispatch();

  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [patronymic, setPatronymic] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const updateContacts = async () => {
    let response = await fetch(`http://135.181.35.61:2112/contacts/16`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        lastname,
        firstname,
        patronymic,
        phone,
        email,
      }),
    });

    let data = await response.json();
    let tel = phoneFormatter.format(data.phone.slice(1), '+7 (NNN) NNN-NN-NN');
    data = { ...data, phone: tel };
    dispatch({ type: FETCH_CONTACTS, payload: data });
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateContacts();
          dispatch({ type: UPDATECONTACTS_OFF });
          dispatch({ type: MODAL_OFF });
        }}
      >
        <div className="text-field text-field_floating-2">
          <input
            required
            onChange={(e) => setLastname(e.target.value)}
            className="text-field__input"
            id="lastname"
            value={lastname}
          />
          <label className="text-field__label" htmlFor="lastname">
            Фамилия
          </label>
        </div>

        <div className="text-field text-field_floating-2">
          <input
            required
            onChange={(e) => setFirstname(e.target.value)}
            className="text-field__input"
            id="firstname"
            value={firstname}
          />
          <label className="text-field__label" htmlFor="firstname">
            Имя
          </label>
        </div>

        <div className="text-field text-field_floating-2">
          <input
            required
            onChange={(e) => setPatronymic(e.target.value)}
            className="text-field__input"
            id="patronymic"
            value={patronymic}
          />
          <label className="text-field__label" htmlFor="patronymic">
            Отчество
          </label>
        </div>

        <div className="text-field text-field_floating-2">
          <InputMask
            required
            mask="99999999999"
            value={phone}
            className="text-field__input"
            onChange={(e) => setPhone(e.target.value)}
            placeholder="81234567890"
          >
            {(inputProps) => (
              <MaterialInput {...inputProps} type="tel" disableUnderline />
            )}
          </InputMask>

          <label className="text-field__label" htmlFor="phone">
            Телефон
          </label>
        </div>

        <div className="text-field text-field_floating-2">
          <input
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="text-field__input"
            id="email"
            value={email}
          />
          <label className="text-field__label" htmlFor="email">
            E-mail
          </label>
        </div>

        <button type="submit" className="text-field-save">
          Сохранить
        </button>
      </form>
    </>
  );
};
