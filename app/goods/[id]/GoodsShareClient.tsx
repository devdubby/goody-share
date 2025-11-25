"use client";

import { useState } from "react";
import AppShareBanner from "../../components/AppShareBanner";

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
  goodsCategoryType?: GoodsCategory;
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
  tradeMethod?: string;
};

type Props = {
  post: PostDetail;
  deepLink: string;
  iosStoreUrl: string;
  androidStoreUrl: string;
};

function formatTimeAgo(dateString: string): string {
  const now = new Date();
  const past = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) return "방금 전";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}시간 전`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}일 전`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)}주 전`;
  return `${Math.floor(diffInSeconds / 2592000)}개월 전`;
}

export default function GoodsShareClient({
  post,
  deepLink,
  iosStoreUrl,
  androidStoreUrl,
}: Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleOpenApp = () => {
    window.location.href = deepLink;
    setTimeout(() => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isIOS = /iphone|ipad|ipod/.test(userAgent);
      const isAndroid = /android/.test(userAgent);

      if (confirm("앱이 설치되어 있지 않습니다. 스토어로 이동하시겠습니까?")) {
        if (isIOS) {
          window.location.href = iosStoreUrl;
        } else if (isAndroid) {
          window.location.href = androidStoreUrl;
        } else {
          window.location.href = iosStoreUrl;
        }
      }
    }, 2500);
  };

  const hashtags = [
    post.hashtag1,
    post.hashtag2,
    post.hashtag3,
    post.hashtag4,
    post.hashtag5,
  ].filter((tag) => tag && tag.trim() !== "");

  const allImages = [
    post.thumbnailUrl,
    ...post.postImages.map((img) => img.imageUrl),
  ];

    
  return (
    <div className="min-h-screen bg-white">

          <AppShareBanner onClick={handleOpenApp} />
          
      {/* 이미지 갤러리 */}
      <div className="relative w-full aspect-square bg-gray-100">
        <div className="relative w-full h-full overflow-x-scroll snap-x snap-mandatory scrollbar-hide">
          <div className="flex h-full">
            {allImages.map((imageUrl, index) => (
              <div
                key={index}
                className="w-full h-full flex-shrink-0 snap-center"
              >
                <img
                  src={imageUrl}
                  alt={`${post.title} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 이미지 인디케이터 */}
        <div className="absolute bottom-4 right-4 bg-black/40 rounded-full px-3 py-1">
          <span className="text-white text-xs font-medium">
            {currentImageIndex + 1}/{allImages.length}
          </span>
        </div>
      </div>

      {/* 판매자 정보 */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src={post.user.profileImageUrl || "/user-fill.svg"}
              alt={post.user.nickname}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-900">
              {post.user.nickname}
            </span>
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <span className="flex items-center gap-0.5">
                <img src="/star-fill.svg" alt="star" width={12} height={12} />
                <span className="font-semibold text-gray-900">
                  {post.user.reviewRating.toFixed(1)}
                </span>
              </span>
              <span className="text-gray-300">•</span>
              <span>
                후기{" "}
                <span className="font-semibold text-gray-700">
                  {post.user.receivedReviewCount > 99
                    ? "99+"
                    : post.user.receivedReviewCount}
                </span>
              </span>
              <span className="text-gray-300">•</span>
              <span>
                거래내역{" "}
                <span className="font-semibold text-gray-700">
                  {post.user.completedInquiryCount > 99
                    ? "99+"
                    : post.user.completedInquiryCount}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 상품 정보 */}
      <div className="px-5 py-3">
        <h1 className="text-lg font-bold text-gray-900 mb-2.5">{post.title}</h1>

        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs text-gray-500">{formatTimeAgo(post.createdAt)}</span>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <img src="/eye.svg" alt="view" width={14} height={14} />
              <span className="text-xs text-gray-600">{post.viewCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <img src="/heart-grey.svg" alt="like" width={14} height={14} />
              <span className="text-xs text-gray-600">{post.likedCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <img src="/chat.svg" alt="chat" width={14} height={14} />
              <span className="text-xs text-gray-600">{post.chatRoomCount}</span>
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center gap-4 py-1.5">
            <span className="text-sm text-gray-500 w-16">그룹명</span>
            <span className="text-sm text-gray-700 underline">{post.artist.korName}</span>
          </div>
          <div className="flex items-center gap-4 py-1.5">
            <span className="text-sm text-gray-500 w-16">카테고리</span>
            <span className="text-sm text-gray-700">{post.goodsCategoryType?.name || "카테고리 없음"}</span>
          </div>
          {post.tradeMethod && (
            <div className="flex items-center gap-4 py-1.5">
              <span className="text-sm text-gray-500 w-16">거래방식</span>
              <span className="text-sm text-gray-700">{post.tradeMethod}</span>
            </div>
          )}
          <div className="flex items-center gap-4 py-1.5">
            <span className="text-sm text-gray-500 w-16">가격제안</span>
            <span className="text-sm text-gray-700">
              {post.isNegotiable === "Y" ? "가능" : "불가능"}
            </span>
          </div>
        </div>

        <div className="mt-6 mb-4">
          <p className="text-base text-gray-900 whitespace-pre-wrap leading-6">
            {post.description}
          </p>

          {hashtags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-6">
              {hashtags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-0.5 rounded bg-gray-50 text-xs font-medium text-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 판매 중 굿즈 */}
      <div className="px-5 py-3">
        <h2 className="text-lg font-bold text-gray-900 mb-3">판매하고 있는 굿즈</h2>
        <div className="space-y-3">
          {post.postItems.map((item, index) => {
            const isSoldOut = item.isAvailable === "N" || item.availableQuantity === 0;
            const imageCount = [item.thumbnailUrl, item.image1Url, item.image2Url].filter(url => url && url.trim() !== "").length;

            return (
              <div key={item.id}>
                <div className={`flex items-end justify-between gap-3 ${isSoldOut ? "opacity-40" : ""}`}>
                  <div className="flex items-start gap-3 flex-1">
                    <div className="relative rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden" style={{ width: "66px", height: "66px" }}>
                      <img src={item.thumbnailUrl} alt={item.title} className="w-full h-full object-cover" />
                      {imageCount > 0 && (
                        <div className="absolute bottom-1 right-1 bg-black/40 rounded px-1">
                          <span className="text-white text-[11px] font-bold">{imageCount}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col justify-center flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-gray-700">{item.title}</span>
                        <span className={`inline-flex items-center px-1 py-0.5 rounded text-[11px] font-medium ${isSoldOut ? "bg-gray-50 text-gray-600" : item.availableQuantity === 1 ? "bg-red-50 text-red-600" : "bg-gray-50 text-gray-600"}`}>
                          {isSoldOut ? "품절" : `재고 ${item.availableQuantity}개`}
                        </span>
                      </div>
                      <span className="text-base font-bold text-gray-900">{item.price.toLocaleString("ko-KR")}원</span>
                    </div>
                  </div>
                </div>
                {index < post.postItems.length - 1 && <div className="h-px my-3" style={{ backgroundColor: "#DADADD" }} />}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
