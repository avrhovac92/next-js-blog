import { useRouter } from 'next/router';

export const Redirection: React.FC = () => {
  const router = useRouter();
  const goTo = (pageName: string) => {
    router.push(`/${pageName}`);
  };
  return (
    <div className="flex justify-evenly m-7 p-3">
      <button onClick={() => goTo('')} className="rounded-full bg-blue-300 p-5">
        Home
      </button>
      <button onClick={() => goTo('register')} className="rounded-full bg-blue-300 p-5">
        Register
      </button>
      <button onClick={() => goTo('login')} className="rounded-full bg-blue-300 p-5">
        Login
      </button>
      <button onClick={() => goTo('posts/new')} className="rounded-full bg-blue-300 p-5">
        Create New Post
      </button>
      <button onClick={() => goTo('posts')} className="rounded-full bg-blue-300 p-5">
        Posts
      </button>
    </div>
  );
};
