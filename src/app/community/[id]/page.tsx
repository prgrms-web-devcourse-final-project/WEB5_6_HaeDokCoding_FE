import { Metadata } from 'next';
import { getApi } from '@/app/api/config/appConfig';
import DetailPage from '@/domains/community/detail/DetailPage';

type RouteParams = { id: number };

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { id } = await params;
  const res = await fetch(`${getApi}/posts/${id}`, {
    cache: 'no-store',
  });
  const post = await res.json();
  console.log(post);
  return {
    title: post.title,
    description: post.content?.slice(0, 80),
    openGraph: {
      title: post.title,
      description: post.content?.slice(0, 80),
      url: `https://your-domain.com/community/${id}`,
      images: [
        {
          url: post.imageUrls?.[0],
          width: 800,
          height: 600,
          alt: post.title,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.content?.slice(0, 80),
      images: [post.imageUrls?.[0]],
    },
  };
}

function Page() {
  return <DetailPage />;
}

export default Page;
