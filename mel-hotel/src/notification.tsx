import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Notification({
  notificationText,
  onClose,
}: {
  notificationText: string;
  onClose: () => void;
}) {
  return (
    <div className="border-primarydarker absolute left-1/2 top-4 z-20 flex w-[94%] -translate-x-1/2 gap-2 border-2 border-dashed bg-white px-6 py-6 shadow drop-shadow backdrop-blur backdrop-filter">
      <div className="flex items-center justify-center gap-4">
        <button
          className="text-contrast hover:scale-110"
          onClick={() => {
            onClose();
          }}
        >
          <FontAwesomeIcon
            icon={faCircleXmark}
            className="rounded-full border-2"
          />
        </button>
        <h1 className="text-primarydark text-sm">{notificationText}</h1>
      </div>
    </div>
  );
}
