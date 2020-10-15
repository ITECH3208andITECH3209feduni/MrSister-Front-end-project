import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import IndividualInvoice from "./IndividualInvoice";
import axios from "axios";
import { toast } from "react-toastify";
import IssueMessageModal from "./IssueMessageModal";

const InvoiceTable = (props) => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetchInvoiceData();
  }, []);

  const fetchInvoiceData = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/invoices");
      setInvoices(res.data);
    } catch (e) {
      toast.error("Error loading invoice data");
    }
  };

  const handleIssueMessage = () => {};

  return (
    <table class="table-fixed">
      <thead>
        <tr>
          <th class="w-2/12 px-4 py-2">Reference No</th>
          <th class="w-4/12 px-4 py-2">Supplier Name</th>
          <th class="w-4/12 px-4 py-2">Created By</th>
          <th class="w-2/12 px-4 py-2">Created At</th>
          <th class="w-2/12 px-4 py-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((invoice) => {
          return <IndividualInvoice {...invoice} />;
        })}
      </tbody>
    </table>
  );
};

InvoiceTable.propTypes = {};

export default InvoiceTable;
