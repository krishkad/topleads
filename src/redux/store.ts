import { configureStore } from '@reduxjs/toolkit'
import CalendarSlice from './features/calendar-slice'


export const makeStore = () => {
    return configureStore({
        reducer: {
            calendar: CalendarSlice
        },
    })
}

export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export default makeStore;