import Error from 'next/error';
import { useRouter } from 'next/router';
import Post from '../../components/Post';
import { trpc } from '../../utils/trpc';

function PostPage() {
  const router = useRouter();
  const postId = router.query.postId as string;
  const { data, isLoading } = trpc.useQuery(['post.get', { postId }]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <Error statusCode={404} />;
  }

  return (
    <div className="w-full min-h-screen bg-gray-200 p-20">
      <Post
        title={data.title}
        body={data.body}
        userEmail={data.user.email}
        userName={data.user.name}
      />
    </div>
  );
}

export default PostPage;
