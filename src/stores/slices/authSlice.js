import AsyncStorage from '@react-native-async-storage/async-storage';

export const createAuthSlice = (set, get) => ({
  isAuthenticated: false,
  user: null,
  token: null,

  login: async ({user, token}) => {
    await AsyncStorage.setItem('user', JSON.stringify(user));
    await AsyncStorage.setItem('token', token);
    console.log(`Account [${user}] loged in.`);
    set({isAuthenticated: true, user: user, token: token});
  },

  getUserLocalData: async () => {
    const user = await AsyncStorage.getItem('user');
    const token = await AsyncStorage.getItem('token');

    if (user !== null && user !== undefined) {
      console.log(`Account [${user}] already loged in.`);
    } else {
      console.log('No account loged in!');
    }

    return {
      user: user ? JSON.parse(user) : null,
      token: token || null,
    };
  },

  logout: async () => {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('token');

    console.log('Loged out.');
    set({isAuthenticated: false, user: null, token: null});
  },
});
