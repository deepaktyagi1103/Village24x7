import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            state.user = action.payload;
        },
        updateSmartCoins: (state, action) => {
            if (state.user) {
                state.user.smartCoins = action.payload;  // 🟢 Smart Coins Update
            }
        }
    }
});

// Action creators
export const { setUserDetails, updateSmartCoins } = userSlice.actions;

export default userSlice.reducer;
