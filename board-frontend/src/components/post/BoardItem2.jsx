import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import dayjs from 'dayjs' //날짜 시간 포맷해주는 패키지
import { useCallback } from 'react'
import { deletePostThunk } from '../../features/boardSlice'

const PostItem = ({ post, isAuthenticated, user }) => {
   //게시물 삭제 실행
   const dispatch = useDispatch()
   const onClickDelete = useCallback(
      (id) => {
         dispatch(deletePostThunk(id))
            .unwrap()
            .then(() => {
               // navigate('/') => spa방식
               window.location.href = '/' // 페이지 이동 => 전체 페이지 새로고침
            })
            .catch((error) => {
               console.error('게시물 삭제 중 오류 발생: ', error)
               alert('게시물 삭제에 실패했습니다', error)
            })
      },
      [dispatch]
   )

   return (
      <div
      /*    onClick={() => {
            window.location.href = `/boards/${post.id}`
         }}
         style={{ cursor: 'pointer' }} */
      >
         <div style={styles.cardContainer}>
            <div style={{ ...styles.imageContainer, backgroundImage: `url(${process.env.REACT_APP_API_URL}${post.img})` }} />
            <div style={styles.contentContainer}>
               <Link to={`/my/${post.User.id}`} style={{ textDecoration: 'none', color: 'blue' }}>
                  <p style={{ margin: '0', fontWeight: 'bold' }}>@{post.User.nick}</p>
               </Link>
               <p style={{ margin: '5px 0', color: 'gray', fontSize: '0.9em' }}>{dayjs(post.createdAt).format('YYYY-MM-DD HH:mm:ss')}</p>
               <p style={{ margin: '5px 0' }}>{post.content}</p>
            </div>
            <div style={styles.actionsContainer}>
               <button style={styles.iconButton}>❤️ {/* 하트 아이콘 대체 */}</button>
               {/* 이모지 안뜸!!!!!!!!!! */}
               {isAuthenticated && post.UserId === user.id && (
                  <div style={{ display: 'flex', gap: '10px' }}>
                     <Link to={`/boards/edit/${post.post.id}`}>
                        <button style={styles.iconButton}>✎ {/* 연필 아이콘 대체 */}</button>
                     </Link>
                     <button style={styles.iconButton} onClick={() => onClickDelete(post.id)}>
                        🗑️ {/* 휴지통 아이콘 */}
                     </button>
                  </div>
               )}
            </div>
         </div>
      </div>
   )
}

const styles = {
   cardContainer: {
      paddingTop: '20px',
      width: '300px',
      // border: '1px solid #ddd',
      borderRadius: '8px',
      margin: '20px auto 0 auto',
      overflow: 'hidden',
      // boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
   },
   imageContainer: {
      width: '100%',
      height: '240px',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
   },
   contentContainer: {
      padding: '15px',
   },
   actionsContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 15px',
      borderTop: '1px solid #eee',
   },
   iconButton: {
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      fontSize: '1.2em',
      color: '#555',
   },
}

export default PostItem
