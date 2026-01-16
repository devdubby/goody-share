import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import SalesProfileShareClient from './SalesProfileShareClient';

// 항상 동적 렌더링 (런타임에 페이지 생성)
export const dynamic = 'force-dynamic';

type UserProfile = {
  userId: number;
  nickname: string;
  profileImageUrl: string;
  reviewRating: number;
  receivedReviewCount: number;
  completedInquiryCount: number;
};

type UserProfileResponse = {
  success: boolean;
  data: UserProfile;
};

type Props = {
  params: Promise<{ id: string }>;
};

// API에서 판매 프로필 정보 가져오기
async function getSalesProfile(userId: string): Promise<UserProfile | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${userId}/profile`, {
      cache: 'no-store', // 항상 최신 데이터
    });

    if (!response.ok) {
      return null;
    }

    const result: UserProfileResponse = await response.json();

    if (!result.success || !result.data) {
      return null;
    }

    return result.data;
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    return null;
  }
}

// Open Graph 메타 태그 생성
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const profile = await getSalesProfile(id);

  if (!profile) {
    return {
      title: '판매 프로필을 찾을 수 없습니다',
    };
  }

  const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/profile/${id}`;
  const description = `⭐️ ${profile.reviewRating.toFixed(1)} | 💬 후기 ${profile.receivedReviewCount}개 | ✅ 거래 ${profile.completedInquiryCount}건`;

  return {
    title: `${profile.nickname}님의 판매 프로필`,
    description,
    openGraph: {
      title: `${profile.nickname}님의 판매 프로필`,
      description,
      images: [
        {
          url: profile.profileImageUrl,
          width: 1200,
          height: 630,
          alt: `${profile.nickname}님의 프로필`,
        },
      ],
      type: 'profile',
      url: shareUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${profile.nickname}님의 판매 프로필`,
      description,
      images: [profile.profileImageUrl],
    },
  };
}

export default async function SalesProfileSharePage({ params }: Props) {
  const { id } = await params;
  const profile = await getSalesProfile(id);

  if (!profile) {
    notFound();
  }

  const deepLink = `goodyapp://profile/${id}`;

  return <SalesProfileShareClient profile={profile} deepLink={deepLink} />;
}
