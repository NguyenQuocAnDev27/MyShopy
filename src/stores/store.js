import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAuthSlice} from './slices/authSlice';
import {createProductSlice} from './slices/productSlice';
import {createStateScreensSlice} from './slices/stateScreensSlice';
import {name as appName} from '../../app.json';

const useStore = create(
  persist(
    (set, get) => ({
      ...createAuthSlice(set, get),
      ...createProductSlice(set, get),
      ...createStateScreensSlice(set, get),
    }),
    {
      name: appName + 'Store', // Unique name for the storage
      storage: {
        getItem: async name => {
          const value = await AsyncStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async name => {
          await AsyncStorage.removeItem(name);
        },
      },
    },
  ),
);

export default useStore;
