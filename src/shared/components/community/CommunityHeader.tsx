import PageHeader from '../pageHeader/PageHeader';
import headerImg from '@/shared/assets/images/community_page_header.webp';

function CommunityHeader() {
  return (
    <section aria-label="커뮤니티 헤더">
      <PageHeader src={headerImg} title="Community" description="칵테일에 관한 모든 이야기" />
    </section>
  );
}

export default CommunityHeader;
