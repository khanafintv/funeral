const initialState = {
  companie: {},
  contacts: {},
  photos: [],
  modal: false,
  updatename: false,
  updateinfo: false,
  updatecontacts: false,
  deletecompanie: false,
};

export const FETCH_COMPANIE = 'FETCH_COMPANIE';
export const FETCH_CONTACTS = 'FETCH_CONTACTS';
export const FETCH_PHOTOS = 'FETCH_PHOTOS';

export const MODAL_ON = 'MODAL_ON';
export const MODAL_OFF = 'MODAL_OFF';

export const UPDATENAME_ON = 'UPDATENAME_ON';
export const UPDATENAME_OFF = 'UPDATENAME_OFF';

export const UPDATEINFO_ON = 'UPDATEINFO_ON';
export const UPDATEINFO_OFF = 'UPDATEINFO_OFF';

export const UPDATECONTACTS_ON = 'UPDATECONTACTS_ON';
export const UPDATECONTACTS_OFF = 'UPDATECONTACTS_OFF';

export const DELETECOMPANIE_ON = 'DELETECOMPANIE_ON';
export const DELETECOMPANIE_OFF = 'DELETECOMPANIE_OFF';

export const companieReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMPANIE:
      return { ...state, companie: action.payload };

    case FETCH_CONTACTS:
      return { ...state, contacts: action.payload };

    case FETCH_PHOTOS:
      return { ...state, photos: action.payload };

    case MODAL_ON:
      return { ...state, modal: true };

    case MODAL_OFF:
      return { ...state, modal: false };

    case UPDATENAME_ON:
      return { ...state, updatename: true };

    case UPDATENAME_OFF:
      return { ...state, updatename: false };

    case UPDATEINFO_ON:
      return { ...state, updateinfo: true };

    case UPDATEINFO_OFF:
      return { ...state, updateinfo: false };

    case UPDATECONTACTS_ON:
      return { ...state, updatecontacts: true };

    case UPDATECONTACTS_OFF:
      return { ...state, updatecontacts: false };

    case DELETECOMPANIE_ON:
      return { ...state, deletecompanie: true };

    case DELETECOMPANIE_OFF:
      return { ...state, deletecompanie: false };

    default:
      return state;
  }
};
