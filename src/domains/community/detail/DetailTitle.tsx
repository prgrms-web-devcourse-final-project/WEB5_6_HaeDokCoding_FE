import Profile from './Profile';

function DetailTitle() {
  return (
    <section className="flex flex-col gap-4 mt-3">
      <h1 className="sm:text-3xl text-2xl">칵테일 만들 때 준비물</h1>
      <Profile />
    </section>
  );
}

export default DetailTitle;
