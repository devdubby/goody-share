'use client';

import AppBanner from "../../components/AppBanner";

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
          <div className="min-h-screen bg-gray-50 flex flex-col items-center">

          <AppBanner onClick={handleOpenApp} position="top" />
          
          <div className="pt-24">
            <div className="min-h-screen bg-gray-50 items-center justify-center p-4">
            
               {/* 로고 + 앱 이름 */}
               <div className="w-full h-12 flex justify-center items-center px-4">
                 <img
                   src="/logo.svg"
                   className="w-10 h-10 m-4 rounded-xl"
                   alt="앱 로고"
                 />
                 <span className="text-black text-center font-semibold text-2xl">Goody</span>
               </div>
          

               {/* 프로필 카드 */}
               <div className="w-full flex justify-center px-4 mt-6 mb-6">
                 <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg overflow-hidden">
                   
          {/* 프로필 헤더 */}
                 <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 text-white">
                   <div className="flex flex-col items-center">
                     <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white mb-4">
                       <img
                         src={profile.profileImageUrl}
                         alt={`${profile.nickname}님의 프로필`}
                         className="w-full h-full object-cover"
                       />
                     </div>
                     <h1 className="text-2xl font-bold">{profile.nickname}</h1>
                   </div>
                 </div>

                 {/* 통계 정보 */}
                 <div className="p-6">
                   <div className="grid grid-cols-3 gap-4 mb-6">
                     <div className="text-center p-4 bg-gray-50 rounded-lg">
                       <div className="text-2xl font-bold text-purple-600">
                         ⭐️ {profile.reviewRating.toFixed(1)}
                       </div>
                       <div className="text-sm text-gray-600 mt-1">평점</div>
                     </div>
                     <div className="text-center p-4 bg-gray-50 rounded-lg">
                       <div className="text-2xl font-bold text-purple-600">
                         💬 {profile.receivedReviewCount}
                       </div>
                       <div className="text-sm text-gray-600 mt-1">후기</div>
                     </div>
                     <div className="text-center p-4 bg-gray-50 rounded-lg">
                       <div className="text-2xl font-bold text-purple-600">
                         ✅ {profile.completedInquiryCount}
                       </div>
                       <div className="text-sm text-gray-600 mt-1">거래내역</div>
                     </div>
                   </div>

                   {/* 앱 열기 버튼 */}
                   <button
                     onClick={handleOpenApp}
                     className="w-full bg-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-purple-700 transition-colors mb-4"
                   >
                     앱에서 보기
                   </button>

                   {/* 앱 다운로드 섹션 */}
                   <div className="border-t border-gray-200 pt-6 mt-6">
                     <p className="text-gray-600 text-center mb-4">
                       앱이 설치되어 있지 않나요?
                     </p>
                     <div className="flex gap-3">
                       <a
                         href={iosStoreUrl}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="flex-1 bg-gray-100 text-gray-800 py-3 px-4 rounded-lg font-medium text-center hover:bg-gray-200 transition-colors"
                       >
                         iOS 다운로드
                       </a>
                       <a
                         href={androidStoreUrl}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="flex-1 bg-gray-100 text-gray-800 py-3 px-4 rounded-lg font-medium text-center hover:bg-gray-200 transition-colors"
                       >
                         Android 다운로드
                       </a>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
          </div>
          </div>
  );
}
