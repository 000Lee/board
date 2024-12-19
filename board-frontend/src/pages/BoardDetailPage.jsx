import BoardItem2 from '../components/post/BoardItem2'

import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPostByIdThunk } from '../features/boardSlice'

const BoardDetailPage = () => {
   const { id } = useParams() // post의 id
   const dispatch = useDispatch()
   const { post, loading, error } = useSelector((state) => state.boards)

   // 게시물 데이터 불러오기
   useEffect(() => {
      if (id) {
         dispatch(fetchPostByIdThunk(id))
      }
   }, [dispatch, id])

   if (loading) return <p>로딩 중...</p>
   if (error) return <p>에러 발생: {error}</p>
   if (!post) return <p>게시물을 찾을 수 없습니다.</p>

   return (
      <div>
         <BoardItem2 post={post.post} />
      </div>
   )
}

export default BoardDetailPage
