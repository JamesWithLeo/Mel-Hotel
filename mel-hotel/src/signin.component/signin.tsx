export default function Signin() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center bg-gray-100">
      <div className="min-w-md flex h-max w-full max-w-md flex-col gap-4 rounded-md px-8 py-8 shadow drop-shadow">
        <h1 className="text-primarydark font-fauna mb-8 text-center text-3xl font-bold">
          Mel Hotel
        </h1>
        <input
          placeholder="Enter gmail"
          type="text"
          required
          className="outline-primarydarker rounded bg-gray-200 px-2 py-2"
        />
        <input
          placeholder="Enter password"
          type="password"
          required
          className="outline-primarydarker rounded bg-gray-200 px-2 py-2"
        />
        <button className="text-primarydarker self-end text-xs">
          forgot password
        </button>
        <button className="rounded bg-[#f09247] py-2 text-white shadow">
          Login
        </button>
        <div>
          <hr className="h-[4px] w-full bg-gray-400" />
        </div>
        <button className="text-contrast rounded bg-gray-50 py-2 shadow">
          Continue with Google
        </button>
      </div>
    </div>
  );
}
