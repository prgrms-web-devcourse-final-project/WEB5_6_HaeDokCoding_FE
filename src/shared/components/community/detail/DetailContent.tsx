import Image from 'next/image';
import prePost from '@/shared/assets/images/prepost_img.webp';
import PostInfo from '../PostInfo';

function DetailContent() {
  return (
    <section className="mt-5 flex flex-col items-start w-full">
      <figure className="w-full flex items-center justify-center sm:justify-start">
        <Image
          src={prePost}
          alt="더미 이미지"
          width={300}
          height={300}
          className="sm:w-[80%] w-full"
        />
      </figure>
      <ul>
        <li>
          <p>내용은 이거입니다 하하하</p>
        </li>
        <li>
          <p>그런가요 안녕하세요</p>
        </li>
        <li>
          <p>글입니다다다다다다다다다다다다</p>
        </li>
      </ul>
      <PostInfo />
    </section>
  );
}

export default DetailContent;
