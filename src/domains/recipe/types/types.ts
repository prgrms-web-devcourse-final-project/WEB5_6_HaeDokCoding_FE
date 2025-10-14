export interface Cocktail {
  alcoholStrength: string;
  cocktailId: number;
  cocktailName: string;
  cocktailImgUrl: string;
  cocktailNameKo: string;
  isKeep: boolean;
}

export interface RecommendCocktail {
  id: number;
  cocktailNameKo: string;
  cocktailName: string;
  cocktailImgUrl: string;
  alcoholStrength: string;
  alcoholBaseType: string;
}

export type FormType = {
  categoryName: string;
  title: string;
  content: string;
  imageUrls: string[];
  tags: string[];
};

export type UploadedItem = {
  file: File;
  url: string;
};

export type TagType = {
  alcoholStrength: string;
  cocktailId: number;
  cocktailImgUrl: string;
  cocktailName: string;
  cocktailNameKo: string;
};
export type Sort = 'recent' | 'keeps' | 'comments';
