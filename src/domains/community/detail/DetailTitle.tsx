import Profile from '../../shared/components/profile/Profile';

type Props = {
  title: string;
  userNickname: string;
};

function DetailTitle({ title, userNickname }: Props) {
  return (
    <section className="flex flex-col gap-4 mt-3">
      <h1 className="sm:text-3xl text-2xl">{title}</h1>
      <Profile userNickname={userNickname} />
    </section>
  );
}

export default DetailTitle;
