import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import GoodsShareClient from './GoodsShareClient';

// 항상 동적 렌더링 (런타임에 페이지 생성)
export const dynamic = 'force-dynamic';

type PostItem = {
  id: number;
  title: string;
  price: number;
  isAvailable: string;
  totalQuantity: number;
  availableQuantity: number;
  thumbnailUrl: string;
  image1Url: string;
  image2Url: string;
  displayOrder: number;
};

type PostImage = {
  id: number;
  imageUrl: string;
  displayOrder: number;
};

type Artist = {
  id: number;
  korName: string;
};

type GoodsCategory = {
  id: number;
  name: string;
};

type User = {
  id: number;
  nickname: string;
  profileImageUrl: string;
  reviewRating: number;
  receivedReviewCount: number;
  completedInquiryCount: number;
  isVerified: string;
  chatAvailableStartTime: number;
  chatAvailableEndTime: number;
};

type PostDetail = {
  id: number;
  title: string;
  description: string;
  isNegotiable: string;
  thumbnailUrl: string;
  artist: Artist;
  goodsCategoryType: GoodsCategory;
  user: User;
  status: string;
  viewCount: number;
  likedCount: number;
  chatRoomCount: number;
  isMyPost: boolean;
  isLiked: boolean;
  inquiringChatCount: number;
  lastInquiryStatus: string;
  chatRoomId: number;
  postType: string;
  hashtag1: string;
  hashtag2: string;
  hashtag3: string;
  hashtag4: string;
  hashtag5: string;
  baseUrl: string;
  postItems: PostItem[];
  postImages: PostImage[];
  createdAt: string;
  updatedAt: string;
};

type Props = {
  params: Promise<{ id: string }>;
};

// API에서 굿즈 정보 가져오기
async function getGoodsDetail(id: string): Promise<PostDetail | null> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${id}`;
  console.log('[getGoodsDetail] API URL:', apiUrl);
  console.log('[getGoodsDetail] ENV:', process.env.NEXT_PUBLIC_API_BASE_URL);

  try {
    const response = await fetch(apiUrl, {
      cache: 'no-store', // 항상 최신 데이터
    });

    console.log('[getGoodsDetail] Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[getGoodsDetail] Response not ok:', response.status, errorText);
      return null;
    }

    const data = await response.json();
    console.log('[getGoodsDetail] Success, got data');
    // API 응답이 { data, success } 구조인 경우 data 추출
    return data.data || data;
  } catch (error) {
    console.error('[getGoodsDetail] Fetch error:', error);
    return null;
  }
}

// Open Graph 메타 태그 생성
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = await getGoodsDetail(id);

  if (!post) {
    return {
      title: '굿즈를 찾을 수 없습니다',
    };
  }

  const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/goods/${id}`;

  // 가격 정보: postItems가 있으면 첫 번째 아이템 가격, 없으면 가격 없음
  const priceText = post.postItems?.[0]?.price ? `${post.postItems[0].price.toLocaleString('ko-KR')}원` : '';

  const description = post.description || priceText;

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      images: [
        {
          url: post.thumbnailUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: 'website',
      url: shareUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [post.thumbnailUrl],
    },
  };
}

export default async function GoodsSharePage({ params }: Props) {
  const { id } = await params;
  const post = await getGoodsDetail(id);

  if (!post) {
    notFound();
  }

  const deepLink = `goodyapp://goods/${id}`;

  return <GoodsShareClient post={post} deepLink={deepLink} />;
}
