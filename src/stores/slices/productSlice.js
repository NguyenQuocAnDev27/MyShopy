export const createProductSlice = set => ({
  products: [],
  fetchProducts: async () => {
    const response = await new Promise(resolve =>
      setTimeout(() => resolve(['Product 1', 'Product 2']), 1000),
    );
    set({products: response});
  },
});
