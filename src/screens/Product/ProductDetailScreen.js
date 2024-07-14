import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ProductDetailScreen = () => {
  return (
    <View style={styles.container}>
      <Text>No product details available</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default ProductDetailScreen;
