import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CreatePostInput } from "../../schema/post.schema";
import { trpc } from "../../utils/trpc";

function CreatePostPage() {
  const { handleSubmit, register } = useForm<CreatePostInput>();
  const router = useRouter();
  const { mutate, error } = trpc.useMutation(["post.create"], {
    onSuccess: (data) => {
      if (data) {
        router.push(`/posts/${data.id}`);
      }
    },
  });

  function onSubmit(values: CreatePostInput) {
    mutate(values);
  }

  return (
    <div className="w-full min-h-screen bg-gray-200 p-20">
      <div className="bg-white w-1/2 px-8 pt-6 pb-8 shadow-lg rounded m-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          {error && error.message}
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-blue-200 focus:shadow-outline focus:outline-none focus:shadow-lg focus:shadow-blue-200"
              id="title"
              type="text"
              placeholder="Title"
              {...register("title")}
            />
          </div>
          <div className="mb-4">
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-blue-200 focus:shadow-outline focus:outline-none focus:shadow-lg focus:shadow-blue-200"
              id="body"
              placeholder="Post message..."
              {...register("body")}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePostPage;
