import React, { useMemo, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUserThunk } from '../features/authSlice'

const Login = () => {
   const [email, setEmail] = useState('') // 이메일 상태
   const [password, setPassword] = useState('') // 비밀번호 상태
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { loading, error } = useSelector((state) => state.auth)

   const handleLogin = useCallback(
      (e) => {
         e.preventDefault()
         if (email.trim() && password.trim()) {
            //이메일과 패스워드가 둘다 입력이 되어있다면
            dispatch(loginUserThunk({ email, password }))
               .unwrap()
               .then(() => navigate('/')) //로그인 성공시 메인페이지로 이동
               .catch((error) => console.error('로그인 실패:', error)) //로그인 실패시 에러 출력
         }
      },
      [dispatch, email, password, navigate]
   )

   const loginButtonContent = useMemo(() => (loading ? '로딩' : '로그인'), [loading]) // 로딩 상태가 변경될 때만 버튼 내용이 다시 렌더링됨

   const handleSignupRedirect = () => {
      navigate('/signup') // 회원가입 페이지로 이동
   }

   return (
      <div>
         <h2>로그인</h2>
         {error && <p>{error}</p>}
         <form onClick={handleLogin}>
            <input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" disabled={loading}>
               {loginButtonContent}
            </button>
            <button onClick={handleSignupRedirect}>회원가입 페이지로 이동</button>
         </form>
      </div>
   )
}

export default Login
