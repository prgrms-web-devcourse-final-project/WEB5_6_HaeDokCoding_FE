import MyBar from '@/app/mypage/mybar.tsx/MyBar';
import MyComment from "@/domains/mypage/Pages/MyComment";
import Link from "next/link";
// import MyPost from "@/domains/mypage/Pages/MyPost";

// import MyAlarm from "@/domains/mypage/Pages/MyAlarm";
// import MySetting from "@/domains/mypage/Pages/MySetting";

function page() {
  return (
    <div className="mt-10">
      <Link href="/myBar"><MyBar></MyBar></Link>

      {/* <MyPost></MyPost> */}
      <MyComment></MyComment>
      {/* <MyAlarm></MyAlarm> */}
      {/* <MySetting></MySetting> */}
    </div>
  );
}
export default page;
