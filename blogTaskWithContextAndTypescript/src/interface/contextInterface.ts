export interface AuthState {
    user: string | null;
    users: Map<string,string>;
    error:string | null;
    signUpSuccess: boolean;
}

export type AuthAction =
  | { type: "SIGNUP"; payload: { username: string; password: string } }
  | { type: "RESET_SIGNUP" }
  | { type: "LOGIN"; payload: { username: string; password: string } }
  | { type: "LOGOUT" }
  | { type: "CLEAR_ERROR" };

export type Blog = {
    id: number;
    title: string;
    author: string;
    content: string;
    likeCount: number;
    isPrivate: boolean;
    imageId?: number;
    estimateReadingTime?: number;
}

export interface BlogState {
    favoriteBlogs: Map<string, number[]>;
    allLikedBlogs: Map<string, number[]>;
    allBlogs: Blog[];
    myBlogs: Blog[];
    filteredBlogs: Blog[];
    BlogById: Blog | null;
    error: string | null;
}

export type BlogAction = 
    | { type: "addFavorite"; payload: { username: string; blogId: number}}
    | { type: "removeFavorite"; payload: { username: string; blogId: number }}
    | { type: "addBlog"; payload: Omit<Blog, "id" | "likeCount">}
    | { type: "likeBlog"; payload: { blogId: number }}
    | { type: "dislikeBlog"; payload: { blogId: number }}
    | { type: "deleteBlog"; payload: { blogId: number }}
    | { type: "updateBlog"; payload: { blogId: number; title?: string; content?: string } }
    | { type: "filterBlogsByAuthor"; payload: { author: string }}
    | { type: "filterBlogsBySearchTerm"; payload: { searchTerm: string }}
    | { type: "filteredBlogById"; payload: { blogId: number}}
    | { type: "addLikedBlog"; payload: { username: string; blogId: number}}
    | { type: "removeLikedBlog"; payload: { username: string; blogId: number}}
    | { type: "CLEAR_ERROR"; }
