import Image from 'next/image';
import prePost from '@/shared/assets/images/prepost_img.webp';
import PostInfo from '../PostInfo';

function DetailContent() {
  return (
    <section>
      <figure>
        <Image src={prePost} alt="더미 이미지" width={100} height={100} />
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
