# SSOUL
Ai 칵테일 추천 & 커뮤니티 사이트

## 프로젝트 개요

**프로젝트명**: SSOUL (칵테일을 좋아하는 사람들을 위한 서비스)  
**기술 스택**: Next.js 15, React 19, TypeScript, Tailwind CSS  
**저장소**: https://github.com/prgrms-web-devcourse-final-project/WEB5_6_HaeDokCoding_FE

## 시작하기

### 개발 환경 설정
```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 코드 포맷팅
npm run format

# 린트 검사
npm run lint
```

### 환경 변수
프로젝트는 개발/운영 환경에 따라 다른 API URL을 사용합니다:
- `NEXT_PUBLIC_API_URL_DEV`: 개발 환경 API URL
- `NEXT_PUBLIC_API_URL_PROD`: 운영 환경 API URL

## 프로젝트 구조

```
src/
├── app/                          # Next.js App Router 페이지
│   ├── layout.tsx               # 루트 레이아웃
│   ├── page.tsx                 # 메인 페이지
│   ├── community/               # 커뮤니티 관련 페이지
│   ├── recipe/                  # 칵테일 레시피 페이지
│   ├── recommend/               # 취향 추천 페이지
│   ├── login/                   # 로그인 관련 페이지
│   ├── mypage/                  # 마이페이지
│   └── api/                     # API 설정
├── domains/                      # 도메인별 컴포넌트
│   ├── community/               # 커뮤니티 도메인
│   ├── recipe/                  # 레시피 도메인
│   ├── recommend/               # 추천 도메인
│   ├── login/                   # 로그인 도메인
│   ├── mypage/                  # 마이페이지 도메인
│   └── shared/                  # 공통 도메인 컴포넌트
└── shared/                       # 공통 컴포넌트 및 유틸
    ├── components/              # 공통 UI 컴포넌트
    ├── styles/                  # 글로벌 스타일
    ├── assets/                  # 이미지, 아이콘 등
    ├── hook/                    # 공통 훅
    ├── types/                   # 타입 정의
    └── utills/                  # 유틸리티 함수
```

## 주요 기능

### 1. 인증 시스템
- **소셜 로그인**: Google, Kakao, Naver 지원
- **상태 관리**: Zustand + cookie 기반
- **주요 파일**:
  - `src/domains/shared/store/auth.ts`: 인증 상태 관리
  - `src/domains/login/hook/useAuthHooks.ts`: 로그인 관련 훅
  - `src/app/api/config/appConfig.ts`: API 설정

### 2. 페이지별 기능

#### 메인 페이지 (`/`)
- 현재 기본 구조만 구현됨
- 추후 확장 예정

#### 칵테일 레시피 (`/recipe`)
- **주요 컴포넌트**: 
  - `CocktailList`: 칵테일 목록 표시
  - `Accordion`: 필터링 옵션
  - `SelectBox`: 정렬 옵션
- **기능**: 검색, 필터링, 정렬
- **상세 페이지**: `/recipe/[id]` - 개별 칵테일 상세 정보

#### 커뮤니티 (`/community`)
- **주요 컴포넌트**:
  - `PostCard`: 게시물 카드
  - `CommunityTab`: 카테고리 탭
  - `WriteBtn`: 글쓰기 버튼
- **카테고리**: 레시피, 팁, 질문, 자유
- **글쓰기**: `/community/write`
- **상세 페이지**: `/community/[id]`

#### 취향 추천 (`/recommend`)
- **챗봇 기반 추천**: `ChatSection` 컴포넌트
- **주요 컴포넌트**:
  - `BotMessage`, `UserMessage`: 메시지 컴포넌트
  - `BotOptions`: 선택 옵션
  - `MessageInput`: 입력창
  - `TypingIndicator`: 타이핑 효과

#### 마이페이지 (`/mypage`)
- **기본 리다이렉트**: `/mypage` → `/mypage/mybar`
- **주요 섹션**:
  - `/mypage/mybar`: 나만의 바
  - `/mypage/my-active`: 활동 내역 (게시물, 댓글, 좋아요)
  - `/mypage/my-alarm`: 알림 설정
  - `/mypage/my-setting`: 계정 설정

#### 로그인 (`/login`)
- **소셜 로그인**: `SocialLogin` 컴포넌트
- **성공 페이지**: `/login/success`
- **신규 사용자**: `/login/user/first-user`

## 기술적 세부사항

### 상태 관리
- **Zustand**: 클라이언트 상태 관리
- **Persist**: localStorage를 통한 상태 영속화
- **주요 스토어**:
  - `auth.ts`: 사용자 인증 상태
  - `accordionStore.ts`: 아코디언 UI 상태

### UI/UX
- **Tailwind CSS**: 스타일링
- **React Hot Toast**: 토스트 알림
- **Lottie**: 로딩 애니메이션
- **GSAP**: 고급 애니메이션
- **Responsive**: 모바일/데스크톱 대응

### 개발 도구
- **ESLint**: 코드 품질 관리
- **Prettier**: 코드 포맷팅
- **Husky**: Git hooks
- **Lint-staged**: 커밋 전 검사

## 주요 설정 파일

- `next.config.ts`: Next.js 설정
- `tailwind.config.js`: Tailwind CSS 설정
- `eslint.config.mjs`: ESLint 설정
- `tsconfig.json`: TypeScript 설정

## 반응형 디자인

프로젝트는 모바일 우선(Mobile-first) 접근 방식을 사용합니다:
- **모바일**: 기본 스타일
- **태블릿**: `md:` prefix
- **데스크톱**: `lg:`, `xl:` prefix

## 주의사항

1. **환경 변수**: 개발/운영 환경에 맞는 API URL 설정 필요
2. **API 통신**: `credentials: 'include'` 설정으로 쿠키 기반 인증
3. **Git Hooks**: Husky 설정으로 커밋 전 자동 검사

## 추가 문의

- **저장소 이슈**: https://github.com/prgrms-web-devcourse-final-project/WEB5_6_HaeDokCoding_FE/issues
- **주요 브랜치**: `main` (메인), `dev` (개발)

---

**작성일**: 2025-10-14  
**작성자**: 정은빈 | 김아현 | 문태민
**버전**: 1.0
