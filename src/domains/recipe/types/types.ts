export interface Cocktail {
  alcoholStrength: string;
  cocktailId: number;
  cocktailName: string;
  cocktailImgUrl: string;
  cocktailNameKo: string;
}

export interface RecommendCocktail {
  id: number;
  cocktailNameKo: string;
  cocktailName: string;
  cocktailImgUrl: string;
  alcoholStrength: string;
  alcoholBaseType: string;
}
