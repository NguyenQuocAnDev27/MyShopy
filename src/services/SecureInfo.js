import * as Keychain from 'react-native-keychain';

// Dictionary to store key names
const SecureKeys = {
  USERNAME: 'username',
  PASSWORDHASH: 'passwordhash',
  TOKEN: 'token',
  // Add other keys as needed
};

// Function to save a key-value pair
async function saveItem(key, value) {
  try {
    await Keychain.setGenericPassword(key, value);
    console.log(`Item saved successfully: ${key}`);
  } catch (error) {
    console.log(`Could not save item: ${key}`, error);
  }
}

// Function to retrieve a value by key
async function getItem(key) {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      if (credentials.username === key) {
        console.log(`Item retrieved successfully: ${key}`);
        return credentials.password;
      } else {
        console.log(`Key not found: ${key}`);
        return null;
      }
    } else {
      console.log('No credentials stored');
      return null;
    }
  } catch (error) {
    console.log(`Could not retrieve item: ${key}`, error);
    return null;
  }
}

// Function to delete a key-value pair
async function deleteItem(key) {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials && credentials.username === key) {
      await Keychain.resetGenericPassword();
      console.log(`Item deleted successfully: ${key}`);
    } else {
      console.log(`Key not found: ${key}`);
    }
  } catch (error) {
    console.log(`Could not delete item: ${key}`, error);
  }
}

// Export the functions and the dictionary
export {SecureKeys, saveItem, getItem, deleteItem};
