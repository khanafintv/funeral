import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { token } from '../token.js';
import {
  FETCH_COMPANIE,
  MODAL_OFF,
  UPDATEINFO_OFF,
  UPDATENAME_OFF,
} from '../store/reducers';

import { Select } from 'antd';
const { Option } = Select;

export const UpdateCompanie = () => {
  const dispatch = useDispatch();
  const companie = useSelector((state) => state.reducer.companie);
  const updatename = useSelector((state) => state.reducer.updatename);
  const updateinfo = useSelector((state) => state.reducer.updateinfo);

  const [name, setName] = useState('');
  const [shortName, setShortName] = useState('');
  const [businessEntity, setBusinessEntity] = useState('');
  const [no, setNo] = useState('');
  const [type, setType] = useState([]);

  let body = {};

  if (updatename) {
    body = JSON.stringify({
      name: companie.name,
      shortName,
      businessEntity: companie.businessEntity,
      contract: {
        no: companie.contract?.no,
      },
      type: companie.type,
    });
  }

  if (updateinfo) {
    body = JSON.stringify({
      name,
      shortName: companie.shortName,
      businessEntity,
      contract: {
        no,
      },
      type,
    });
  }

  const updateCompanie = async () => {
    let response = await fetch(`http://135.181.35.61:2112/companies/12`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body,
    });

    let data = await response.json();
    dispatch({ type: FETCH_COMPANIE, payload: data });
  };

  const handleChange = (value) => {
    let res = [];
    if (value) {
      res.push(value);
    } else {
      res = ['agent', 'contractor'];
    }
    setType(res);
    //console.log(`${value}`);
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateCompanie();
          dispatch({ type: UPDATENAME_OFF });
          dispatch({ type: UPDATEINFO_OFF });
          dispatch({ type: MODAL_OFF });
        }}
      >
        {updatename && (
          <>
            <div className="text-field text-field_floating-2">
              <input
                required
                onChange={(e) => setShortName(e.target.value)}
                className="text-field__input"
                id="shortName"
                value={shortName}
              />

              <label className="text-field__label" htmlFor="shortName">
                Сокращенное название
              </label>
            </div>
          </>
        )}

        {updateinfo && (
          <>
            <div className="text-field text-field_floating-2">
              <input
                required
                onChange={(e) => setName(e.target.value)}
                className="text-field__input"
                id="name"
                value={name}
              />
              <label className="text-field__label" htmlFor="name">
                Полное название
              </label>
            </div>

            <div className="text-field text-field_floating-2">
              <input
                required
                onChange={(e) => setBusinessEntity(e.target.value)}
                className="text-field__input"
                id="businessEntity"
                value={businessEntity}
              />

              <label className="text-field__label" htmlFor="businessEntitye">
                Форма
              </label>
            </div>
            <div className="text-field text-field_floating-2">
              <input
                required
                onChange={(e) => setNo(e.target.value)}
                className="text-field__input"
                id="no"
                value={no}
              />

              <label className="text-field__label" htmlFor="no">
                Номер договора
              </label>
            </div>

            <Select
              // required
              // defaultValue="Тип"
              style={{ width: '100%', marginBottom: 16 }}
              size="large"
              onChange={handleChange}
            >
              <Option value="agent">Агент</Option>
              <Option value="contractor">Подрядчик</Option>
              <Option value="">Агент, Подрядчик</Option>
            </Select>
          </>
        )}

        <button type="submit" className="text-field-save">
          Сохранить
        </button>
      </form>
    </>
  );
};
