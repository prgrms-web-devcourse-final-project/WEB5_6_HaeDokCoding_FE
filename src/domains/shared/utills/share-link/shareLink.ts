export const handleShareKakao = (title: string, src: string, url: string) => {
  const { Kakao } = window;
  Kakao.Share.sendDefault({
    objectType: 'feed', // 공유 타입
    content: {
      title: '🍸SSOUL에서 칵테일 정보보기',
      description: title + '에 대한 정보와 레시피를 한눈에 확인하세요😁',
      imageUrl: src,
      link: {
        mobileWebUrl: url,
        webUrl: url,
      },
    },
    buttons: [
      {
        title: '더 많은 정보 보러가기',
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
    ],
  });
};

export const faceBookShare = () => {
  return window.open(
    'http://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(location.href)
  );
};

export const twitterShare = () => {
  const text = '내용';
  return window.open('https://twitter.com/intent/tweet?text=' + text + '&url=' + location.href);
};

export async function CopyLink() {
  const link = window.location.href;
  await navigator.clipboard.writeText(link);
}
