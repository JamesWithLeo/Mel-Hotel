import { useState, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../hotelStore";
import { login, signin } from "../redux slices/authSlice";
import { Capitalize, toTItleCase } from "../fomatString";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { createUser, logoutUser } from "../firebase";

export default function SigninFC() {
  const [steps, setSteps] = useState<1 | 2 | 3>(1);
  const [id, setId] = useState<string | null>(null);
  const [emailValue, setEmail] = useState<string | null>(null);
  const [uid, setUid] = useState<string | null>(null);
  const [FirstName, setFirstName] = useState<string | null>(null);
  const [LastName, setLastName] = useState<string | null>(null);
  const age = useRef(0);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleSignin = async () => {
    const emailElement = document.getElementById(
      "inputEmail",
    ) as HTMLInputElement;
    const passwordElement = document.getElementById(
      "inputPassword",
    ) as HTMLInputElement;
    const confirmPasswordElement = document.getElementById(
      "confirmPassword",
    ) as HTMLInputElement;

    if (!(emailElement.value && passwordElement.value)) return;
    else if (passwordElement.value !== confirmPasswordElement.value) {
      setError("Password doesn't match");
      return;
    }
    if (
      !window.confirm(
        `Mel Hotel confirmation! \nAgreeing to this will create a account using, ${emailElement.value}`,
      )
    )
      return;
    setIsLoading(true);
    const user = createUser(emailElement.value, passwordElement.value);
    user
      .then((credential) => {
        console.log(credential.email);
        console.log(credential.uid);
        if (!credential.email || !credential.uid) return;
        dispatch(signin({ email: credential.email, uid: credential.uid }))
          .unwrap()
          .then((value) => {
            console.log(value);
            setId(value.insertedId);
            setIsLoading(false);
            setSteps(2);
          })
          .catch((reason) => {
            console.log(reason);
            setIsLoading(false);
            logoutUser();
          });
      })
      .catch((reason) => {
        logoutUser();
        setError(reason);
        setIsLoading(false);
      });
  };
  const handlePersonalInfo = async () => {
    const dateOfBirth = document.getElementById(
      "dateOfBirth",
    ) as HTMLInputElement;
    const genderElement = document.getElementById(
      "genderElement",
    ) as HTMLInputElement;
    const addressElement = document.getElementById(
      "addressElement",
    ) as HTMLInputElement;

    const todayYear = new Date().getFullYear();
    const todayMonth = new Date().getMonth() + 1;
    const todayDay = new Date().getDate();

    const Birthdate = dateOfBirth.value
      .split("-")
      .map((value) => Number(value));
    const birthyear = Birthdate[0];
    const birthmonth = Birthdate[1];
    const birthday = Birthdate[2];

    const month = todayMonth - birthmonth;
    if (month >= 0) {
      if (todayDay >= birthday) {
        age.current = todayYear - birthyear;
      } else {
        age.current = todayYear - birthyear - 1;
      }
    } else {
      age.current = todayYear - birthyear - 1;
    }

    axios
      .post("/account/update/" + id, {
        firstName: FirstName,
        lastName: LastName,
        birthdate: dateOfBirth.value,
        age: age.current,
        gender: genderElement.value,
        address: toTItleCase(addressElement.value),
      })
      .then((value) => {
        console.log(value);
        setId(null);
        if (emailValue && uid) {
          dispatch(login({ email: emailValue, uid: uid, rememberMe: true }))
            .unwrap()
            .finally(() => {
              navigate("/profile", { replace: true });
            });
        }
      });
  };

  return (
    <div className="bg-radial-at-tr bg-radial-at-tr flex h-dvh flex-col items-center justify-center bg-gradient-to-tr from-orange-300 via-orange-300 to-slate-100 antialiased">
      {steps === 1 ? (
        <Link
          to={"/"}
          className="text-contrast absolute left-4 top-4 rounded bg-white px-3 text-xl shadow"
        >
          <FontAwesomeIcon icon={faArrowLeftLong} />
        </Link>
      ) : null}
      {steps === 1 ? (
        <div className="min-w-md absolute z-10 flex h-max w-full max-w-md flex-col gap-4 rounded-md bg-gray-100 bg-opacity-80 px-4 py-8 shadow backdrop-blur backdrop-filter sm:px-8">
          {isLoading ? (
            <div className="min-w-md absolute left-0 top-0 z-20 flex h-full w-full flex-col items-center justify-center rounded-md">
              <FontAwesomeIcon
                icon={faSpinner}
                className="text-contrast animate-spin text-3xl"
              />
            </div>
          ) : null}
          <h1 className="text-primarydark font-fauna mb-8 text-center text-3xl font-bold">
            Mel Hotel
          </h1>

          {error ? (
            <h1 className="text-center text-xs text-red-400">{error}</h1>
          ) : null}
          <h1>Email</h1>
          <input
            id="inputEmail"
            placeholder="Enter your email"
            type="text"
            required
            className="outline-primarydarker rounded bg-gray-200 px-2 py-2 focus:bg-gray-100 focus:shadow-inner focus:outline-dashed"
          />
          <h1>Password</h1>
          <input
            id="inputPassword"
            placeholder="Create a password"
            type="password"
            required
            className="outline-primarydarker rounded bg-gray-200 px-2 py-2 focus:bg-gray-100 focus:shadow-inner focus:outline-dashed"
            onChange={() => {
              setError("");
            }}
          />
          <input
            id="confirmPassword"
            placeholder="Confirm password"
            type="password"
            required
            className="outline-primarydarker rounded bg-gray-200 px-2 py-2 focus:bg-gray-100 focus:shadow-inner focus:outline-dashed"
            onChange={() => {
              setError("");
            }}
          />
          <button
            className="rounded bg-[#f09247] py-2 text-white shadow"
            onClick={handleSignin}
          >
            Sign in (step 1 of 3)
          </button>

          <div>
            <hr className="h-[4px] w-full bg-stone-400" />
          </div>
          <Link
            to={"/login"}
            className="text-contrast flex flex-col items-center rounded bg-gray-50 py-2 shadow"
          >
            Already have account?
          </Link>
        </div>
      ) : null}
      {steps === 2 ? (
        <>
          <div className="min-w-md z-10 w-full max-w-md px-4 py-4">
            <div className="min-w-md flex h-max w-full max-w-md flex-col gap-4 rounded-md bg-gray-100 bg-opacity-80 px-4 py-8 shadow backdrop-blur backdrop-filter sm:px-8">
              <div className="min-w-md z-10 w-full max-w-md pb-2">
                <h1 className="text-left text-2xl drop-shadow">
                  Account created!
                </h1>
                <h1 className="text-sm">Please enter your name</h1>
              </div>
              <h1>First name</h1>
              <input
                type="text"
                id="firstNameElement"
                required
                className="outline-primarydarker rounded bg-gray-200 px-2 py-2 focus:bg-gray-100 focus:shadow-inner focus:outline-dashed"
              />
              <h1>Last name</h1>
              <input
                type="text"
                required
                id="lastNameElement"
                className="outline-primarydarker rounded bg-gray-200 px-2 py-2 focus:bg-gray-100 focus:shadow-inner focus:outline-dashed"
              />
              <button
                className="mt-4 w-max self-end rounded bg-[#f09247] px-4 py-2 text-white shadow"
                onClick={() => {
                  const firstNameElement = document.getElementById(
                    "firstNameElement",
                  ) as HTMLInputElement;
                  const lastNameElement = document.getElementById(
                    "lastNameElement",
                  ) as HTMLInputElement;
                  if (firstNameElement.value && lastNameElement) {
                    setSteps(3);
                    setFirstName(Capitalize(firstNameElement.value));
                    setLastName(Capitalize(lastNameElement.value));
                  }
                }}
              >
                Next (step 2 of 3)
              </button>
            </div>
          </div>
        </>
      ) : null}
      {steps === 3 ? (
        <>
          <div className="min-w-md z-10 flex h-max w-full max-w-md flex-col gap-4 rounded-md bg-gray-100 bg-opacity-80 px-4 py-8 shadow backdrop-blur backdrop-filter sm:px-8">
            <div className="min-w-md z-10 w-full max-w-md pb-2">
              <h1 className="text-left text-2xl drop-shadow">Almost done!</h1>
              <h1 className="text-sm">
                Just fill in the forms to complete the process.
              </h1>
            </div>
            <div className="flex w-full items-center justify-between">
              <h1>Date of birth</h1>
              <input
                id="dateOfBirth"
                type="date"
                className="outline-primarydarker rounded bg-gray-200 px-2 py-2 focus:bg-gray-100 focus:shadow-inner focus:outline-dashed"
              />
            </div>

            <div className="flex w-full items-center justify-between">
              <h1>Gender</h1>
              <select
                id="genderElement"
                className="outline-primarydarker rounded bg-gray-200 px-2 py-2 focus:bg-gray-100 focus:shadow-inner focus:outline-dashed"
                name="gender"
              >
                <option value={"male"}>male</option>
                <option value={"female"}>female</option>
                <option value={"other"}>other</option>
              </select>
            </div>
            <h1>Address</h1>
            <input
              id="addressElement"
              placeholder="Enter your address"
              type="text"
              required
              className="outline-primarydarker rounded bg-gray-200 px-2 py-2 focus:bg-gray-100 focus:shadow-inner focus:outline-dashed"
            />

            <div className="mt-4 flex flex-row-reverse gap-8">
              <button
                className="rounded bg-[#f09247] px-4 py-2 text-white hover:drop-shadow-md active:drop-shadow-md"
                onClick={handlePersonalInfo}
              >
                Save
              </button>
              <button
                className="text-primarydark rounded bg-gray-50 px-4 py-2 hover:shadow active:shadow"
                onClick={() => {
                  setSteps(2);
                }}
              >
                back
              </button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
