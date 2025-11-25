'use client';

import AppShareBanner from "../../components/AppShareBanner";

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
  iosStoreUrl: string;
  androidStoreUrl: string;
};

export default function SalesProfileShareClient({
  profile,
  deepLink,
  iosStoreUrl,
  androidStoreUrl,
}: Props) {
  const handleOpenApp = () => {
    // 딥링크 시도
    window.location.href = deepLink;

    // 2.5초 후에도 페이지가 남아있으면 앱이 없는 것으로 판단
    setTimeout(() => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isIOS = /iphone|ipad|ipod/.test(userAgent);
      const isAndroid = /android/.test(userAgent);

      if (
        confirm(
          '앱이 설치되어 있지 않습니다. 스토어로 이동하시겠습니까?'
        )
      ) {
        if (isIOS) {
          window.location.href = iosStoreUrl;
        } else if (isAndroid) {
          window.location.href = androidStoreUrl;
        } else {
          // 데스크톱인 경우 iOS 스토어로
          window.location.href = iosStoreUrl;
        }
      }
    }, 2500);
  };

    return (
      <div className="min-h-screen flex flex-col">

        <AppShareBanner onClick={handleOpenApp} />

        <div className="pt-28 p-4">

          {/* 로고 + 앱 이름 */}
          <div className="w-full h-12 flex justify-center items-center px-4">
            <img
              src="/logo.svg"
              className="w-9 h-9 m-4 rounded-xl"
              alt="앱 로고"
            />
            <span className="text-black text-center font-semibold text-2xl">Goody</span>
          </div>

          <div className="border-t border-gray-100 mt-6"></div>

          {/* 프로필 카드 */}
          <div className="w-full flex justify-center mt-10 mb-10">
            <div className="max-w-2xl w-full rounded-2xl overflow-hidden">

              {/* 프로필 헤더 */}
              <div className="bg-gradient-to-r text-white">
                <div className="flex flex-col items-center mb-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white">
                    <img
                      src={profile.profileImageUrl}
                      alt={`${profile.nickname}님의 프로필`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h1 className="text-xl text-black p-2 font-bold">{profile.nickname}</h1>
                </div>
              </div>

              {/* 통계 정보 */}
              <div className="p-2">
                <div className="flex ring ring-gray-200 rounded-lg overflow-hidden mb-4">

                  <div className="flex-1 text-center p-4">
                    <div className="text-sm text-gray-500">평점</div>
                    <div className="text-xl font-semibold p-2">
                      ⭐ {profile.reviewRating.toFixed(1)}
                    </div>
                  </div>

                  {/* 세로선 */}
                  <div className="w-px bg-gray-100"></div>

                  <div className="flex-1 text-center p-4">
                    <div className="text-sm text-gray-500">후기</div>
                    <div className="text-xl font-semibold p-2">
                      {profile.receivedReviewCount}
                    </div>
                  </div>

                  {/* 세로선 */}
                  <div className="w-px bg-gray-100"></div>

                  <div className="flex-1 text-center p-4">
                    <div className="text-sm text-gray-500">거래내역</div>
                    <div className="text-xl font-semibold p-2">
                      {profile.completedInquiryCount}
                    </div>
                  </div>

                </div>

                {/* 앱 다운로드 섹션 */}
                <div>
                  <div className="ring ring-gray-200 rounded-lg p-4 flex justify-between bg-gray-100">

                    <span>
                      <span className="text-sm sm:text-base font-bold">
                        ‘구디마켓’님의 판매물품 보기
                      </span>
                      <br />
                      <span className="text-xs sm:text-sm">
                        앱에서 판매하고 있는 굿즈를 자세히 물어볼 수 있어요
                      </span>
                    </span>

                    <div className="flex-col">
                      <a
                        href={iosStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src="/app-store.svg" alt="Apple" className="mb-1"/>
                      </a>
                      <a
                        href={androidStoreUrl}
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
          <span className="text-xs">
            구디(Goody)는 판매 상품을 제외한 모든 상품들에 대하여 구디(Goody)라는 통신판매중개자로서 거래 당사자가 아니며 판매 회원과 구매 회원간의 상품거래 정보 및 거래에 관여하지 않고 어떠한 의무와 책임도 부담하지 않습니다.
          </span>
        </div>

      </div>
    );
}
