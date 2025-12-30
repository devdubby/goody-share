# CLAUDE.md

이 파일은 이 저장소에서 작업할 때 Claude Code (claude.ai/code)에 대한 가이드를 제공합니다.

## 프로젝트 개요

GOODY Share는 딥링크를 지원하는 GOODY 앱의 굿즈 및 판매자 프로필 공유 웹 애플리케이션입니다. 카카오톡, 인스타그램 등 소셜 미디어에서 Open Graph 미리보기를 제공하고, 앱이 설치된 경우 자동으로 앱을 여는 기능을 제공합니다.

## 개발 명령어

### 설치 및 실행
```bash
# 의존성 설치
npm install

# 개발 서버 실행 (localhost:3000)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 시작
npm start

# 린팅 실행
npm run lint
```

### 환경 변수
`.env.local`에 필수로 설정해야 하는 변수들:
- `NEXT_PUBLIC_API_BASE_URL` - 백엔드 API base URL (예: http://152.67.217.61:8080/api)
- `NEXT_PUBLIC_BASE_URL` - 이 앱의 공개 URL (예: https://mygoody.store)
- `NEXT_PUBLIC_IOS_STORE_URL` - iOS App Store URL
- `NEXT_PUBLIC_ANDROID_STORE_URL` - Android Play Store URL

## 아키텍처

### 앱 구조
Next.js 16 App Router 기반의 TypeScript, React 19, Tailwind CSS 4 애플리케이션입니다.

**라우트 패턴**: 서버-클라이언트 분리 패턴을 따릅니다:
- **Server Components** (`page.tsx`): 데이터 fetching, Open Graph 메타데이터 생성, 초기 렌더링 담당
- **Client Components** (`*Client.tsx`): 인터랙션, 딥링크, UI 상태 관리 담당

### 주요 라우트

#### `/goods/[id]` (굿즈 상세)
- **Server**: `app/goods/[id]/page.tsx` - `GET /api/posts/:id`로부터 게시글 데이터 fetch
- **Client**: `app/goods/[id]/GoodsShareClient.tsx` - 이미지 갤러리, 판매자 정보, 상품 아이템 렌더링
- **Deep Link**: `goodyapp://goods/:id`

#### `/profile/[id]` (판매 프로필)
- **Server**: `app/profile/[id]/page.tsx` - `GET /api/users/:userId/profile`로부터 프로필 fetch
- **Client**: `app/profile/[id]/SalesProfileShareClient.tsx` - 판매자 프로필, 평점, 거래 내역 렌더링
- **Deep Link**: `goodyapp://profile/:id`

### 공유 컴포넌트

**AppShareBanner** (`app/_shared/components/AppShareBanner.tsx`):
- 사용자에게 앱에서 열기를 권장하는 고정 배너
- 2.5초 대기 후 앱 스토어로 이동하는 딥링크 처리
- 플랫폼 감지 (iOS/Android)
- `app/_shared/components/index.ts`를 통해 재export

### 데이터 흐름 패턴

1. **Server Component**가 `cache: "no-store"`로 백엔드 API에서 데이터 fetch
2. **generateMetadata**가 소셜 미디어 미리보기용 Open Graph 태그 생성
3. 데이터가 있으면 데이터 props와 함께 **Client Component** 렌더링
4. 데이터가 없으면 `notFound()` 호출
5. **Client Component**가 데이터 + 딥링크를 받아 사용자 인터랙션 처리

### API 연동

모든 API 엔드포인트는 **공개** (인증 불필요):
- Base URL은 `NEXT_PUBLIC_API_BASE_URL`로 설정
- 응답 패턴: `{ success: boolean, data: T }` 또는 직접 데이터 객체
- 에러 처리는 `null` 반환, 404 페이지 트리거

### 딥링크 동작 흐름

1. 사용자가 공유 링크 클릭 (예: `mygoody.store/goods/123`)
2. SNS 미리보기용 Open Graph 메타데이터와 함께 페이지 로드
3. 사용자가 "앱에서 보기" 버튼 클릭
4. 딥링크 열기 시도 (`goodyapp://goods/123`)
5. 2.5초 후에도 페이지에 남아있으면 확인 다이얼로그 표시
6. App Store (iOS) 또는 Play Store (Android)로 리다이렉트

### TypeScript 패턴

- 모든 API 응답 타입은 page 컴포넌트에서 명시적으로 정의
- Props는 Next.js 16 async params를 위해 `Promise<{ id: string }>` 사용
- Client 컴포넌트는 `"use client"` 지시어 사용
- Path alias: `@/*`는 프로젝트 루트에 매핑

### 스타일링

- Tailwind CSS 4 with PostCSS
- 커스텀 컬러: 메인 브랜드 컬러 `#fa6ee4` (핑크)
- Mobile-first 반응형 디자인
- 커스텀 유틸리티: `scrollbar-hide`, aspect ratio 클래스
- Geist 폰트 패밀리 (sans, mono)

## 백엔드 API 요구사항

### 굿즈 엔드포인트
```
GET /api/posts/:id
```
반환 데이터: title, description, thumbnailUrl, artist, goodsCategoryType, user, postItems[], postImages[], timestamps, engagement metrics

### 프로필 엔드포인트
```
GET /api/users/:userId/profile
```
래핑된 응답 반환: `{ success: boolean, data: UserProfile }`
포함 데이터: userId, nickname, profileImageUrl, reviewRating, receivedReviewCount, completedInquiryCount

## React Native 연동

React Native 앱은 딥링크 스킴 `goodyapp://` 사용

공유 링크 생성 패턴:
```typescript
const shareUrl = `${SHARE_WEB_BASE_URL}/${type}/${id}`; // type: 'goods' | 'profile'
```

## Git 워크플로우

- **메인 브랜치**: `develop`
- **PR 템플릿**: `.github/PULL_REQUEST_TEMPLATE.md`에 티켓 참조 및 작업 설명 필수
- **코드 소유자**: `.github/CODEOWNERS`에 정의

## 중요한 컨벤션

- Server 컴포넌트는 Next.js 16 호환성을 위해 `await params` 사용 필수
- 모든 사용자 대면 텍스트는 한국어로 작성
- 이미지 경로는 `/public` 디렉토리의 SVG 에셋 참조
- 시간 포맷팅은 한국어 상대 시간 사용 (예: "방금 전", "3분 전")
- 가격 포맷팅은 한국어 로케일 + "원" 접미사 사용
