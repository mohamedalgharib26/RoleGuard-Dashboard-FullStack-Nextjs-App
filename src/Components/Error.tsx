import Link from "next/link";

type Props = {
  error: string | null;
};

function ErrorComponent({ error }: Props) {
  return (
    <div>
      {error && (
        <>
          <div
            className=" flex flex-col justify-center items-center m-4 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{error}</span>{" "}
            <Link href={"/"}>
              <button className="bg-green-400 px-6 py-2 m-3 text-white rounded-2xl hover:bg-green-600 ">
                Home{" "}
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default ErrorComponent;
