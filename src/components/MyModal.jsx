import { Button, Modal } from 'antd';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  DELETECOMPANIE_OFF,
  MODAL_OFF,
  UPDATECONTACTS_OFF,
  UPDATEINFO_OFF,
  UPDATENAME_OFF,
} from '../store/reducers';

export const MyModal = ({ children }) => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.reducer.modal);
  const deletecompanie = useSelector((state) => state.reducer.deletecompanie);

  const handleOk = () => {
    dispatch({ type: MODAL_OFF });
    dispatch({ type: UPDATENAME_OFF });
    dispatch({ type: UPDATEINFO_OFF });
    dispatch({ type: UPDATECONTACTS_OFF });
    dispatch({ type: DELETECOMPANIE_OFF });
  };

  const handleCancel = () => {
    dispatch({ type: MODAL_OFF });
    dispatch({ type: UPDATENAME_OFF });
    dispatch({ type: UPDATEINFO_OFF });
    dispatch({ type: UPDATECONTACTS_OFF });
    dispatch({ type: DELETECOMPANIE_OFF });
  };

  return (
    <>
      <Modal
        width={448}
        className={deletecompanie ? 'modal-delete' : ''}
        title={deletecompanie ? null : 'Обновление информации'}
        closable={deletecompanie ? false : true}
        visible={modal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {children}
      </Modal>
    </>
  );
};
