/* 다시 읽어보기!!!!!!!!!!!!!!!!!!!!!!!!!! */

import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUserThunk } from '../features/authSlice'

const Signup = () => {
   const [email, setEmail] = useState('')
   const [nick, setNick] = useState('')
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [isSignupComplete, setIsSignupComplete] = useState(false)
   const dispatch = useDispatch()
   const { loading, error } = useSelector((state) => state.auth)

   const handleSignup = useCallback(
      (e) => {
         e.preventDefault()

         if (!email.trim() || !nick.trim() || !password.trim() || !confirmPassword.trim()) {
            alert('모든 필드를 입력해주세요!')
            return
         }

         if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다!')
            return
         }

         dispatch(registerUserThunk({ email, nick, password }))
            .unwrap()
            .then(() => {
               setIsSignupComplete(true)
            })
            .catch((error) => {
               console.error('회원가입 에러:', error)
            })
      },
      [email, nick, password, confirmPassword, dispatch]
   )

   if (isSignupComplete) {
      return (
         <div>
            <h2>회원가입이 완료되었습니다!</h2>
            <p>로그인 페이지로 이동하거나 다른 작업을 계속 진행할 수 있습니다.</p>
            <button onClick={() => (window.location.href = '/login')}>로그인 하러 가기</button>
         </div>
      )
   }

   return (
      <div>
         <h2>회원가입</h2>
         <form onSubmit={handleSignup}>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input type="email" name="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" name="nick" placeholder="사용자 이름" value={nick} onChange={(e) => setNick(e.target.value)} />
            <input type="password" name="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="password" name="confirmPassword" placeholder="비밀번호 확인" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <button type="submit" disabled={loading}>
               {loading ? '처리 중...' : '회원가입'}
            </button>
         </form>
      </div>
   )
}

export default Signup
