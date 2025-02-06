import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSeminars = createAsyncThunk(
  'seminars/fetchSeminars',
  async () => {
    const response = await axios.get('http://localhost:5000/seminars');
    return response.data;
  }
);

// Создаем thunk для удаления семинара
export const deleteSeminar = createAsyncThunk(
  'seminars/deleteSeminar',
  async (seminarId) => {
    await axios.delete(`http://localhost:5000/seminars/${seminarId}`);
    return seminarId; // Вернем ID удаленного семинара
  }
);
// Создаем thunk для обновления семинара
export const updateSeminar = createAsyncThunk(
    'seminars/updateSeminar',
    async (seminar) => {
      const response = await axios.put(`http://localhost:5000/seminars/${seminar.id}`, seminar);
      return response.data; // Обновленный семинар
    }
  );
const seminarsSlice = createSlice({
  name: 'seminars',
  initialState: {
    seminars: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeminars.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSeminars.fulfilled, (state, action) => {
        state.loading = false;
        state.seminars = action.payload;
      })
      .addCase(fetchSeminars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteSeminar.fulfilled, (state, action) => {
        state.seminars = state.seminars.filter(seminar => seminar.id !== action.payload);
      })
      .addCase(updateSeminar.fulfilled, (state, action) => {
        const index = state.seminars.findIndex(seminar => seminar.id === action.payload.id);
        if (index !== -1) {
          state.seminars[index] = action.payload; // Обновляем семинар в состоянии
        }
      });
  },
});

export default seminarsSlice.reducer;