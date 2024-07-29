import Gallary from "../home.component/gallary";
import { hotelStore } from "../hotelStore";

export default function Profile() {
  return (
    
    <div className="flex h-svh w-full max-w-7xl flex-col items-center bg-gray-100">
      <div className="w-full opacity-80">
        <Gallary/>
      </div>

      <div className="sm:w-32 sm:h-32 w-20 h-20 absolute left-16 top-32 bg-gray-200 p-2 rounded">.</div>
      <h1 className="absolute sm:top-44 bg-gray-100 bg-opacity-85 px-2 py-1 sm:left-52 left-40 top-36 text-sm rounded text-primarydarker">Username</h1>
      <h1 className="absolute sm:top-56 bg-gray-100 bg-opacity-85 px-2 py-1 sm:left-52 left-40 top-44 rounded text-primarydarker text-sm" >Id :</h1>

      <div className="w-full h-max py-1 flex items-center justify-end gap-1 mb-1 px-8">
        <div className="w-[2px] bg-gray-400 h-full"><hr/></div>
        <button className="bg-gray-100 px-2 py-1 text-primarydarker hover:bg-primarydarker hover:text-white">Booked</button>
        <div className="w-[2px] bg-gray-400 h-full"><hr/></div>
        <button className="bg-gray-100 px-2 py-1 text-primarydarker hover:bg-primarydarker hover:text-white">Write Review</button>
        <div className="w-[2px] bg-gray-400 h-full"><hr/></div>
      </div>
      <div className="grid grid-cols-2 max md:pl-24 px-8 gap-2 items-center text-primarydarker self-start"> 
        <h1 className="w-max font-fauna align-middle">Gmail</h1>
        <input value={hotelStore.getState().auth.gmail || ""} type="text" readOnly className="w-max px-2 py-1"/>

        <h1 className="w-max font-fauna align-middle">Password</h1>
        <input className="w-max px-2 py-1"/>

        <h1 className="w-max font-fauna align-middle">Address</h1>
        <input className="w-max px-2 py-1"/>
        
        <h1 className="w-max font-fauna align-middle">contact</h1>
        <input className="w-max px-2 py-1"/>

      </div>
    </div>
  );
}
