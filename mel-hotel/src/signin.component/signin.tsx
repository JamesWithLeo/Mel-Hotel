import { useState } from "react";
import Gallary, { carouselTypeface } from "../home.component/gallary";
const setting: carouselTypeface = {
  dots: false,
  slidesToShow: 1,
  centerMode: true,
  infinite: true,
  initialSlide: 1,
  speed: 3000,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  adaptiveHeight: true,
};
export default function SigninFC() {
  const [steps, setSteps] = useState<1 | 2 | 3>(1);
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center">
      {steps === 1 ? (
        <div className="min-w-md absolute z-10 flex h-max w-full max-w-md flex-col gap-4 rounded-md bg-gray-100 bg-opacity-80 px-4 py-8 shadow backdrop-blur backdrop-filter sm:px-8">
          <h1 className="text-primarydark font-fauna mb-8 text-center text-3xl font-bold">
            Mel Hotel
          </h1>
          <h1>Gmail</h1>
          <input
            id="inputGmail"
            placeholder="Enter your gmail"
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
          />
          <input
            id="confirmPassword"
            placeholder="Confirm password"
            type="password"
            required
            className="outline-primarydarker rounded bg-gray-200 px-2 py-2 focus:bg-gray-100 focus:shadow-inner focus:outline-dashed"
          />
          <button
            className="mt-8 rounded bg-[#f09247] py-2 text-white shadow"
            onClick={() => {
              setSteps(2);
            }}
          >
            Sign in
          </button>
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
                required
                className="outline-primarydarker rounded bg-gray-200 px-2 py-2 focus:bg-gray-100 focus:shadow-inner focus:outline-dashed"
              />
              <h1>Last name</h1>
              <input
                type="text"
                required
                className="outline-primarydarker rounded bg-gray-200 px-2 py-2 focus:bg-gray-100 focus:shadow-inner focus:outline-dashed"
              />
              <button
                className="mt-4 w-max self-end rounded bg-[#f09247] px-4 py-2 text-white shadow"
                onClick={() => {
                  setSteps(3);
                }}
              >
                Next
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
                type="date"
                className="outline-primarydarker rounded bg-gray-200 px-2 py-2 focus:bg-gray-100 focus:shadow-inner focus:outline-dashed"
              />
            </div>

            <div className="flex w-full items-center justify-between">
              <h1>Gender</h1>
              <select
                className="outline-primarydarker rounded bg-gray-200 px-2 py-2 focus:bg-gray-100 focus:shadow-inner focus:outline-dashed"
                name="gender"
              >
                <option value={"male"}>male</option>
                <option value={"femlaie"}>female</option>
                <option value={"other"}>other</option>
              </select>
            </div>
            <h1>Address</h1>
            <input
              placeholder="Enter your address"
              type="text"
              required
              className="outline-primarydarker rounded bg-gray-200 px-2 py-2 focus:bg-gray-100 focus:shadow-inner focus:outline-dashed"
            />
            <h1>Contact number</h1>
            <input
              placeholder="Enter your contact number"
              type="tel"
              required
              className="outline-primarydarker rounded bg-gray-200 px-2 py-2 focus:bg-gray-100 focus:shadow-inner focus:outline-dashed"
            />
            <div className="mt-4 flex flex-row-reverse gap-8">
              <button className="rounded bg-[#f09247] px-4 py-2 text-white hover:drop-shadow-md active:drop-shadow-md">
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
      {/* <img
        src={hotelfacade}
        alt="hotel facade"
        className="relative h-full bg-contain bg-center bg-no-repeat lg:bg-cover"
      /> */}
      <Gallary settings={setting} isFullscreen={true} />
    </div>
  );
}
