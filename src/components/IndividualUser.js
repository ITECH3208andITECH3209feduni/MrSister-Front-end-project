import React from "react";
import PropTypes from "prop-types";

const IndividualUser = ({ email, role, firstName, _id, handleDelete }) => {
  return (
    <tr>
      <td class="border px-4 py-2">{firstName}</td>
      <td class="border px-4 py-2">{email}</td>
      <td class="border px-4 py-2">{role}</td>
      <td class="border px-4 py-2">
        <button
          className="bg-red-900 text-gray-100 rounded px-4 py-1"
          onClick={() => handleDelete(_id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

IndividualUser.propTypes = {};

export default IndividualUser;
