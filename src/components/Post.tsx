import Link from "next/link";

type Props = {
  title: string;
  body: string;
  id?: string;
};

const Post: React.FC<Props> = ({ title, body, id }) => {
  return (
    <div className="bg-white w-1/2 px-8 pt-6 pb-8 shadow-lg rounded m-auto">
      {id ? (
        <Link href={`posts/${id}`}>
          <h1 className="text-7xl text-gray-900 font-bold m-3 hover:cursor-pointer">
            {title}
          </h1>
        </Link>
      ) : (
        <h1 className="text-7xl text-gray-900 font-bold m-3">{title}</h1>
      )}
      <p className="text-lg text-gray-600 font-semibold mx-3 my-6">{body}</p>
    </div>
  );
};

export default Post;
