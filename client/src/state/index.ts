import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Properties represent state. 

export interface InitialStateTypes {
    isSidebarCollapsed: boolean;
    isDarkMode: boolean;
}

const initialState: InitialStateTypes = {
    isSidebarCollapsed: false,
    isDarkMode: false,
}

// Create slice to store data (slice is part of the data store).
// 'action: PayloadAction<boolean>' represents the type which allows you to determine and pass a value for isSidebarCollapsed 'state.isSidebarCollapsed = action.payload'.
// any time we use a particular function ie.'setIsSidebarCollapsed', it will update the Redux store state (finction to change the global store state).

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
            state.isSidebarCollapsed = action.payload;
        },
        setIsDarkMode: (state, action: PayloadAction<boolean>) => {
            state.isDarkMode = action.payload;
        },
    },
});

export const { setIsSidebarCollapsed, setIsDarkMode } = globalSlice.actions;

export default globalSlice.reducer;