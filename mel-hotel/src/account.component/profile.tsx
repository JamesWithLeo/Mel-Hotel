import { useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, update } from "../redux slices/authSlice";
import { AppDispatch, AppState, hotelStore } from "../hotelStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { Capitalize } from "../fomatString";
import { Link } from "react-router-dom";

export default function Profile() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const age = useRef(0);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };
  const { user } = useSelector((state: AppState) => state.auth);
  const [isEditPasswordVisible, setEditPasswordVisible] =
    useState<boolean>(false);
  const [isEditAddressVisible, setEditAddressVisible] =
    useState<boolean>(false);
  const [isEditContactVisible, setEditContactVisible] =
    useState<boolean>(false);
  const [isEditFirstVisible, setEditFirstVisible] = useState<boolean>(false);
  const [isEditLastVisible, setEditLastVisible] = useState<boolean>(false);
  const [isEditGenderVisible, setEditGenderVisible] = useState<boolean>(false);
  const [isEditBirtdateVisible, setIsEditBirthdateVisible] =
    useState<boolean>(false);
  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="flex h-max w-full max-w-7xl flex-col items-center bg-gray-100">
      <div className="z-10 flex h-max w-full flex-col items-center gap-2 px-4 py-4 sm:flex-row sm:py-8 md:px-16">
        <div className="h-20 w-20 rounded bg-gray-200 p-2 sm:h-32 sm:w-32">
          .
        </div>
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-primarydarker left-[32%] top-[18%] h-max rounded bg-gray-100 bg-opacity-85 px-2 py-1 text-sm sm:left-52 sm:top-44">
            {user.FirstName} {user.LastName}
          </h1>
          <h1 className="text-primarydarker left-[32%] top-[21%] h-max rounded bg-gray-100 bg-opacity-85 px-2 py-1 text-sm sm:left-52 sm:top-56">
            Id : {user._id}
          </h1>
        </div>
      </div>

      <div className="mb-1 flex h-max w-full items-center justify-center gap-1 px-8 py-1 sm:justify-end">
        <Link
          to={"/book/package/" + hotelStore.getState().booking.hotelPackage}
          className="text-primarydarker h-full w-max rounded border border-gray-200 bg-gray-50 px-3 py-1 hover:shadow hover:drop-shadow-md"
        >
          Book
        </Link>
        <button className="text-primarydarker h-full w-max rounded border border-gray-200 bg-gray-50 px-3 py-1 hover:shadow hover:drop-shadow-md">
          Write Review
        </button>

        <button
          className="h-full w-max rounded border border-gray-200 bg-gray-50 px-3 py-1 text-red-400 hover:shadow hover:drop-shadow-md"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <div className="text-primarydarker flex h-full w-full max-w-lg flex-col items-center gap-4 self-start px-4 pb-8 md:pl-24">
        <section className="flex w-full grid-cols-2 flex-col sm:grid">
          <h1 className="font-fauna w-max align-middle">Gmail</h1>

          <div className="flex w-full gap-4">
            <input
              type="email"
              readOnly
              className="outline-primarydarker rounded bg-gray-200 px-2 py-2 focus:bg-gray-100 focus:shadow-inner focus:outline-dashed"
              defaultValue={user.Gmail}
            />
          </div>
        </section>

        <section className="flex w-full grid-cols-2 flex-col sm:grid">
          <h1 className="font-fauna w-max align-middle">Password</h1>
          <div className="flex w-full gap-4">
            <input
              className="outline-primarydarker w-full rounded bg-gray-200 px-2 py-2 focus:bg-gray-100 focus:shadow-inner focus:outline-dashed"
              defaultValue={user.Password}
              onBlur={(e) => {
                e.target.readOnly = true;
                if (!e.target.value) {
                  e.target.value = e.target.defaultValue;
                }
                if (e.target.value === e.target.defaultValue) {
                  setEditPasswordVisible(false);
                }
              }}
              readOnly
              spellCheck={false}
              id="Password"
            />
            <button
              className="flex w-max items-center group-hover:block"
              onClick={() => {
                const passwordElement = document.getElementById(
                  "Password",
                ) as HTMLInputElement;
                passwordElement.focus();
                passwordElement.readOnly = false;
                setEditPasswordVisible(true);
              }}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
            {isEditPasswordVisible ? (
              <button
                onClick={async () => {
                  const passwordElement = document.getElementById(
                    "Password",
                  ) as HTMLInputElement;
                  passwordElement.blur();
                  passwordElement.readOnly = true;
                  setEditPasswordVisible(false);
                  dispatch(
                    update({
                      id: user._id,
                      field: "Password",
                      value: passwordElement.value,
                    }),
                  );
                }}
              >
                <FontAwesomeIcon icon={faSquareCheck} />
              </button>
            ) : null}
          </div>
        </section>

        <section className="flex w-full grid-cols-2 flex-col sm:grid">
          <h1 className="font-fauna w-max align-middle">Firstname</h1>

          <div className="flex w-full gap-4">
            <input
              readOnly
              id="firstInput"
              className="outline-primarydarker w-full rounded bg-gray-200 px-2 py-2 focus:bg-gray-100 focus:shadow-inner focus:outline-dashed"
              onBlur={(e) => {
                e.target.readOnly = true;
                if (!e.target.value) {
                  e.target.value = e.target.defaultValue;
                }
                if (e.target.value === e.target.defaultValue) {
                  setEditFirstVisible(false);
                }
              }}
              defaultValue={user.FirstName}
            />

            <button
              className="w-max group-hover:block"
              onClick={() => {
                const FirstNameElement = document.getElementById(
                  "firstInput",
                ) as HTMLInputElement;
                FirstNameElement.readOnly = false;
                FirstNameElement.focus();
                setEditFirstVisible(true);
              }}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
            {isEditFirstVisible ? (
              <button
                onClick={() => {
                  const FirstNameElement = document.getElementById(
                    "firstInput",
                  ) as HTMLInputElement;
                  setEditFirstVisible(false);
                  dispatch(
                    update({
                      id: user._id,
                      field: "FirstName",
                      value: Capitalize(FirstNameElement.value),
                    }),
                  );
                  FirstNameElement.readOnly = true;
                }}
              >
                <FontAwesomeIcon icon={faSquareCheck} />
              </button>
            ) : null}
          </div>
        </section>

        <section className="flex w-full grid-cols-2 flex-col sm:grid">
          <h1 className="font-fauna w-max align-middle">Lastname</h1>

          <div className="flex w-full gap-4">
            <input
              readOnly
              id="lastInput"
              className="outline-primarydarker w-full rounded bg-gray-200 px-2 py-2 focus:bg-gray-100 focus:shadow-inner focus:outline-dashed"
              onBlur={(e) => {
                e.target.readOnly = true;
                if (!e.target.value) {
                  e.target.value = e.target.defaultValue;
                }
                if (e.target.value === e.target.defaultValue) {
                  setEditLastVisible(false);
                }
              }}
              defaultValue={user.LastName}
            />

            <button
              className="w-max group-hover:block"
              onClick={() => {
                const LastNameElement = document.getElementById(
                  "lastInput",
                ) as HTMLInputElement;
                LastNameElement.readOnly = false;
                LastNameElement.focus();
                setEditLastVisible(true);
              }}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
            {isEditLastVisible ? (
              <button
                onClick={() => {
                  const LastNameElement = document.getElementById(
                    "lastInput",
                  ) as HTMLInputElement;
                  setEditLastVisible(false);
                  dispatch(
                    update({
                      id: user._id,
                      field: "LastName",
                      value: Capitalize(LastNameElement.value),
                    }),
                  );
                  LastNameElement.readOnly = true;
                }}
              >
                <FontAwesomeIcon icon={faSquareCheck} />
              </button>
            ) : null}
          </div>
        </section>

        <section className="flex w-full grid-cols-2 flex-col sm:grid">
          <h1 className="font-fauna w-max align-middle">Address</h1>
          <div className="flex w-full gap-4">
            <input
              className="outline-primarydarker w-full rounded bg-gray-200 px-2 py-2 focus:bg-gray-100 focus:shadow-inner focus:outline-dashed"
              defaultValue={user.Address}
              onBlur={(e) => {
                e.target.readOnly = true;
                e.target.readOnly = true;
                if (!e.target.value) {
                  e.target.value = e.target.defaultValue;
                }
                if (e.target.value === e.target.defaultValue) {
                  setEditAddressVisible(false);
                }
              }}
              id="Address"
              readOnly
            />
            <button
              className="w-max group-hover:block"
              onClick={() => {
                const addressElement = document.getElementById(
                  "Address",
                ) as HTMLInputElement;
                addressElement.readOnly = false;
                addressElement.focus();
                setEditAddressVisible(true);
              }}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
            {isEditAddressVisible ? (
              <button
                onClick={() => {
                  const addressElement = document.getElementById(
                    "Address",
                  ) as HTMLInputElement;
                  setEditAddressVisible(false);
                  dispatch(
                    update({
                      id: user._id,
                      field: "Address",
                      value: addressElement.value,
                    }),
                  );
                }}
              >
                <FontAwesomeIcon icon={faSquareCheck} />
              </button>
            ) : null}
          </div>
        </section>

        <section className="flex w-full grid-cols-2 flex-col sm:grid">
          <h1 className="font-fauna w-max align-middle">contact</h1>
          <div className="flex w-full gap-4">
            <input
              className="outline-primarydarker w-full rounded bg-gray-200 px-2 py-2 focus:bg-gray-100 focus:shadow-inner focus:outline-dashed"
              readOnly
              id="Contact"
              onBlur={(e) => {
                e.target.readOnly = true;
                if (!e.target.value) {
                  e.target.value = e.target.defaultValue;
                }
                if (e.target.value === e.target.defaultValue) {
                  setEditContactVisible(false);
                }
              }}
              defaultValue={user.Contact}
            />
            <button
              className="w-max group-hover:block"
              onClick={() => {
                const contactElement = document.getElementById(
                  "Contact",
                ) as HTMLInputElement;
                contactElement.readOnly = false;
                contactElement.focus();
                setEditContactVisible(true);
              }}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
            {isEditContactVisible ? (
              <button
                onClick={() => {
                  const contactElement = document.getElementById(
                    "Contact",
                  ) as HTMLInputElement;
                  contactElement.blur();
                  contactElement.readOnly = true;
                  setEditContactVisible(false);
                  dispatch(
                    update({
                      id: user._id,
                      field: "Contact",
                      value: contactElement.value,
                    }),
                  );
                }}
              >
                <FontAwesomeIcon icon={faSquareCheck} />
              </button>
            ) : null}
          </div>
        </section>

        <section className="flex w-full grid-cols-2 flex-col sm:grid">
          <h1 className="font-fauna w-max align-middle">Gender</h1>
          <div className="flex w-full gap-4">
            <select
              id="genderInput"
              disabled
              defaultValue={user.Gender}
              className="outline-primarydarker w-full rounded bg-gray-200 px-2 py-2 focus:bg-gray-100 focus:shadow-inner focus:outline-dashed"
            >
              <option value={"femlaie"}>female</option>
              <option value={"male"}>male</option>
              <option value={"other"}>other</option>
            </select>
            <button
              onClick={() => {
                const genderElement = document.getElementById(
                  "genderInput",
                ) as HTMLInputElement;
                genderElement.disabled = false;
                setEditGenderVisible(true);
              }}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
            {isEditGenderVisible ? (
              <button
                onClick={() => {
                  const genderElement = document.getElementById(
                    "genderInput",
                  ) as HTMLInputElement;
                  genderElement.disabled = true;
                  setEditGenderVisible(false);
                  dispatch(
                    update({
                      id: user._id,
                      field: "Gender",
                      value: genderElement.value.toLowerCase(),
                    }),
                  );
                }}
              >
                <FontAwesomeIcon icon={faSquareCheck} />
              </button>
            ) : null}
          </div>
        </section>

        <section className="flex w-full grid-cols-2 flex-col sm:grid">
          <h1 className="font-fauna w-max align-middle">Age</h1>
          <div className="flex w-full gap-4">
            <input
              readOnly
              type="date"
              id="Birthdate"
              className="outline-primarydarker w-full rounded bg-gray-200 px-2 py-2 focus:bg-gray-100 focus:shadow-inner focus:outline-dashed"
              defaultValue={user.Birthdate}
            />
            <button
              onClick={() => {
                const Birthdate = document.getElementById(
                  "Birthdate",
                ) as HTMLInputElement;
                Birthdate.readOnly = false;
                setIsEditBirthdateVisible(true);
              }}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
            {isEditBirtdateVisible ? (
              <button
                onClick={() => {
                  const BirthdateElement = document.getElementById(
                    "Birthdate",
                  ) as HTMLInputElement;
                  setIsEditBirthdateVisible(false);

                  const todayYear = new Date().getFullYear();
                  const todayMonth = new Date().getMonth() + 1;
                  const todayDay = new Date().getDate();

                  const Birthdate = BirthdateElement.value
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

                  dispatch(
                    update({
                      id: user._id,
                      field: "Birthdate",
                      value: BirthdateElement.value,
                    }),
                  );
                  dispatch(
                    update({
                      id: user._id,
                      field: "Age",
                      value: age.current,
                    }),
                  );
                  BirthdateElement.readOnly = true;
                }}
              >
                <FontAwesomeIcon icon={faSquareCheck} />
              </button>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  );
}
