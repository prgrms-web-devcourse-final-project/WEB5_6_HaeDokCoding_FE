export interface Post {
  postId: number;
  categoryName: string;
  userNickName: string;
  createdAt: string; // ISO 8601 날짜 문자열
  updatedAt: string;
  status: 'PUBLIC' | 'PRIVATE'; // 다른 상태가 있다면 추가
  title: string;
  content: string;
  imageUrl: string;
  videoUrl: string;
  tags: string[]; // 문자열 배열
  likeCount: number;
  commentCount: number;
  viewCount: number;
}
