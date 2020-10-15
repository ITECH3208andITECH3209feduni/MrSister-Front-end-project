import React, { useState } from "react";
import EditSupplierModal from "./EditSupplierModal";

const IndividualSupplier = ({ supplier, onSupplierLinkClick, onDelete }) => {
  const { email, name, address, phoneNo, _id, status } = supplier;

  let color = "";
  if (status === "active") {
    color = "bg-green-200";
  } else if (status === "inactive") {
    color = "bg-red-200";
  } else {
    color = "bg-red-400";
  }

  const [showEditItemBox, setShowEditItemBox] = useState(false);

  const statusClassName = `p-2 w-full text-center ${color}`;

  return (
    <React.Fragment>
      <tr>
        <td className="border px-4 py-2">
          <a
            onClick={() => onSupplierLinkClick(supplier)}
            style={{ textDecoration: "underline", color: "blue" }}
          >
            {name}
          </a>
        </td>
        <td className="border px-4 py-2">{email}</td>
        <td className="border px-4 py-2">{address}</td>
        <td className="border px-4 py-2">{phoneNo}</td>
        <td className={statusClassName}>{status}</td>
        <td className="border px-4 py-2">
          <button
            className="bg-blue-800 p-2 rounded text-gray-100"
            style={{ marginBottom: ".5rem", marginRight: ".2rem" }}
            onClick={() => setShowEditItemBox(true)}
          >
            Edit
          </button>
          <button
            className="bg-red-800 p-2 rounded text-gray-100"
            onClick={() => onDelete(_id)}
            style={{ marginBottom: ".5rem", marginRight: ".2rem" }}
          >
            Delete
          </button>
        </td>
      </tr>
      {showEditItemBox && (
        <EditSupplierModal
          handleCancel={() => setShowEditItemBox(false)}
          {...supplier}
        />
      )}
    </React.Fragment>
  );
};

IndividualSupplier.propTypes = {};

export default IndividualSupplier;
