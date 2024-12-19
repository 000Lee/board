import React, { useState, useCallback } from 'react'

// 등록, 수정 폼 컴포넌트
const PostForm = ({ onSubmit, initialValues = {} }) => {
   const [imgUrl, setImgUrl] = useState('') // 이미지 경로
   const [imgFile, setImgFile] = useState(null) // 이미지 파일 객체
   const [content, setContent] = useState('') // 게시물 내용

   // 이미지 파일 미리보기
   const handleImageChange = useCallback((e) => {
      const file = e.target.files && e.target.files[0]
      if (!file) return

      setImgFile(file)
      const reader = new FileReader()
      reader.readAsDataURL(file)

      reader.onload = (event) => {
         setImgUrl(event.target.result)
      }
   }, [])

   // 작성한 내용 전송
   const handleSubmit = useCallback(
      (e) => {
         e.preventDefault()

         if (!content.trim()) {
            alert('내용을 입력하세요.')
            return
         }

         if (!imgFile) {
            alert('이미지 파일을 추가하세요.')
            return
         }

         const formData = new FormData()
         formData.append('content', content)
         formData.append('img', imgFile)

         onSubmit(formData)
      },
      [content, imgFile, onSubmit]
   )

   return (
      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }} encType="multipart/form-data">
         {/* 이미지 업로드 필드 */}
         <label style={{ display: 'block', marginBottom: '10px' }}>
            이미지 업로드
            <input type="file" name="img" accept="image/*" onChange={handleImageChange} style={{ display: 'block', marginTop: '5px' }} />
         </label>

         {imgUrl && (
            <div style={{ marginTop: '15px' }}>
               <img src={imgUrl} alt="업로드 이미지 미리보기" style={{ width: '400px', display: 'block' }} />
            </div>
         )}

         {/* 게시물 내용 입력 필드 */}
         <div style={{ marginTop: '15px' }}>
            <label>
               게시물 내용
               <textarea rows="4" value={content} onChange={(e) => setContent(e.target.value)} placeholder="게시물 내용을 입력하세요" style={{ width: '100%', marginTop: '5px', padding: '10px', boxSizing: 'border-box' }}></textarea>
            </label>
         </div>

         {/* 등록 / 수정 버튼 */}
         <button
            type="submit"
            style={{
               marginTop: '15px',
               padding: '10px 20px',
               backgroundColor: '#007BFF',
               color: '#fff',
               border: 'none',
               cursor: 'pointer',
            }}
         >
            등록
         </button>
      </form>
   )
}

export default PostForm
