import BoardForm from '../components/post/BoardForm'
// import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useCallback } from 'react'
import { createPostThunk } from '../features/boardSlice'

const BoardCreatePage = () => {
   // const navigate = useNavigate()
   const dispatch = useDispatch()

   const handleSubmit = useCallback(
      (postData) => {
         //postData: 사용자가 입력한 게시물 데이터
         /*
      postData = {
        content: '여행중입니다',
        hashtags: '#여행 #맛집',
        img: 파일객체
      }
      */
         dispatch(createPostThunk(postData))
            .unwrap()
            .then(() => {
               window.location.href = '/'
               //navigate('/') //게시물 등록 후 메인페이지로 이동
            })
            .catch((error) => {
               console.error('게시물 등록 에러: ', error)
               alert('게시물 등록에 실패했습니다.', error)
            })
      },
      [dispatch]
   )

   return (
      <div>
         <h1>게시물 등록</h1>
         <BoardForm onSubmit={handleSubmit} />
      </div>
   )
}

export default BoardCreatePage
