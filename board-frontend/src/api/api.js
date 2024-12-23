import axios from 'axios'

const BASE_URL = process.env.REACT_APP_API_URL

//axios 인스턴스 생성
const Api = axios.create({
   baseURL: BASE_URL,
   headers: {
      'Content-Type': 'application/json',
      /* 'Content-Type': 'application/json' 
      HTTP 요청의 **헤더(Header)**에 포함되는 키-값 쌍 중 하나로,
      요청의 본문(Body) 데이터가 어떤 형식으로 인코딩되어 있는지를 
      서버에 알리는 역할을 합니다. (임의작성X  표준용어 O) */
   },
   withCredentials: true, // 세션 쿠키를 요청에 포함
})

//회원가입
export const registerUser = async (userData) => {
   try {
      // userData: 회원가입 창에서 입력한 데이터
      const response = await Api.post('/auth/join', userData)

      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
      //request 할때 오류 발생시 에러를 registerUser() 함수를 실행한 곳으로 던짐
   }
}

//로그인
export const loginUser = async (credentials) => {
   try {
      const response = await Api.post('/auth/login', credentials)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

//로그아웃
export const logoutUser = async () => {
   try {
      const response = await Api.get('/auth/logout')
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

//로그인 체크
export const checkAuthStatus = async () => {
   try {
      const response = await Api.get('/auth/status')
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}
/*  */
//포스트 등록
export const createPost = async (postData) => {
   try {
      //postData: 등록할 게시물 데이터가 담겨있는 json객체

      const config = {
         headers: {
            'Content-Type': 'multipart/form-data', // 파일 전송시 반드시 지정
         },
      }

      const response = await Api.post('/board', postData, config)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

//포스트 수정
export const updatePost = async (id, postData) => {
   try {
      //postData: 수정할 게시물 데이터가 담겨있는 json객체

      const config = {
         headers: {
            'Content-Type': 'multipart/form-data', // 파일 전송시 반드시 지정
         },
      }

      const response = await Api.put(`/board/${id}`, postData, config)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

//포스트 삭제
export const deletePost = async (id) => {
   try {
      const response = await Api.delete(`/board/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

//특정 포스트 가져오기
export const getPostById = async (id) => {
   try {
      const response = await Api.get(`/board/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

//전체 포스트 가져오기(페이징)
export const getPosts = async (page) => {
   try {
      const response = await Api.get(`/board?page=${page}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

export default Api
