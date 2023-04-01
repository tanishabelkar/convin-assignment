import { configureStore } from '@reduxjs/toolkit';
import historyReducer from '../features/historySlice';
import bucketReducer from '../features/bucketSlice'

export default configureStore({
  reducer: {
    history: historyReducer,
    bucket: bucketReducer,
  },
});
