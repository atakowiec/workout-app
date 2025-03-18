import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { State } from '@/state/index';

export type UserState = {
  id: string;
  username: string;
}

const userSlice = createSlice({
  name: 'user',
  initialState: {} as UserState,
  reducers: {
    setUser(_, action) {
      return {
        id: action.payload.id,
        username: action.payload.username,
      };
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;

export function useUser(): UserState {
  return useSelector((state: State) => state.user);
}