import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import IndividualSupplier from "./IndividualSupplier";

import { toast } from "react-toastify";
import AddItemTry from "./AddItemTry";

const SupplierTable = ({ setSupplierActive }) => {
  const [supplierData, setSupplierData] = useState([]);

  const [displayTable, setDisplayTable] = useState(true);

  const [activeSupplier, setActiveSupplier] = useState({});

  useEffect(() => {
    fetchSupplierData();
  });

  const fetchSupplierData = async () => {
    const res = await axios.get("http://localhost:4000/api/suppliers");
    // console.log("Data from server", res.data);
    setSupplierData(res.data);
  };

  const handleSupplierDelete = async (supplierId) => {
    // const
    try {
      const res = await axios.delete(
        `http://localhost:4000/api/suppliers/${supplierId}`
      );
      toast.success("Supplier Delete Successfully");
    } catch (e) {
      toast.error("Error in Deleting Supplier");
      console.log("Error->", e.message);
    }
  };

  const handleSupplierLinkClick = (supplier) => {
    setDisplayTable(false);
    console.log("Supplier Name:", supplier.name);
    console.log("Supplier Email", supplier.email);
    setActiveSupplier(supplier);
  };

  return (
    <>
      {!displayTable && (
        <AddItemTry {...activeSupplier} setSupplierActive={setActiveSupplier} />
      )}
      {displayTable && (
        <table class="table-fixed">
          <thead>
            <tr>
              <th class="w-5/12 px-4 py-2">Name</th>
              <th class="w-1 px-4 py-2">Email</th>
              <th class="w-5/12 px-4 py-2">Address</th>
              <th class="w-1/12 px-4 py-2">Phone No</th>
              <th class="w-2/12 px-4 py-2">Status</th>
              <th class="w-1/12 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {supplierData.map((supplier) => {
              return (
                <IndividualSupplier
                  supplier={supplier}
                  onDelete={handleSupplierDelete}
                  onSupplierLinkClick={handleSupplierLinkClick}
                />
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

SupplierTable.propTypes = {};

export default SupplierTable;
