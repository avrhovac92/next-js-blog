import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateUserInput } from "../schema/user.schema";
import { trpc } from "../utils/trpc";

const LoginForm: React.FC = () => {
  const [success, setSuccess] = useState(false);
  const { handleSubmit, register } = useForm<CreateUserInput>();
  const router = useRouter();
  const { mutate, error } = trpc.useMutation(["user.login-otp"], {
    onSuccess: () => {
      setSuccess(true);
    },
  });

  function onSubmit(values: CreateUserInput) {
    mutate({ ...values, redirect: router.asPath });
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && error.message}
      {success && (
        <p className="text-md text-gray-700 font-bold m-3">Check Your Email</p>
      )}
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
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
