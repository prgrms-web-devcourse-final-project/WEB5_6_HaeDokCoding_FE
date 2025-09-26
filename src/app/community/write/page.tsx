import Category from '@/domains/community/write/Category';
import CompleteBtn from '@/domains/community/write/CompleteBtn';
import FormTitle from '@/domains/community/write/FormTitle';
import WriteForm from '@/domains/community/write/WriteForm';
import StarBg from '@/domains/shared/starBg/StarBg';

function Page() {
  return (
    <div className="w-full relative">
      <StarBg className="w-full h-32 absolute"></StarBg>
      <div className="page-layout max-w-824 z-5">
        <CompleteBtn />
        <section>
          <FormTitle />
          <Category />
          <WriteForm />
        </section>
      </div>
    </div>
  );
}

export default Page;
