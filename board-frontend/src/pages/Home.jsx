import Pagination from '@mui/material/Pagination'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPostsThunk } from '../features/boardSlice'
import PostItem from '../components/post/BoardItem'

const Home = ({ isAuthenticated }) => {
   const [page, setPage] = useState(1) // 현재 페이지
   const dispatch = useDispatch()

   // Redux 스토어에서 boards 상태와 사용자 정보 가져오기
   const { boards, pagination, loading, error } = useSelector((state) => state.boards)
   const user = useSelector((state) => state.auth.user) // 사용자 정보 가져오기

   useEffect(() => {
      dispatch(fetchPostsThunk(page))
   }, [dispatch, page])

   // 페이지 변경
   const handlePageChange = useCallback((event, value) => {
      setPage(value)
   }, [])

   return (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
         <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Home Feed</h1>

         {loading && <p style={{ textAlign: 'center' }}>로딩 중...</p>}

         {error && <p style={{ textAlign: 'center', color: 'red' }}>에러 발생: {error}</p>}

         {boards.length > 0 ? (
            <>
               {boards.map((post) => (
                  <PostItem key={post.id} post={post} isAuthenticated={isAuthenticated} user={user} />
               ))}
               <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                  <Pagination
                     count={pagination?.totalPages || 0} // 총 페이지 수
                     page={page} // 현재 페이지
                     onChange={handlePageChange} // 페이지를 변경할 함수
                  />
               </div>
            </>
         ) : (
            !loading && <p style={{ textAlign: 'center' }}>게시물이 없습니다.</p>
         )}
      </div>
   )
}

export default Home
