import { useParams } from 'react-router-dom'
import BoardForm from '../components/post/BoardForm'

import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPostByIdThunk, updatePostThunk } from '../features/boardSlice'

const PostEditPage = () => {
   const { id } = useParams() //post의 id
   const dispatch = useDispatch()
   const { post, loading, error } = useSelector((state) => state.boards)

   // 게시물 데이터 불러오기
   useEffect(() => {
      dispatch(fetchPostByIdThunk(id))
   }, [dispatch, id])

   // 게시물 수정
   const handleSubmit = useCallback(
      (postData) => {
         dispatch(updatePostThunk({ id, postData }))
            .unwrap()
            .then(() => {
               window.location.href = '/' //수정 후 메인페이지로 이동
            })
            .catch((error) => {
               console.error('게시물 수정 중 오류 발생:', error)
               alert('게시물 수정에 실패했습니다.', error)
            })
      },
      [dispatch, id]
   )

   if (loading) return <p>로딩 중...</p>
   if (error) return <p>에러발생: {error}</p>

   return (
      <div>
         <h1>게시물 수정</h1>
         {post && <BoardForm onSubmit={handleSubmit} initialValues={post} />}
      </div>
   )
}

export default PostEditPage
