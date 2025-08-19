// import { useCallback, useEffect, useReducer } from "react";
// import { Platform } from "react-native";
// import * as SecureStore from "expo-secure-store";

// type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

// function useAsyncState<T>(
//   initialValue: [boolean, T | null] = [true, null]
// ): [[boolean, T | null], (value: T | null) => void] {
//   return useReducer(
//     (_state: [boolean, T | null], action: T | null): [boolean, T | null] => [
//       false,
//       action,
//     ],
//     initialValue
//   );
// }

// export async function setStorageItemAsync<T>(key: string, value: T | null) {
//   const stringValue = value === null ? null : JSON.stringify(value);

//   if (Platform.OS === "web") {
//     try {
//       if (stringValue === null) {
//         localStorage.removeItem(key);
//       } else {
//         localStorage.setItem(key, stringValue);
//       }
//     } catch (e) {
//       console.error("Local storage is unavailable:", e);
//     }
//   } else {
//     if (stringValue === null) {
//       await SecureStore.deleteItemAsync(key);
//     } else {
//       await SecureStore.setItemAsync(key, stringValue);
//     }
//   }
// }

// export function useStorageState<T>(key: string): UseStateHook<T> {
//   const [state, setState] = useAsyncState<T>();

//   useEffect(() => {
//     const fetchValue = async () => {
//       let stored: string | null = null;
//       if (Platform.OS === "web") {
//         try {
//           stored = localStorage.getItem(key);
//         } catch (e) {
//           console.error("Local storage is unavailable:", e);
//         }
//       } else {
//         stored = await SecureStore.getItemAsync(key);
//       }

//       if (stored) {
//         setState(JSON.parse(stored) as T);
//       } else {
//         setState(null);
//       }
//     };

//     fetchValue();
//   }, [key]);

//   const setValue = useCallback(
//     (value: T | null) => {
//       setState(value);
//       setStorageItemAsync<T>(key, value);
//     },
//     [key, state]
//   );

//   return [state, setValue];
// }

import  { useEffect, useCallback, useReducer } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, null],
): UseStateHook<T> {
  return useReducer(
    (state: [boolean, T | null], action: T | null = null): [boolean, T | null] => [false, action],
    initialValue
  ) as UseStateHook<T>;
}

export async function setStorageItemAsync(key: string, value: string | null) {
  if (process.env.EXPO_OS === 'web') {
    if (value === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, value);
    }
  } else {
    if (value == null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  }
}

export function useStorageState(key: string): UseStateHook<string> {
  // Public
  const [state, setState] = useAsyncState<string>();

  // Get
  useEffect(() => {
    if (Platform.OS === 'web') {
      try {
        if (typeof localStorage !== 'undefined') {
          setState(localStorage.getItem(key));
        }
      } catch (e) {
        console.error('Local storage is unavailable:', e);
      }
    } else {
      SecureStore.getItemAsync(key).then(value => {
        setState(value);
      });
    }
  }, [key]);

  // Set
  const setValue = useCallback(
    (value: string | null) => {
      setState(value);
      setStorageItemAsync(key, value);
    },
    [key]
  );

  return [state, setValue];
}
