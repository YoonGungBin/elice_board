# flask 서버 실행
- pip install -r requirements.txt
- app.py있는 폴더에서 flask db init => flask db migrate => flask db upgrade 입력 후 db에 테이블이 잘 생성되는지 확인
- server 폴더에 secret.py 생성
```python
username = ''
db_pw = ''
secret_key = ''
jwt_secret_key = ''
```
- app.py있는 폴더에서 flask run 실행

# 구현 기능(수정하기)
- [x] 로그인
  - [x] 로그인시 access token, refresh token 반환
- [x] 토큰 재발급
- [x] 회원 가입
- [ ] 로그아웃 
- [ ] 글 목록 불러오기
- [ ] 글 작성
- [ ] 글 검색
- [ ] 필터링
- [ ] 글 수정
- [ ] 댓글작성 및 수정
- [ ] 좋아요
- [ ] 개인 정보 입력 및 수정,(사진) 
- [ ] 작성 게시물 조회, 
- [ ] 좋아요한 글 조회
- [ ] 댓글 조회
