# Goody Share - 공유 웹 페이지

GOODY 앱의 굿즈 및 판매 프로필을 공유하기 위한 Next.js 웹 애플리케이션입니다.

## 주요 기능

- 📱 **딥링크 지원**: 앱이 설치된 경우 자동으로 앱 열기
- 🔗 **Open Graph**: 카카오톡, 인스타그램 등에서 썸네일 미리보기 지원
- 🎨 **반응형 디자인**: 모바일/데스크톱 모두 지원
- ⚡️ **서버 사이드 렌더링**: SEO 최적화 및 빠른 로딩

## 지원 공유 링크

### 굿즈 상세

```
https://mygoody.store/goods/123
```

- 굿즈 제목, 설명, 가격, 이미지
- 딥링크: `goodyapp://goods/123`

### 판매 프로필

```
https://mygoody.store/profile/456
```

- 닉네임, 프로필 이미지
- 평점, 후기 개수, 거래 내역
- 딥링크: `goodyapp://profile/456`

## 기술 스택

- **프레임워크**: Next.js 16 (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **배포**: Vercel

## 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.local` 파일을 생성하고 다음 변수들을 설정하세요:

```bash
# .env.local
NEXT_PUBLIC_API_BASE_URL=http://152.67.217.61:8080/api
NEXT_PUBLIC_BASE_URL=https://mygoody.store
NEXT_PUBLIC_IOS_STORE_URL=https://apps.apple.com/kr/app/goody/id[APP_ID]
NEXT_PUBLIC_ANDROID_STORE_URL=https://play.google.com/store/apps/details?id=com.goody.app
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 http://localhost:3000 접속

### 4. 프로덕션 빌드

```bash
npm run build
npm start
```

## Vercel 배포

### 1. Vercel 계정 연결

```bash
npm install -g vercel
vercel login
```

### 2. 프로젝트 배포

```bash
vercel
```

### 3. 환경 변수 설정

Vercel 대시보드에서 Environment Variables 추가:

- `NEXT_PUBLIC_API_BASE_URL`
- `NEXT_PUBLIC_BASE_URL`
- `NEXT_PUBLIC_IOS_STORE_URL`
- `NEXT_PUBLIC_ANDROID_STORE_URL`

### 4. 프로덕션 배포

```bash
vercel --prod
```

## API 요구사항

백엔드 API는 다음 엔드포인트를 제공해야 합니다:

### 굿즈 상세 (게시글)

```
GET /api/posts/:id
```

**Response**:

```json
{
  "id": 123,
  "title": "뉴진스 앨범 팝니다.",
  "description": "상태 새거. 조아용",
  "thumbnailUrl": "https://...",
  "artist": {
    "id": 1,
    "korName": "뉴진스"
  },
  "postItems": [
    {
      "id": 1,
      "title": "하위 아이템 제목",
      "price": 50000,
      "thumbnailUrl": "https://..."
    }
  ],
  "user": {
    "id": 456,
    "nickname": "판매자닉네임",
    "profileImageUrl": "https://..."
  }
}
```

### 사용자 프로필

```
GET /api/users/:userId/profile
```

**Response**:

```json
{
  "success": true,
  "data": {
    "userId": 456,
    "nickname": "닉네임",
    "profileImageUrl": "https://...",
    "reviewRating": 4.8,
    "receivedReviewCount": 45,
    "completedInquiryCount": 32
  }
}
```

**중요**: 이 엔드포인트들은 **인증 없이 접근 가능**해야 합니다 (공개 조회).

## 딥링크 동작 방식

1. 사용자가 공유 링크 클릭
2. 웹 페이지 로드 (Open Graph 메타 태그로 SNS 미리보기 표시)
3. "앱에서 보기" 버튼 클릭
4. **앱 설치됨**: `goodyapp://` 스킴으로 앱 자동 열림
5. **앱 미설치**: 2.5초 후 확인 다이얼로그 → App Store/Play Store 이동

## React Native 앱 연동

React Native 앱에서 공유 링크를 사용하려면:

```typescript
// app/_shared/constants/appLinks.ts
export const SHARE_WEB_BASE_URL = 'https://mygoody.store';

export const createShareLink = (type: 'goods' | 'profile', id: number | string): string => {
  return `${SHARE_WEB_BASE_URL}/${type}/${id}`;
};

// GoodsDetailScreen.tsx
import { createShareLink } from '@/app/_shared/constants/appLinks';

const handleShare = async () => {
  const shareUrl = createShareLink('goods', postId);

  await Share.share({
    title: postDetail.title,
    message: `${postDetail.title}\n\n${shareUrl}`,
    url: shareUrl,
  });
};
```

## 디렉토리 구조

```
goody-share/
├── app/
│   ├── goods/
│   │   └── [id]/
│   │       ├── page.tsx              # 서버 컴포넌트
│   │       └── GoodsShareClient.tsx  # 클라이언트 컴포넌트
│   ├── profile/
│   │   └── [id]/
│   │       ├── page.tsx
│   │       └── SalesProfileShareClient.tsx
│   ├── layout.tsx
│   └── page.tsx
├── .env.local           # 로컬 환경 변수
├── .env.example         # 환경 변수 예시
└── README.md
```

## 문제 해결

### Open Graph 이미지가 표시되지 않음

- 이미지 URL이 HTTPS인지 확인
- 이미지 크기가 적절한지 확인 (최소 1200x630 권장)
- 카카오톡 캐시 초기화 필요할 수 있음

### 딥링크가 작동하지 않음

- React Native 앱의 `app.config.js`에 `scheme: 'goodyapp'` 설정 확인
- 앱이 실제로 설치되어 있는지 확인
- 브라우저 설정에서 앱 열기 권한 확인

### API 호출 실패

- 환경 변수 `NEXT_PUBLIC_API_BASE_URL` 확인
- CORS 설정 확인 (백엔드에서 Vercel 도메인 허용)
- API 엔드포인트가 인증 없이 접근 가능한지 확인

## 라이센스

GOODY © 2025
