import MyNav from '@/domains/mypage/main/MyNav';
import MyProfile from '@/domains/mypage/main/MyProfile';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-1024 page-layout py-12">
      <MyProfile />
      <MyNav />
      <div className="mt-5">{children}</div>
    </div>
  );
}
export default Layout;
