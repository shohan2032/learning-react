export interface AuthState {
    user: string | null;
    users: Map<string, string>;
    error: string | null;
    signUpSuccess: boolean;
}

export type Blog = {
    id: number;
    title: string;
    author: string;
    content: string;
    likeCount: number;
    isPrivate: boolean;
    imageId?: number;
    estimateReadingTime?: number;
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