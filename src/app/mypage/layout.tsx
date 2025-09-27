import MyNav from '@/domains/mypage/main/MyNav';
import MyProfile from '@/domains/mypage/main/MyProfile';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-1024 page-layout py-12">
      <MyProfile />
      <MyNav />
      {children}
    </div>
  );
}
export default Layout;
