import { Route, Routes } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import BoardCreatePage from './pages/BoardCreatePage'
import BoardEditPage from './pages/BoardEditPage'
import BoardDetailPage from './pages/BoardDetailPage'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuthStatusThunk } from './features/authSlice'

function App() {
   const dispatch = useDispatch()
   const { isAuthenticated, user } = useSelector((state) => state.auth) // 로그인 상태 가져오기

   // 애플리케이션 시작 시 로그인 상태 확인
   useEffect(() => {
      dispatch(checkAuthStatusThunk())
   }, [dispatch])

   return (
      <>
         <Navbar isAuthenticated={isAuthenticated} user={user} />
         <Routes>
            <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} /> {/* 초기 화면 */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/boards/create" element={<BoardCreatePage />} />
            <Route path="/boards/edit/:id" element={<BoardEditPage />} />
            <Route path="/boards/:id" element={<BoardDetailPage isAuthenticated={isAuthenticated} />} />
         </Routes>
      </>
   )
}

export default App
