import { BsCheckCircleFill, BsPlus } from "react-icons/bs";
import { HiOutlineDotsVertical } from "react-icons/hi";

export default function ModuleControlButtons() {
  return (
    <span className="float-end">
      <BsCheckCircleFill className="text-success me-2 fs-5" />
      <BsPlus className="me-2 fs-3" />
      <HiOutlineDotsVertical className="fs-4" />
    </span>
  );
}
