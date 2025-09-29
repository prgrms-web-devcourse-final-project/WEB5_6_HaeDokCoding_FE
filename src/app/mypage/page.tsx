import { redirect } from 'next/navigation';

function page() {
  return redirect('/mypage/mybar');
}
export default page;
