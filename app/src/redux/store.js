import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

// Import all slices
import userReducer from './slices/userSlice';
import systemImageReducer from './slices/systemImageSlice';
import clusterReducer from './slices/clusterSlice';
import vmOfferReducer from './slices/vmOfferSlice';
import vmHostReducer from './slices/vmHostSlice';


// Configure persist for user slice
const userPersistConfig = {
  key: 'iaas-user',
  storage,
  whitelist: ['currentUser', 'token', 'user', 'isAuthenticated'] // persist current user data
};

// Root reducer 
const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  systemImages: systemImageReducer,
  clusters: clusterReducer,
  vmOffers: vmOfferReducer,
  vmHost: vmHostReducer
});

// Configure store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        ignoredPaths: ['auth', 'iaas-user'] // Ignore these paths for serializable check
      },
    }),
  devTools: process.env.NODE_ENV !== 'production' // Enable devtools in development
});

// Create persistor
export const persistor = persistStore(store);