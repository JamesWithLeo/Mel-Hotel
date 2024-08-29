import {
  ICredentials,
  login,
  SetAuthToDefault,
} from "../redux slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, AppState } from "../hotelStore";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

export default function LoginFC() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { statusMessage } = useSelector((state: AppState) => state.auth);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRemembered, setIsRemembered] = useState<boolean>(true);

  const onLogin = async () => {
    const gmailElement = document.getElementById(
      "inputGmail",
    ) as HTMLInputElement;
    const passwordElement = document.getElementById(
      "inputPassword",
    ) as HTMLInputElement;

    // get the value in the input element
    const gmail: string = gmailElement.value.toLowerCase();
    const password: string = passwordElement.value;
    localStorage.setItem("isRemember", JSON.stringify(isRemembered));
    if (!gmail || !password) {
      dispatch(SetAuthToDefault());
      return;
    }

    const credentials: ICredentials = { gmail, password };
    setIsLoading(true);
    dispatch(login(credentials))
      .unwrap()
      .then(() => {
        navigate("/profile", { replace: false });
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="flex h-dvh flex-col items-center justify-center bg-gray-100">
      <Link
        to={"/"}
        className="text-contrast absolute left-4 top-4 rounded bg-white px-3 text-xl shadow"
      >
        <FontAwesomeIcon icon={faArrowLeftLong} />
      </Link>
      <div className="min-w-md z-10 flex h-max w-full max-w-md flex-col gap-4 rounded-md bg-gray-100 bg-opacity-80 px-8 py-8 shadow drop-shadow backdrop-blur backdrop-filter">
        <h1 className="text-primarydark font-fauna mb-8 text-center text-3xl font-bold">
          Mel Hotel
        </h1>
        {statusMessage ? (
          <h1 className="self-center text-xs text-red-600 lg:text-sm">
            {statusMessage}
          </h1>
        ) : null}
        <input
          id="inputGmail"
          placeholder="Enter gmail"
          type="email"
          required
          className="outline-primarydarker rounded bg-gray-200 px-2 py-2 focus:bg-gray-100 focus:shadow-inner focus:outline-dashed"
        />
        <input
          id="inputPassword"
          placeholder="Enter password"
          type="password"
          required
          className="outline-primarydarker rounded bg-gray-200 px-2 py-2 focus:bg-gray-100 focus:shadow-inner focus:outline-dashed"
        />
        <div className="flex justify-between">
          <label className="text-primarydarker flex gap-2 text-xs">
            Remember me
            <input
              type="checkbox"
              id="isRemember"
              name="isRemember"
              checked={isRemembered}
              onChange={() => {
                setIsRemembered(!isRemembered);
              }}
            />
          </label>

          <button className="text-primarydarker self-end text-xs">
            forgot password
          </button>
        </div>
        <button
          id="loginButton"
          type="submit"
          disabled={isLoading}
          className="rounded bg-[#f09247] py-2 text-white shadow"
          onClick={onLogin}
        >
          Login
        </button>
        <div>
          <hr className="h-[4px] w-full bg-stone-400" />
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
