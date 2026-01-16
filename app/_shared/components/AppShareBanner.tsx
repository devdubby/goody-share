type AppShareBannerProps = {
  deepLink: string;
};

const AppShareBanner = ({ deepLink }: AppShareBannerProps) => {
  const iosStoreUrl =
    process.env.NEXT_PUBLIC_IOS_STORE_URL || 'https://apps.apple.com/kr/app/%EA%B5%AC%EB%94%94-goody/id6751756644';
  const androidStoreUrl =
    process.env.NEXT_PUBLIC_ANDROID_STORE_URL || 'https://play.google.com/store/apps/details?id=com.goody.app';
  const handleOpenApp = () => {
    // 딥링크
    window.location.href = deepLink;

    // 2.5초 후에도 페이지가 남아있으면 앱이 없는 것으로 판단
    setTimeout(() => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isIOS = /iphone|ipad|ipod/.test(userAgent);
      const isAndroid = /android/.test(userAgent);

      if (confirm('앱이 설치되어 있지 않습니다. 스토어로 이동하시겠습니까?')) {
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
    <div className={`fixed left-0 w-full bg-gray-100 shadow-md z-50 flex justify-between items-center px-4 py-4`}>
      <div className="flex items-center">
        <img src="/app-logo.svg" className="w-[50px] h-[50px] rounded-xl" alt="앱 로고" />
        <div className="flex flex-col justify-center ml-3 text-[#0F0F10]">
          <span className="font-semibold text-sm md:text-base">내가 찾는 굿즈 앱에서</span>
          <span className="font-semibold text-sm md:text-base">편리하게 보기</span>
        </div>
      </div>
      <button
        onClick={handleOpenApp}
        className="rounded-xl px-4 py-2 bg-[#fa6ee4] font-semibold text-white hover:bg-gray-100 transition-colors text-sm md:text-base"
      >
        앱에서 보기
      </button>
    </div>
  );
};

export default AppShareBanner;
