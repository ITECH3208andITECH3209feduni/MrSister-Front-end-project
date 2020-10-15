import React, { useState } from "react";
import IssueMessageModal from "./IssueMessageModal";

const IndividualInvoice = ({
  supplierName,
  referenceNo,
  createdBy,
  orderDate,
  invoiceStatus,
  issueDescription,
  issueReportedBy,
}) => {
  const [showInvoiceIssueMessage, setInvoiceIssueMessage] = useState(false);

  const refinedOrderDate = orderDate.toString().substr(0, 10);

  let color = "";
  if (invoiceStatus === "approved") {
    color = "bg-green-400";
  } else if (invoiceStatus === "pending") {
    color = "bg-orange-400";
  } else {
    color = "bg-red-400";
  }

  const statusClassName = `p-2 rounded w-full block text-center ${color}`;
  return (
    <>
      <tr>
        <td className="border px-4 py-2">{referenceNo}</td>
        <td className="border px-4 py-2">{supplierName}</td>
        <td className="border px-4 py-2">{createdBy}</td>
        <td className="border px-4 py-2">{refinedOrderDate}</td>
        <td className="border px-4 py-2">
          <a
            className={statusClassName}
            onClick={() => {
              invoiceStatus === "issue" && setInvoiceIssueMessage(true);
            }}
          >
            {invoiceStatus}
          </a>
        </td>
      </tr>
      {showInvoiceIssueMessage && (
        <IssueMessageModal
          message={issueDescription}
          issueReportedBy={issueReportedBy}
          handleCancel={() => setInvoiceIssueMessage(false)}
        />
      )}
    </>
  );
};

export default IndividualInvoice;
