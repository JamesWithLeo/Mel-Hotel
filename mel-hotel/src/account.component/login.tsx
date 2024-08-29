import { login, SetAuthToDefault } from "../redux slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch } from "../hotelStore";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { loginUser, logoutUser } from "../firebase";

export default function LoginFC() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRemembered, setIsRemembered] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const onLogin = async () => {
    const emailElement = document.getElementById(
      "inputGmail",
    ) as HTMLInputElement;
    const passwordElement = document.getElementById(
      "inputPassword",
    ) as HTMLInputElement;
    const isRemember = document.getElementById(
      "isRemember",
    ) as HTMLInputElement;

    const email: string = emailElement.value.toLowerCase();
    const password: string = passwordElement.value;
    localStorage.setItem("isRemember", JSON.stringify(isRemembered));
    if (!email || !password) {
      dispatch(SetAuthToDefault());
      return;
    }
    setIsLoading(true);
    const user = loginUser(email, password);
    user
      .then((value) => {
        console.log(value.email);
        console.log(value.uid);
        if (!value.email || !value.uid) return;
        dispatch(
          login({
            email: value.email,
            uid: value.uid,
            rememberMe: isRemember.checked,
          }),
        )
          .unwrap()
          .then((value) => {
            navigate("/", { replace: true });
          })
          .catch((reason) => {
            // Passed firebase auth, but user doesn't exist on mongodb.
            setError("account doesn't exist");
            logoutUser();
          })
          .finally(() => {
            setIsLoading(false);
          });
      })
      .catch((reason) => {
        setError(reason);
        setIsLoading(false);
      });
  };

  return (
    <div className="flex h-dvh flex-col items-center justify-center bg-white">
      {/* home button */}
      <Link
        to={"/"}
        className="text-contrast absolute left-4 top-4 rounded bg-white px-3 text-xl shadow"
      >
        <FontAwesomeIcon icon={faArrowLeftLong} />
      </Link>

      {/* Login form */}
      <div className="min-w-md z-10 flex h-max w-full max-w-md flex-col gap-4 rounded-md bg-gray-100 bg-opacity-80 px-8 py-8 shadow drop-shadow backdrop-blur backdrop-filter">
        <h1 className="text-primarydark font-fauna mb-8 text-center text-3xl font-bold">
          Mel Hotel
        </h1>
        {error ? (
          <h1 className="self-center text-xs text-red-600 lg:text-sm">
            {error}
          </h1>
        ) : null}
        <input
          onChange={() => {
            setError("");
          }}
          id="inputGmail"
          placeholder="Enter your email"
          type="email"
          required
          className="outline-primarydarker rounded bg-gray-200 px-2 py-2 focus:bg-gray-100 focus:shadow-inner focus:outline-dashed"
        />
        <input
          onChange={() => {
            setError("");
          }}
          id="inputPassword"
          placeholder="Enter your password"
          type="password"
          required
          className="outline-primarydarker rounded bg-gray-200 px-2 py-2 focus:bg-gray-100 focus:shadow-inner focus:outline-dashed"
        />

        {/* Remenber password & forgot password */}
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
