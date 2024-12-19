import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logoutUserThunk } from '../../features/authSlice'
import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'

const Navbar = ({ isAuthenticated, user }) => {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const handleLogout = useCallback(() => {
      dispatch(logoutUserThunk())
         .unwrap() // Thunk의 결과를 추출
         .then(() => {
            navigate('/') // 로그아웃 후 메인 페이지로 이동
         })
         .catch((error) => {
            alert(error)
         })
   }, [dispatch, navigate]) // 의존성 배열에 필요한 값 추가

   return (
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px', backgroundColor: '#f8f9fa' }}>
         {/* 로고 */}
         <div>
            <Link to="/">
               <h1>로고</h1>
            </Link>
         </div>

         {/* 인증 상태에 따른 네비게이션 */}
         <div>
            {isAuthenticated ? (
               <>
                  <Link to="/boards/create" style={{ textDecoration: 'none', display: 'inline-block', fontSize: '16px', color: 'blue' }}>
                     글쓰기
                  </Link>
                  <Link to="/my" style={{ textDecoration: 'none', fontSize: '16px', color: 'gray' }}>
                     {user?.nick}님
                  </Link>
                  <button
                     onClick={handleLogout}
                     style={{
                        padding: '5px 10px',
                        fontSize: '16px',
                        backgroundColor: 'pink',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                     }}
                  >
                     로그아웃
                  </button>
               </>
            ) : (
               <Link to="/login" style={{ textDecoration: 'none' }}>
                  <button
                     style={{
                        padding: '5px 10px',
                        fontSize: '16px',
                        backgroundColor: 'blue',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                     }}
                  >
                     로그인
                  </button>
               </Link>
            )}
         </div>
      </nav>
   )
}

export default Navbar
