// features/course/courseSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCourseData = createAsyncThunk(
    'course/fetchCourseData',
    async (username, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/api/course/course-level/${username}`);
            return response.data; // Assuming response.data contains { level: number }
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


const courseSlice = createSlice({
    name: 'course',
    initialState: {
        currentUser: null,
        error: null,
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCourseData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCourseData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentUser = action.payload; // Assuming the payload includes the level
            })
            .addCase(fetchCourseData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export default courseSlice.reducer;
