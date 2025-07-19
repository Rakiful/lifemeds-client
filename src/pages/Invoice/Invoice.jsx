import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import logo from "../../assets/web_logo.png";
import { Navigate, useLocation } from "react-router";
import { PreviewInvoice } from "./PreviewInvoice";
import { Helmet } from "react-helmet-async";

export const Invoice = () => {
  const [paymentStatus, setPaymentStatus] = useState("");
  const [paymentStatusColor, setPaymentStatusColor] = useState("#08a100");
  const location = useLocation();
  const order = location.state;
  console.log(order);

  if (!order) {
    return <Navigate to={"/checkout"}></Navigate>;
  }

  useEffect(() => {
    if (order.transactionId) {
      setPaymentStatus("PAID");
      setPaymentStatusColor("#08a100");
    } else {
      setPaymentStatus("UNPAID");
      setPaymentStatusColor("#ed0707");
    }
  }, [order]);

  const handleDownloadPDF = () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    let cursorY = 15;

    // Add logo
    const img = new Image();
    img.src = logo;

    img.onload = () => {
      // Add logo at top-left
      pdf.addImage(img, "PNG", 14, cursorY, 40, (img.height * 40) / img.width);

      // Right side: Invoice title
      pdf.setFontSize(22);
      pdf.setTextColor("#0d9488");
      pdf.text("INVOICE", pageWidth - 14, cursorY + 8, { align: "right" });

      // Right side: Transaction ID & Date below title
      pdf.setFontSize(10);
      pdf.setTextColor("#444");
      pdf.text(
        `Transaction ID: ${order.transactionId}`,
        pageWidth - 14,
        cursorY + 16,
        {
          align: "right",
        }
      );
      const dateStr = new Date(order.orderDate).toLocaleDateString();
      pdf.text(`Date: ${dateStr}`, pageWidth - 14, cursorY + 22, {
        align: "right",
      });

      // Right side: Paid title
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(22);
      pdf.setTextColor(`${paymentStatusColor}`);
      pdf.text(`${paymentStatus}`, pageWidth - 16, cursorY + 32, {
        align: "right",
      });

      // Move cursor down for Billing Info
      cursorY += Math.max((img.height * 40) / img.width, 30) - 8;

      // Billing Info below logo
      pdf.setFontSize(12);
      pdf.setTextColor("#065f46");
      pdf.text("Billing To:", 14, cursorY);
      cursorY += 8;
      pdf.setFontSize(10);
      pdf.setTextColor("#222");
      pdf.text(`Name: ${order.buyerName}`, 14, cursorY);
      cursorY += 6;
      pdf.text(`Email: ${order.buyerEmail}`, 14, cursorY);
      cursorY += 6;
      pdf.text(`Phone: ${order.phone}`, 14, cursorY);
      cursorY += 6;
      pdf.text(`Address: ${order.address}`, 14, cursorY);
      cursorY += 6;

      // Table headers
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor("#fff");
      pdf.setFillColor(0, 120, 111);
      pdf.rect(14, cursorY, pageWidth - 28, 10, "F");
      pdf.text("#", 16, cursorY + 7);
      pdf.text("Medicine", 26, cursorY + 7);
      pdf.text("Price", 110, cursorY + 7);
      pdf.text("Qty", 140, cursorY + 7);
      pdf.text("Total", 170, cursorY + 7);
      cursorY += 12;

      // Add vertical space between header and first row
      cursorY += 5;

      // Table content
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor("#000");
      pdf.setFontSize(10);

      order.cartData.forEach((item, index) => {
        if (cursorY > 280) {
          pdf.addPage();
          cursorY = 15;
        }

        pdf.text(String(index + 1), 16, cursorY);
        pdf.text(item.medicineName.slice(0, 30), 26, cursorY); // crop name if too long
        pdf.text(`$${item.price.toFixed(2)}`, 110, cursorY);
        pdf.text(String(item.quantity), 140, cursorY);
        pdf.text(`$${(item.price * item.quantity).toFixed(2)}`, 170, cursorY);
        cursorY += 8;
      });

      cursorY += 10;

      // Total Paid
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(20);
      pdf.setTextColor("#047857");
      pdf.text(
        `Total Paid: $${order.total.toFixed(2)}`,
        pageWidth - 14,
        cursorY,
        { align: "right" }
      );

      // Save PDF in a new tab and trigger print
      const blobUrl = pdf.output("bloburl");
      const printWindow = window.open(blobUrl, "_blank");

      if (printWindow) {
        printWindow.onload = () => {
          printWindow.focus();
          printWindow.print();
        };
      }
      // Save PDF
      // pdf.save(`Invoice_${order.transactionId || "order"}.pdf`);
    };

    img.onerror = () => {
      alert("Failed to load logo image.");
    };
  };

  return (
    <div className="p-5">
      <Helmet>
        <title>Invoice | LifeMeds</title>
      </Helmet>
      <div className="flex justify-center">
        <button
          onClick={handleDownloadPDF}
          className="btn bg-teal-500 text-white text-lg p-6 hover:bg-teal-700"
        >
          Download Invoice PDF
        </button>
      </div>
      <PreviewInvoice />
    </div>
  );
};
