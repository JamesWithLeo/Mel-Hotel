import ordinaryBedroom from "../assets/images/ordinary-bedroom.jpg";
import hotelRoomSm from "../assets/images/hotelRoom-sm.jpg";
import hotelRoomMd from "../assets/images/hotelRoom-md.jpg";
import hotelRoomLg from "../assets/images/hotelRoom-lg.jpg";
interface packageTypeface {
  thumbnail: string;
  packageName: string;
  targetAudience: string;
  pricePerNight: number;
}
export const packagesData: packageTypeface[] = [
  {
    thumbnail: ordinaryBedroom,
    packageName: "ordinary",
    targetAudience:
      "Budget-conscious travelers and guests seeking a basic stay.",
    pricePerNight: 100,
  },
  {
    thumbnail: hotelRoomSm,
    packageName: "regular",
    targetAudience: "Families and common travelers",
    pricePerNight: 350,
  },
  {
    thumbnail: hotelRoomMd,
    packageName: "premium",
    targetAudience: "Affluent guests seeking enhanced comfort",
    pricePerNight: 500,
  },
  {
    thumbnail: hotelRoomLg,
    packageName: "luxury",
    targetAudience: "VIPs, entrepreneurs, and high-net-worth individuals.",
    pricePerNight: 1000,
  },
];
