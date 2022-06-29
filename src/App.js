import { useEffect, useRef, useState } from 'react';
import { Wrapper } from './components/Wrapper';
import { useSelector, useDispatch } from 'react-redux';
import { FETCH_COMPANIE, FETCH_CONTACTS, FETCH_PHOTOS } from './store/reducers';
import { MyModal } from './components/MyModal';
import { UpdateCompanie } from './components/UpdateCompanie';
import { UpdateContacts } from './components/UpdateContacts';
import dateFormat, { masks } from 'dateformat';
import phoneFormatter from 'phone-formatter';
import { DeleteCompanie } from './components/DeleteCompanie';
import { token } from './token.js';

export const App = () => {
  const dispatch = useDispatch();
  const updatename = useSelector((state) => state.reducer.updatename);
  const updateinfo = useSelector((state) => state.reducer.updateinfo);
  const updatecontacts = useSelector((state) => state.reducer.updatecontacts);
  const deletecompanie = useSelector((state) => state.reducer.deletecompanie);

  const fetchCompanie = async () => {
    let response = await fetch('http://135.181.35.61:2112/companies/12', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    let data = await response.json();
    let issue_date = dateFormat(data.contract?.issue_date, 'dd.mm.yyyy');
    data = { ...data, contract: { ...data.contract, issue_date } };

    dispatch({ type: FETCH_COMPANIE, payload: data });
    dispatch({ type: FETCH_PHOTOS, payload: data.photos });
    console.log(data);
  };

  const fetchContacts = async () => {
    let response = await fetch('http://135.181.35.61:2112/contacts/16', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    let data = await response.json();
    let phone = phoneFormatter.format(
      data.phone.slice(1),
      '+7 (NNN) NNN-NN-NN'
    );
    data = { ...data, phone };
    dispatch({ type: FETCH_CONTACTS, payload: data });
  };

  useEffect(() => {
    fetchCompanie();
    fetchContacts();
  }, []);

  return (
    <>
      <Wrapper />
      <MyModal>
        {updatecontacts && <UpdateContacts />}
        {(updatename || updateinfo) && <UpdateCompanie />}
        {deletecompanie && <DeleteCompanie />}
      </MyModal>
    </>
  );
};
