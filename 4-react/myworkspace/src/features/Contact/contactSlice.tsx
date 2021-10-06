import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface ContactItem {
  id: number;
  name: string | undefined;
  phone: string | undefined;
  email: string | undefined;
  createdTime: number | string;
  isEdit?: boolean;
}

interface contactState {
  data: ContactItem[]; 
  isFetched: boolean; 
}


const initialState: contactState = {
  data: [
    {
      id: 2,
      name: "Hong",
      phone: "010-1234-1234",
      email: "hong@gmail.com",
      createdTime: new Date().getTime(),
    },
    {
      id: 1,
      name: "Kim",
      phone: "010-1234-1234",
      email: "Kim@gmail.com",
      createdTime: new Date().getTime(),
    },
  ],
  isFetched: false,
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<ContactItem>) => {
      const contact = action.payload;
      state.data.unshift(contact);
    },
    removeContact: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.data.splice(
        state.data.findIndex((item) => item.id === id),
        1
      );
    },
    modifyContact: (state, action: PayloadAction<ContactItem>) => {
      const modifyItem = action.payload;
      const contactItem = state.data.find((item) => item.id === modifyItem.id);

      if (contactItem) {
        contactItem.name = modifyItem.name;
        contactItem.phone = modifyItem.phone;
        contactItem.email = modifyItem.email;
        contactItem.createdTime = modifyItem.createdTime;
      }
    },
    initialContact: (state, action: PayloadAction<ContactItem[]>) => {
       const contact = action.payload;

       state.data = contact;
       state.isFetched = true;
   },
  },   
});



export const { addContact, removeContact, modifyContact,  initialContact } = contactSlice.actions;

export default contactSlice.reducer;