import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
   const navigate = useNavigate()

   const handleLoginClick = () => {
      navigate('/login') // "/login" 경로로 이동
   }

   return (
      <div>
         <h2>게시판</h2>
         <p>게시판 페이지입니다. 여기에 게시글 목록이 표시될 예정입니다.</p>
         <button onClick={handleLoginClick}>로그인 페이지로 이동</button>
      </div>
   )
}

export default Home
