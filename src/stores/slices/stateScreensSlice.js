export const createStateScreensSlice = set => ({
  isLoading: false,
  toggleLoading: () => {
    set(state => ({
      isLoading: !state.isLoading,
    }));
  },
});
