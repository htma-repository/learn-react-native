import * as SecureStore from "expo-secure-store";

export async function storeUserStorage(key: string, value: string) {
  try {
    await SecureStore.setItemAsync(key, value);
    // Congrats! You've just stored your first value!
  } catch (error) {
    // There was an error on the native side
    console.error(error);
  }
}

export async function retrieveUserStorage(key: string) {
  try {
    const storage = await SecureStore.getItemAsync(key);
    if (storage) {
      // Congrats! You've just retrieved your first value!
      return storage;
    }
  } catch (error) {
    // There was an error on the native side
    console.error(error);
  }
}

export async function removeUserStorage(key: string) {
  try {
    await SecureStore.deleteItemAsync(key);
    // Congrats! You've just removed your first value!
  } catch (error) {
    // There was an error on the native side
    console.error(error);
  }
}
