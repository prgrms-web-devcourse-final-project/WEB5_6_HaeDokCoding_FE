function Profile() {
  return (
    <div className="flex gap-2 items-center justify-start">
      <div className="w-7 h-7 rounded-full bg-secondary" aria-label="작성자 칵테일 아이콘"></div>
      <span aria-label="작성자 이름" className="text-sm">
        실버븬
      </span>
    </div>
  );
}

export default Profile;
