<<<<<<<< HEAD:src/domains/community/main/CommunityHeader.tsx
import PageHeader from '../../shared/components/page-header/PageHeader';
========
import PageHeader from '../shared/components/page-header/PageHeader';
>>>>>>>> dev:src/domains/community/CommunityHeader.tsx

function CommunityHeader() {
  return (
    <section aria-label="커뮤니티 헤더">
      <PageHeader title="Community" description="칵테일에 관한 모든 이야기" />
    </section>
  );
}

export default CommunityHeader;
