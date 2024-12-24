import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import { useState } from "react";
import UpdateStaffInfoDTO from "../../entities/DTO/UpdateStaffInfoDTO";
import Staff from "../../entities/Staff";
import staffService from "../../services/staff.service";
import { sUser } from "../../store";
import { toast } from "react-toastify";

export default function UpdateStaffInfoPopup({
  onClose,
  staff
}: {
  onClose: () => void;
  staff: Staff;
}) {
  const [fullname, setFullname] = useState(staff?.fullname || "");
  const [birth, setBirth] = useState(staff?.birth || "");
  const [gender, setGender] = useState(staff?.gender || "Male");
  const [idNumber, setIdNumber] = useState(staff?.idNumber || "");
  const [phone, setPhone] = useState(staff?.phone || "");
  const [email, setEmail] = useState(staff?.email || "");

  const validateInputs = () => {
    if (!fullname || !birth || !idNumber || !phone || !email) {
      toast.error("Please fill in all fields");
      return false;
    }
    if (
      fullname === staff.fullname &&
      birth === staff.birth &&
      gender === staff.gender &&
      idNumber === staff.idNumber &&
      phone === staff.phone &&
      email === staff.email
    ) {
      toast.error("No information has been changed");
      return false;
    }
    if (
      !/^\d{10}$/.test(phone) ||
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      toast.error("Invalid phone or email");
      return false;
    }
    return true;
  };

  const handleUpdateStaff = async () => {
    if (!validateInputs()) {
      return;
    }
    try {
      const updateStaff: UpdateStaffInfoDTO = {
        fullname,
        birth: birth.split("/").reverse().join("-"),
        gender: gender.toLocaleLowerCase(),
        idNumber,
        phone,
        email,
        startDate: staff.startDate,
      };
      console.log(updateStaff);
      const response = await staffService.updateStaff(staff.id, updateStaff);
      if (response.data.EC === 0) {
        toast.success("Update staff successfully");
        console.log("Update staff successfully");
        sUser.set((prev) => (prev.value.info = response.data.DT));
        onClose();
      } else {
        toast.error("Failed to update staff");
      }
    } catch (error) {
      toast.error("Failed to update staff");
      console.error("Error adding staff:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="relative popup bg-white rounded-xl p-4 w-1/4 min-w-[390px] overflow-y-auto flex flex-col gap-2">
        <CloseIcon className="absolute top-2 right-2 cursor-pointer hover:bg-slate-300 rounded-full" onClick={onClose} />
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="fullname">Full Name</label>
            <input
              id="newStaffFullnameInput"
              name="fullname"
              placeholder="Full Name"
              className="border border-gray-300 px-2 py-1 rounded-md"
              required
              onChange={(e) => {
                setFullname(e.target.value);
              }}
              defaultValue={staff?.fullname}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="birth">Birth</label>
            <input
              id="newStaffBirthInput"
              name="birth"
              type="date"
              className="border border-gray-300 px-2 py-1 rounded-md"
              required
              onChange={(e) => {
                setBirth(e.target.value);
              }}
              defaultValue={staff?.birth}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="gender">Gender</label>
            <select
              id="newStaffGenderInput"
              name="gender"
              className="border border-gray-300 px-2 py-1 rounded-md"
              required
              onChange={(e) => {
                setGender(e.target.value);
              }}
              defaultValue={staff?.gender}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="idNumber">ID Number</label>
            <input
              id="newStaffIdNumberInput"
              name="idNumber"
              placeholder="ID Number"
              className="border border-gray-300 px-2 py-1 rounded-md"
              required
              onChange={(e) => {
                setIdNumber(e.target.value);
              }}
              defaultValue={staff?.idNumber}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="phone">Phone</label>
            <input
              id="newStaffPhoneInput"
              name="phone"
              placeholder="Phone"
              className="border border-gray-300 px-2 py-1 rounded-md"
              required
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              defaultValue={staff?.phone}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              id="newStaffEmailInput"
              name="email"
              placeholder="Email"
              className="border border-gray-300 px-2 py-1 rounded-md"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              defaultValue={staff?.email}
            />
          </div>
        </div>
        <div className="buttons-container w-full flex justify-end gap-2">
          <Button
            variant="contained"
            style={{
              backgroundColor: "red",
              textTransform: "none",
            }}
            onClick={onClose}
            id="cancelAddStaffButton"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            style={{
              textTransform: "none",
            }}
            onClick={handleUpdateStaff}
            id="confirmUpdateStaffButton"
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
}
