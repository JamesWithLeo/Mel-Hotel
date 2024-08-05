import { useDispatch } from "react-redux";
import { ICredentials, Login } from "../redux slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { hotelStore } from "../hotelStore";

export default function LoginFC() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onLogin = async () => {
    const gmailElement = document.getElementById(
      "inputGmail",
    ) as HTMLInputElement;
    const passwordElement = document.getElementById(
      "inputPassword",
    ) as HTMLInputElement;
    const gmail: string = gmailElement.value;
    const password: string = passwordElement.value;
    if (!gmail || !password) {
      // empty entry, do nothing.
      return;
    }
    // do authorization
    const credentials: ICredentials = { gmail, password };
    dispatch(Login(credentials));
    console.log(credentials);
    console.log(hotelStore.getState().auth);
    navigate("/profile", { replace: false });
  };

  return (
    <div className="flex h-dvh flex-col items-center justify-center bg-gray-100">
      <div className="min-w-md flex h-max w-full max-w-md flex-col gap-4 rounded-md px-8 py-8 shadow drop-shadow">
        <h1 className="text-primarydark font-fauna mb-8 text-center text-3xl font-bold">
          Mel Hotel
        </h1>
        <input
          id="inputGmail"
          placeholder="Enter gmail"
          type="text"
          required
          className="outline-primarydarker rounded bg-gray-200 px-2 py-2"
        />
        <input
          id="inputPassword"
          placeholder="Enter password"
          type="password"
          required
          className="outline-primarydarker rounded bg-gray-200 px-2 py-2"
        />
        <button className="text-primarydarker self-end text-xs">
          forgot password
        </button>
        <button
          className="rounded bg-[#f09247] py-2 text-white shadow"
          onClick={onLogin}
        >
          Login
        </button>
        <div>
          <hr className="h-[4px] w-full bg-gray-400" />
        </div>
        <Link
          to={"/signin"}
          className="text-contrast flex flex-col items-center rounded bg-gray-50 py-2 shadow"
        >
          Doesn't have account?
        </Link>
      </div>
    </div>
  );
}
