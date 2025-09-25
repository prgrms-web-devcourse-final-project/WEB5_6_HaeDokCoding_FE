import Profile from './Profile';

function DetailTitle() {
  return (
    <section className="flex flex-col gap-3 mt-3">
      <h1 className="text-2xl">칵테일 만들 때 준비물</h1>
      <Profile />
    </section>
  );
}

export default DetailTitle;
