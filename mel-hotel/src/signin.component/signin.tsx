import { useState } from "react"

export default function SigninFC() {
  const [steps, setSteps] = useState<1 | 2>(1);
  const onNext = () => {
    setSteps(2)
  }
  return (
    <div className="flex h-dvh flex-col items-center justify-center bg-gray-100 px-4 sm:px-0">
      {steps === 1 ?
      <div className="min-w-md flex h-max w-full max-w-md flex-col gap-4 rounded-md sm:px-8 px-4 py-8 shadow drop-shadow">
        <h1 className="text-primarydark font-fauna mb-8 text-center text-3xl font-bold">
          Mel Hotel
        </h1>
        <h1>Gmail</h1>
        <input
        id="inputGmail"
        placeholder="Enter your gmail"
        type="text"
        required
        className="outline-primarydarker rounded bg-gray-200 px-2 py-2"
        />
        <h1>Password</h1>
        <input
        id="inputPassword"
        placeholder="Create a password"
        type="password"
        required
        className="outline-primarydarker rounded bg-gray-200 px-2 py-2"
        />
        <input
        id="confirmPassword"
          placeholder="Confirm password"
          type="password"
          required
          className="outline-primarydarker rounded bg-gray-200 px-2 py-2"
        />
        <button className="rounded bg-[#f09247] py-2 mt-8 text-white shadow" onClick={onNext} > 
          Sign In
          </button>
      </div>
          :null}
      {steps === 2 ?<>
      <div className="w-full min-w-md max-w-md py-4 px-4">
      <h1 className="drop-shadow text-2xl text-left">Almost done!</h1> 
      <h1 className="text-sm">Just fill in the forms to complete the process.</h1>
      </div>
      <div className="min-w-md flex h-max w-full max-w-md flex-col gap-4 rounded-md px-4 sm:px-8 py-8 shadow drop-shadow"> 
        <div className="w-full flex justify-between items-center">
          <h1>
            Date of birth
          </h1>
          <input type="date"
            className="outline-primarydarker rounded bg-gray-200 px-2 py-2"
          />
        </div>
        
        <div className="w-full flex justify-between items-center">
          <h1>Gender</h1>
          <select  
            className="outline-primarydarker rounded bg-gray-200 px-2 py-2"
            name="gender">
            <option value={"male"}>male</option>
            <option value={"femlaie"}>female</option>
            <option value={"other"}>other</option>
          </select>
        </div>
        <h1>
          Address
        </h1>
        <input
          placeholder="Enter your address"
          type="text"
          required
          className="outline-primarydarker rounded bg-gray-200 px-2 py-2"
        />
        <h1>
        Contact number
        </h1>
        <input
          placeholder="Enter your contact number"
          type="tel"
          required
          className="outline-primarydarker rounded bg-gray-200 px-2 py-2"
        />
        <button
        className="rounded bg-[#f09247] py-2 text-white shadow mt-8">Save</button>
        </div>
      </>
      :null}
    </div>
  )
}