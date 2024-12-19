/* 여기부터 수정하기! 처음부터! */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createPost, getPosts, updatePost, deletePost, getPostById } from '../api/api'

// 게시물 등록 Thunk
export const createPostThunk = createAsyncThunk('boards/createPost', async (postData, { rejectWithValue }) => {
   try {
      const response = await createPost(postData)
      return response.data.post
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '게시물 등록 실패')
   }
})

// 게시물 수정
export const updatePostThunk = createAsyncThunk('boards/updatePost', async (data, { rejectWithValue }) => {
   try {
      const { id, postData } = data
      const response = await updatePost(id, postData)
      return response.data.post
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '게시물 삭제 실패')
   }
})

// 게시물 삭제
export const deletePostThunk = createAsyncThunk('boards/deletePost', async (id, { rejectWithValue }) => {
   try {
      // eslint-disable-next-line
      const response = await deletePost(id)
      return id // 삭제 성공 후 삭제된 게시물의 id만 반환
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '게시물 삭제 실패')
   }
})

// 특정 게시물 가져오기
export const fetchPostByIdThunk = createAsyncThunk('boards/fetchPostById', async (id, { rejectWithValue }) => {
   try {
      const response = await getPostById(id)

      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '게시물 불러오기 실패')
   }
})

// 전체 게시물 리스트 가져오기
export const fetchPostsThunk = createAsyncThunk('boards/fetchPosts', async (page, { rejectWithValue }) => {
   try {
      const response = await getPosts(page)
      return {
         boards: response.data.posts, // 서버의 posts 키를 boards로 변경
         pagination: response.data.pagination,
      }
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '게시물 리스트 불러오기 실패')
   }
})

const postSlice = createSlice({
   name: 'boards',
   initialState: {
      boards: [],
      post: null,
      pagination: null,
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      // 게시물 등록
      builder
         .addCase(createPostThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(createPostThunk.fulfilled, (state, action) => {
            state.loading = false
         })
         .addCase(createPostThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

      // 게시물 리스트 불러오기
      builder
         .addCase(fetchPostsThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchPostsThunk.fulfilled, (state, action) => {
            state.loading = false
            state.boards = action.payload.boards
            state.pagination = action.payload.pagination
         })
         .addCase(fetchPostsThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

      // 특정 게시물 불러오기
      builder
         .addCase(fetchPostByIdThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchPostByIdThunk.fulfilled, (state, action) => {
            state.loading = false
            state.post = action.payload
         })
         .addCase(fetchPostByIdThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

      // 게시물 삭제
      builder
         .addCase(deletePostThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(deletePostThunk.fulfilled, (state, action) => {
            state.loading = false
            state.boards = state.boards.filter((board) => board.id !== action.payload) // 삭제된 게시물 제거
         })

         .addCase(deletePostThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default postSlice.reducer
