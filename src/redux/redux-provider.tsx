"use client";
import React, { ReactNode, useRef } from 'react'
import { Provider } from 'react-redux'
import makeStore, { AppStore } from './store';
import { changeMonth } from './features/calendar-slice';
import { getMonth } from '@/lib/utils';

const ReduxProvider = ({ children }: { children: ReactNode }) => {


    const storeRef = useRef<AppStore>()
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore();
        // storeRef.current.dispatch(changeMonth(getMonth()));
    }

    return <Provider store={storeRef.current}>{children}</Provider>
}

export default ReduxProvider