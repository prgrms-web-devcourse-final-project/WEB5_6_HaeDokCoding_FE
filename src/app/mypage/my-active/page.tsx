import { redirect } from 'next/navigation';

function page() {
  return redirect('/mypage/my-active/my-post');
}
export default page;
