import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Joi from "joi";
import axios from "axios";
import { toast } from "react-toastify";
import ItemList from "./ItemList";

const AddItemTry = ({ name, items, email, setSupplierActive }) => {
  const [data, setData] = useState({
    itemName: "",
    unit: "",
    price: "",
  });

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log("Name, Value", `${name}-${value}`);
    setData((prevData) => ({ ...prevData, [name]: value }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: null,
    }));
  };

  const handleDelete = async (supplierEmail, itemId) => {
    try {
      setSaving(false);
      const res = await axios.delete(
        `http://localhost:4000/api/items/${supplierEmail}/${itemId}`
      );
      toast.success("Item Deleted Successfully");
      setSaving(true);
      // setSupplierActive();
      //window.location.reload(true);
    } catch (e) {
      setSaving(false);
      toast.error("Error Deleting Item");
    }
  };

  const validateItem = (item) => {
    const itemValidationSchema = Joi.object({
      itemName: Joi.string().required(),
      unit: Joi.string().required(),
      price: Joi.number().required(),
    });

    return itemValidationSchema.validate(item, { abortEarly: false });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error } = validateItem(data);

    if (error) {
      const errors = {};
      for (let item of error.details) {
        errors[item.path[0]] = item.message;
      }
      setErrors(errors);
      return;
    }

    try {
      setSaving(true);
      const res = await axios.post(
        `http://localhost:4000/api/items/${email}`,
        data
      );
      console.log("Items Added Successfully");
      setSaving(false);
      toast.success("Items Added Successfully");
      // setSupplierActive();
      //window.location.reload(true);
    } catch (e) {
      toast.error("Error Adding Items");
    }
  };

  return (
    <div>
      <h2 className="text-indigo-900 text-xl font-bold">{name}</h2>
      <form class="w-full max-w-3xl mt-8">
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-2/6 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-itemName"
            >
              Item Name
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-itemName"
              type="text"
              name="itemName"
              value={data.itemName}
              onChange={handleChange}
            />

            <span
              className={`text-red-500 ${
                errors.itemName ? `visible` : `invisible`
              }`}
            >
              {errors.itemName}.
            </span>
          </div>
          <div class="w-full md:w-1/6 px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-price"
            >
              Price
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-price"
              type="text"
              name="price"
              value={data.price}
              onChange={handleChange}
            />
            <span
              className={`text-red-500 ${
                errors.price ? `visible` : `invisible`
              }`}
            >
              {errors.price}.
            </span>
          </div>
          <div class="w-full md:w-1/6 px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-unit"
            >
              Unit
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-unit"
              type="text"
              name="unit"
              value={data.unit}
              onChange={handleChange}
            />
            <span
              className={`text-red-500 ${
                errors.unit ? `visible` : `invisible`
              }`}
            >
              {errors.unit}.
            </span>
          </div>
          <div class="w-full md:w-2/6 px-3">
            <button
              className="bg-blue-500 rounded px-5 py-3 mt-6 text-white"
              onClick={handleSubmit}
            >
              Add Item
            </button>
          </div>
        </div>
      </form>

      <div className="item-list">
        <table class="table-fixed w-full">
          <thead>
            <tr>
              <th class="w-2/5 px-4 py-2">Item Name</th>
              <th class="w-1/5 px-4 py-2">Price</th>
              <th class="w-1/5 px-4 py-2">Unit</th>
              <th class="w-1/5 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => {
              return (
                <ItemList
                  {...item}
                  supplierEmail={email}
                  onDelete={handleDelete}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

AddItemTry.propTypes = {};

export default AddItemTry;
