import React from "react";
import PropTypes from "prop-types";

const ItemList = ({ itemName, _id, price, unit, onDelete, supplierEmail }) => {
  return (
    <tr>
      <td className="border px-4 py-2">{itemName}</td>
      <td className="border px-4 py-2">{price}</td>
      <td className="border px-4 py-2">{unit}</td>
      <td>
        <button
          className="bg-red-800 py-1 px-8 rounded text-gray-100"
          onClick={() => onDelete(supplierEmail, _id)}
          style={{
            marginBottom: ".5rem",
            marginTop: ".1rem",
            marginLeft: ".2rem",
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

ItemList.propTypes = {};

export default ItemList;
