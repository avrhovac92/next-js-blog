import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Redirection } from "../components/Redirection";
import { useUserContext } from "../context/user.context";
import { RemoveUserInput } from "../schema/user.schema";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const user = useUserContext();
  const { data, error, isLoading } = trpc.useQuery(["user.get-all"], {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
  const { mutate, error: err } = trpc.useMutation(["user.remove"], {
    onSuccess: () => {
      utils.invalidateQueries("user.get-all");
    },
  });
  const utils = trpc.useContext();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{`Something went wrong: ${JSON.stringify(error)}`}</div>;
  }

  const dataFields = Object.keys((data && data[0]) || {});
  const removeUser = async (userId: RemoveUserInput) => {
    if (err) {
      return setErrorMessage(err.message);
    }

    mutate(userId);
  };

  return (
    <div className="w-full min-h-screen bg-gray-200 p-20">
      {errorMessage && errorMessage}
      {user && (
        <>
          <div className="flex container justify-center">
            <div className="flex flex-col items-center w-1/2 border border-gray-300 shadow-md rounded-lg">
              <p className="text-xl my-5 font-bold border">
                {user.id} - {user.email}
              </p>
              <Link href="/posts/new">
                <p className="text-2xl font-semibold text-blue-700">
                  Create Post
                </p>
              </Link>
            </div>
          </div>
        </>
      )}
      <h1 className="text-4xl my-5 text-gray-800">User List</h1>
      <table className="border-separate rounded-lg border border-gray-300 shadow-md bg-gray-50">
        <thead className="bg-gray-200">
          <tr>
            <th></th>
            {dataFields.map((fieldName, index) => (
              <th key={index}>{fieldName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, iKey) => (
              <tr className="bg-gray-100" key={iKey}>
                <td className="px-2">
                  <Image
                    src="/remove-user.svg"
                    className="hover:cursor-pointer"
                    onClick={() => removeUser(item.id)}
                    alt="delete"
                    width={50}
                    height={50}
                  />
                </td>
                {Object.values(item).map((prop, pKey) => (
                  <td key={`c-${pKey}`}>{prop.toString()}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
      <Redirection />
    </div>
  );
};

export default Home;
