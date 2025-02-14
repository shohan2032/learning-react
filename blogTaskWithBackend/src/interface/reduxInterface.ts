export type User = {
  id: number;
  username: string;
};

export interface AuthState {
  user: User;
  signUpSuccess: boolean;
}

export type Blog = {
  id: number;
  title: string;
  authorId: number;
  authorName: string;
  content: string;
  likeCount: number;
  isPrivate: boolean;
  imageUrl: string;
  estimateReadingTime?: number;
  createdAt: Date;
};

export interface BlogState {
  favoriteBlogs: Map<string, number[]>;
  allLikedBlogs: Map<string, number[]>;
  allBlogs: Blog[];
  myBlogs: Blog[];
  filteredBlogs: Blog[];
  BlogById: Blog | null;
  error: string | null;
}

export interface Store {
  auth: AuthState;
  favoriteBlogs: BlogState;
}
