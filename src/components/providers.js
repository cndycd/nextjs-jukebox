'use client';

import { createStore, Provider } from 'jotai';
import { AnimatePresence } from 'framer-motion';

import { clicksAtom } from '~/atoms';

const store = createStore();
store.set(clicksAtom, 0);

export const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <AnimatePresence mode="wait">{children}</AnimatePresence>
    </Provider>
  );
};
