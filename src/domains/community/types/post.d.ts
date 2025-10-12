export interface Post {
  postId: number;
  categoryName: string;
  userNickName: string;
  createdAt: string; // ISO 8601 날짜 문자열
  updatedAt: string;
  status: 'PUBLIC' | 'PRIVATE'; // 다른 상태가 있다면 추가
  title: string;
  content: string;
  imageUrls: string[];
  videoUrl: string;
  tags: string[]; // 문자열 배열
  likeCount: number;
  commentCount: number;
  viewCount: number;
}

export interface CommentType {
  commentId: number;
  postId: number;
  userNickName: string;
  createdAt: string;
  updatedAt: string;
  status: 'PUBLIC' | 'PRIVATE' | 'DELETED';
  content: string; //
}
