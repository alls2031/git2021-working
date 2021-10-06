import contactReducer, {
  addContact,
  initialContact,
  modifyContact,
  removeContact,
} from "./contactSlice";
import { createAction, PayloadAction } from "@reduxjs/toolkit";
import { ContactItem } from "./contactSlice";
import { call, put, takeEvery, takeLatest } from "@redux-saga/core/effects";
import api, { ContactItemRequest, ContactItemResponse,} from "./contactApi";
import { AxiosResponse } from "axios";

export const requestAddContact = createAction<ContactItem>(
  `${contactReducer.name}/requestAddContact`
);

export const requestFetchContact = createAction(
  `${contactReducer.name}/requestFetchContact`
);

export const requestRemoveContact = createAction<number>(
  `${contactReducer.name}/requestRemoveContact`
);

export const requestModifyContact = createAction<ContactItem>(
  `${contactReducer.name}/requestModifyContact`
);


function* addData(action: PayloadAction<ContactItem>) {
  yield console.log("--addData--");
  const contactItemPayload = action.payload;

  const contactItemRequest: ContactItemRequest = {
    name: contactItemPayload.name,
    phone: contactItemPayload.phone,
    email: contactItemPayload.email,
  };

  const result: AxiosResponse<ContactItemResponse> = yield call(
    api.add,
    contactItemRequest

  );

  const contactItem: ContactItem = {
    id: result.data.id,
    name: result.data.name,
    phone: result.data.phone,
    email: result.data.email,
    createdTime: result.data.createdTime,
  };

  yield put(addContact(contactItem));
}

function* fetchData() {
  yield console.log("--addFetch--");
  const result: AxiosResponse<ContactItemResponse[]> = yield call(api.fetch);
  const contactItem = result.data.map(
    (item) =>
      ({
        id: item.id,
        name: item.name,
        phone: item.phone,
        email: item.email,
        createdTime: new Date(item.createdTime).toLocaleTimeString(),
      } as ContactItem)
  );

  yield put(initialContact(contactItem));
}

function* removeData(action: PayloadAction<number>) {
  yield console.log("---remove---");
  yield call(api.remove, action.payload);
  const id: number = action.payload;
  yield put(removeContact(id));
}

function* modifyData(action: PayloadAction<ContactItem>) {
  yield console.log("---modify---");

  const contactItemPayload = action.payload;

  const contactItemRequest: ContactItemRequest = {
    name: contactItemPayload.name,
    phone: contactItemPayload.phone,
    email: contactItemPayload.email,
  };

  const result: AxiosResponse<ContactItemResponse> = yield call(
    api.modify,
    action.payload.id,
    contactItemRequest
  );

  const contactItem: ContactItem = {
    id: result.data.id,
    name: result.data.name,
    phone: result.data.phone,
    email: result.data.email,
    createdTime: new Date(result.data.createdTime).toLocaleTimeString(),
  };

  yield put(modifyContact(contactItem));
}

export default function* contactSaga() {
  yield takeEvery(requestAddContact, addData);
  yield takeLatest(requestFetchContact, fetchData);
  yield takeEvery(requestRemoveContact, removeData);
  yield takeEvery(requestModifyContact, modifyData);
}