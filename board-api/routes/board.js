const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const { Board, User } = require('../models')
const { isLoggedIn } = require('./middlewares')

const router = express.Router()

// 'uploads' 폴더가 없을 경우 새로 생성
try {
   fs.readdirSync('uploads')
} catch (error) {
   console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.')
   fs.mkdirSync('uploads')
}

// 이미지 업로드를 위한 multer 설정
const upload = multer({
   storage: multer.diskStorage({
      destination(req, file, cb) {
         cb(null, 'uploads/') // 업로드 폴더 경로 설정
      },
      filename(req, file, cb) {
         const ext = path.extname(file.originalname) // 파일 확장자 추출
         cb(null, path.basename(file.originalname, ext) + Date.now() + ext) // 파일명 설정 (기존 이름 + 업로드 시간)
      },
   }),
   limits: { fileSize: 5 * 1024 * 1024 }, // 파일 크기 제한 (5MB)
})

// 게시물 등록 라우터
router.post('/', isLoggedIn, upload.single('img'), async (req, res) => {
   try {
      console.log(req.file)
      if (!req.file) {
         return res.status(400).json({ success: false, message: '파일 업로드에 실패했습니다.' })
      }

      // 게시물 생성
      const post = await Board.create({
         content: req.body.content, // 게시물 내용
         img: `/${req.file.filename}`, // 이미지 URL
         UserId: req.user.id, // 작성자 ID
      })

      res.json({
         success: true,
         post: {
            id: post.id,
            content: post.content,
            img: post.img,
            UserId: post.UserId,
         },
         message: '게시물이 성공적으로 등록되었습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '게시물 등록 중 오류가 발생했습니다.', error })
   }
})

// 게시물 수정 라우터
router.put('/:id', isLoggedIn, upload.single('img'), async (req, res) => {
   try {
      // 1️. 게시물 존재 여부 확인
      const post = await Board.findOne({ where: { id: req.params.id, UserId: req.user.id } })
      if (!post) {
         return res.status(404).json({ success: false, message: '게시물을 찾을 수 없습니다.' })
      }

      // 2️. 게시물 수정
      await post.update({
         content: req.body.content, // 수정된 내용
         img: req.file ? `/${req.file.filename}` : post.img, // 수정된 이미지 URL (파일이 있으면 교체, 없으면 기존 URL 유지)
      })

      // 5️. 게시물 다시 조회 (include 추가)
      const updatedPost = await Board.findOne({
         where: { id: req.params.id },
         include: [
            {
               model: User,
               attributes: ['id', 'nick', 'email'], // User의 특정 필드만 가져오기
            },
         ],
      })

      res.json({
         success: true,
         post: updatedPost,
         message: '게시물이 성공적으로 수정되었습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '게시물 수정 중 오류가 발생했습니다.', error })
   }
})

// 게시물 삭제 라우터
router.delete('/:id', isLoggedIn, async (req, res) => {
   try {
      const post = await Board.findOne({ where: { id: req.params.id, UserId: req.user.id } })
      if (!post) {
         return res.status(404).json({ success: false, message: '게시물을 찾을 수 없습니다.' })
      }

      // 게시물 삭제
      await post.destroy()

      res.json({
         success: true,
         message: '게시물이 성공적으로 삭제되었습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '게시물 삭제 중 오류가 발생했습니다.', error })
   }
})

//특정 게시물 불러오기(id로 게시물 조회) localhost:8000/post/:id
router.get('/:id', async (req, res) => {
   try {
      const post = await Board.findOne({
         where: { id: req.params.id },
         include: [
            {
               model: User,
               attributes: ['id', 'nick'],
            },
         ],
      })

      if (!post) {
         return res.status(404).json({ success: false, message: '게시물을 찾을 수 없습니다.' })
      }

      res.json({
         success: true,
         post,
         message: '게시물을 성공적으로 불러왔습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '게시물을 불러오는 중 오류가 발생했습니다.', error })
   }
})

//전체 게시물 불러오기(페이징 기능) localhost:8000/post?page=1&limit=3
router.get('/', async (req, res) => {
   try {
      // parseInt('08') -> 일부 브라우저에서 NaN 반환
      // parseInt('08', 10) -> 10진수 8을 반환
      const page = parseInt(req.query.page, 10) || 1 // page번호(기본값: 1)
      const limit = parseInt(req.query.limit, 10) || 3 // 한페이지당 나타낼 게시물(레코드) 갯수(기본값: 3)
      const offset = (page - 1) * limit // 오프셋 계산

      // 게시물 레코드의 전체 갯수 가져오기
      // select count(*) from posts
      const count = await Board.count()

      // 게시물 레코드를 가져오기
      /*
         page:1, limit:3, offset: 0 -> 0개의 레코드를 건너띄고 3개의 최신 레코드를 가져온다
         select * from posts order by createdAt desc limit 3 offset 0

         page:2, limit:3, offset: 3 -> 3개의 레코드를 건너띄고 4번째 부터 3개의 최신 레코드를 가져온다
         select * from posts order by createdAt desc limit 3 offset 3

         page:3, limit:3, offset: 6 -> 6개의 레코드를 건너띄고 7번째 부터 3개의 최신 레코드를 가져온다
         select * from posts order by createdAt desc limit 3 offset 6
         */
      const posts = await Board.findAll({
         limit,
         offset,
         order: [['createdAt', 'DESC']], // 최신날짜 순으로 가져온다
         // 게시글을 작성한 사람과 게시글에 작성된 해시태그를 같이 가져온다
         include: [
            {
               model: User,
               attributes: ['id', 'nick', 'email'],
            },
         ],
      })

      res.json({
         success: true,
         posts,
         pagination: {
            totalPosts: count, // 전체 게시물 수
            currentPage: page, // 현재 페이지
            totalPages: Math.ceil(count / limit), // 총 페이지 수
            limit, // 페이지당 게시물 수
         },
         message: '전체 게시물 리스트를 성공적으로 불러왔습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '게시물 리스트를 불러오는 중 오류가 발생했습니다.', error })
   }
})

module.exports = router
