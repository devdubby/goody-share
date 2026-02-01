'use client';

import AppShareBanner from '../../_shared/components';

type UserProfile = {
  userId: number;
  nickname: string;
  profileImageUrl: string;
  reviewRating: number;
  receivedReviewCount: number;
  completedInquiryCount: number;
};

type Props = {
  profile: UserProfile;
  deepLink: string;
};

export default function SalesProfileShareClient({ profile, deepLink }: Props) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <AppShareBanner deepLink={deepLink} />;
      <div className="pt-28 p-4 bg-white">
        {/* 로고 */}
        <div className="w-full flex justify-center items-center px-4">
          <img src="/goody-logo.png" className="h-10" alt="Goody 로고" />
        </div>

        <div className="border-t border-gray-200 mt-6"></div>

        {/* 프로필 카드 */}
        <div className="w-full flex justify-center mt-10 mb-10">
          <div className="max-w-2xl w-full rounded-2xl overflow-hidden bg-white">
            {/* 프로필 헤더 */}
            <div className="bg-white">
              <div className="flex flex-col items-center mb-4">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-200">
                  <img
                    src={profile.profileImageUrl}
                    alt={`${profile.nickname}님의 프로필`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h1 className="text-xl text-gray-900 p-2 font-bold">{profile.nickname}</h1>
              </div>
            </div>

            {/* 통계 정보 */}
            <div className="p-2 bg-white">
              <div className="flex ring-1 ring-gray-200 rounded-lg overflow-hidden mb-4 bg-white">
                <div className="flex-1 text-center p-4">
                  <div className="text-sm text-gray-500">평점</div>
                  <div className="text-xl font-semibold p-2 text-gray-900 flex items-center justify-center gap-1">
                    <img src="/star.svg" alt="별점" className="w-5 h-5" />
                    {profile.reviewRating.toFixed(1)}
                  </div>
                </div>

                {/* 세로선 */}
                <div className="w-px bg-gray-200"></div>

                <div className="flex-1 text-center p-4">
                  <div className="text-sm text-gray-500">후기</div>
                  <div className="text-xl font-semibold p-2 text-gray-900">{profile.receivedReviewCount}</div>
                </div>

                {/* 세로선 */}
                <div className="w-px bg-gray-200"></div>

                <div className="flex-1 text-center p-4">
                  <div className="text-sm text-gray-500">거래내역</div>
                  <div className="text-xl font-semibold p-2 text-gray-900">{profile.completedInquiryCount}</div>
                </div>
              </div>

              {/* 앱 다운로드 섹션 */}
              <div>
                <div className="ring-1 ring-gray-200 rounded-lg p-4 flex justify-between bg-gray-100">
                  <span className="text-gray-900">
                    <span className="text-sm sm:text-base font-bold text-gray-900">
                      &apos;{profile.nickname}&apos;님의 판매물품 보기
                    </span>
                    <br />
                    <span className="text-xs sm:text-sm text-gray-600">
                      앱에서 판매하고 있는 굿즈를 자세히 물어볼 수 있어요
                    </span>
                  </span>

                  <div className="flex-col">
                    <a
                      href="https://apps.apple.com/kr/app/%EA%B5%AC%EB%94%94-goody/id6751756644"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src="/app-store.svg" alt="Apple" className="mb-1" />
                    </a>
                    <a
                      href="https://play.google.com/store/apps/details?id=com.goody.app"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src="/google-play.svg" alt="google" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="bg-gray-100 p-6 mt-auto w-full">
        <span className="text-xs text-gray-600">
          구디(Goody)는 판매 상품을 제외한 모든 상품들에 대하여 구디(Goody)라는 통신판매중개자로서 거래 당사자가 아니며
          판매 회원과 구매 회원간의 상품거래 정보 및 거래에 관여하지 않고 어떠한 의무와 책임도 부담하지 않습니다.
        </span>
      </div>
    </div>
  );
}
