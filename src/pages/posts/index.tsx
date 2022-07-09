import { trpc } from "../../utils/trpc";
import Error from "next/error";
import Post from "../../components/Post";

export default function PostsPage() {
  const { data, isLoading } = trpc.useQuery(["post.get-all"]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!data) {
    return <Error statusCode={404} />;
  }

  return (
    <div className="w-full min-h-screen bg-gray-200 p-20">
      {data.map((item) => (
        <div key={item.id} className="mt-3">
          <Post title={item.title} body={item.body} />
        </div>
      ))}
    </div>
  );
}
