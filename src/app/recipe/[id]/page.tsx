import { getApi } from '@/app/api/config/appConfig';
import DetailMain from '@/domains/recipe/details/DetailMain';
import StarBg from '@/domains/shared/components/star-bg/StarBg';
import { Metadata } from 'next';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const res = await fetch(`${getApi}/cocktails/${id}`);
  const recipe = await res.json();
  return {
    title: `${recipe.data.cocktailNameKo}`,
    description: `${recipe.data.cocktailNameKo} 레시피`,
    openGraph: {
      title: recipe.title,
      images: [recipe.data.cocktailImgUrl],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      description: `${recipe.data.cocktailNameKo} 레시피`,
      title: `${recipe.data.cocktailNameKo}`,
      images: [recipe.data.cocktailImgUrl],
    },
  };
}

export async function Page({ params }: Props) {
  const { id } = await params;

  return (
    <div className="w-full relative">
      <StarBg className="absolute top-0 left-0 h-200 lg:h-200" />
      <DetailMain id={id} />
    </div>
  );
}
export default Page;
