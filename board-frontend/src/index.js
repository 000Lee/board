import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import store from './store/store'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'

// Axios 글로벌 설정
axios.defaults.withCredentials = true

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
   // <React.StrictMode>
   /* 개발 모드에서 
   React 애플리케이션의 잠재적인 문제를 감지하는 데 도움을 주는 래퍼입니다.
   주로 다음과 같은 작업을 검사합니다:
   더 이상 사용되지 않는 라이프사이클 메서드
   예상치 못한 부작용
   레거시 코드의 경고 등
   프로덕션 환경에서는 아무런 영향을 주지 않으므로 제거해도 됩니다. */
   <Provider store={store}>
      <BrowserRouter>
         <App />
      </BrowserRouter>
   </Provider>
   //BrowserRouter - React Router에서 라우팅을 관리하기 위한 컴포넌트
   //Provider - Redux에서 애플리케이션 전체에 Store를 제공하기 위한 컴포넌트
)

reportWebVitals()
