import { useNavigate } from "react-router-dom";
import { Blog } from "../../interface/reduxInterface";
interface BlogCardProps {
  blog: Blog;
}

const BlogCard:React.FC<BlogCardProps> = ({ blog }) =>  {
  const navigate = useNavigate();

  const truncateContent = (content:string): string => {
    return (
      content.split(" ").slice(0, 100).join(" ") +
      (content.split(" ").length > 100 ? "..." : "")
    );
  };

  const getRelativeTime = (timestamp:number) => {
    const now = new Date();
    const createdAt = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - createdAt.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return `${diffInDays} days ago`;
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) return `${diffInMonths} months ago`;
    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears} years ago`;
  };

  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl duration-300 flex flex-col">
      {/* Blog Image with Overlay */}
      <div className="relative">
        <img
          className="w-full h-48 object-cover"
          src={`https://picsum.photos/seed/${blog.imageId}/600/400`}
          alt="Blog Cover"
        />
        <div className="absolute bottom-0 left-0 bg-black/60 text-white p-4 w-full">
          <h2 className="text-lg font-semibold truncate">{blog.title}</h2>
        </div>
      </div>

      {/* Blog Content */}
      <div className="p-6 bg-gray-50 flex-grow flex flex-col">
        <p className="text-sm text-gray-700 mb-4 flex-grow">
          {truncateContent(blog.content)}
        </p>
        <p className="text-gray-800 font-medium">👤 Author: {blog.author}</p>
        <p className="text-gray-800 font-medium">❤️ Likes: {blog.likeCount}</p>
        <p className="text-gray-500 text-sm">🕒 {getRelativeTime(blog.id)}</p>
        <p className="text-gray-500 text-sm">
          📖 Estimated Read Time: {blog.estimateReadingTime} min
        </p>

        {/* Read More Button */}
        <button
          onClick={() => navigate(`/blog-details/${blog.id}`)}
          className="mt-4 text-center bg-green-500 text-white font-medium rounded-lg py-2 px-6 text-sm transition hover:bg-green-600 focus:ring-4 focus:ring-green-300"
        >
          Read More
        </button>
      </div>
    </div>
  );
}

export default BlogCard;
