import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Redirection } from "../components/Redirection";
import { CreateUserInput } from "../schema/user.schema";
import { trpc } from "../utils/trpc";

function RegisterPage() {
  const { handleSubmit, register } = useForm<CreateUserInput>();
  const router = useRouter();
  const { mutate, error } = trpc.useMutation(["user.register"], {
    onSuccess: () => {
      router.push("/login");
    },
  });

  function onSubmit(values: CreateUserInput) {
    mutate(values);
  }

  return (
    <div className="w-full min-h-screen bg-gray-200 p-20">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-1/2 px-8 pt-6 pb-8 shadow-lg rounded m-auto"
      >
        {error && error.message}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-blue-200 focus:shadow-outline focus:outline-none focus:shadow-lg focus:shadow-blue-200"
            id="email"
            type="email"
            placeholder="Email"
            {...register("email")}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-blue-200 focus:shadow-outline focus:outline-none focus:shadow-lg focus:shadow-blue-200"
            id="name"
            type="text"
            placeholder="Name"
            {...register("name")}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Register
        </button>
      </form>

      <Redirection />
    </div>
  );
}

export default RegisterPage;
