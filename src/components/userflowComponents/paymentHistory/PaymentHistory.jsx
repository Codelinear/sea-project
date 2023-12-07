import React, { useState } from "react";
import "./payhistory.scss";

const PaymentHistory = () => {
  const data = [
    {
      date: "2023-11-16",
      paymentNumber: "947u60749862766",
      paymentMethod: "Credit Card",
      price: "$100",
    },
    {
      date: "2023-11-17",
      paymentNumber: "002",
      paymentMethod: "PayPal",
      price: "$150",
    },
    // Add more rows as needed
  ];

  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleViewDetailsClick = () => {
    setPopupVisible(true);
  };

  const handlePopupClose = () => {
    setPopupVisible(false);
  };
  return (
    <>
      <div className="main-payment-history">
        <div className="head-subscription mb-10">
          <h1>Payment method</h1>
        </div>
        <div className="payment-table max-md:overflow-scroll">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Payment number</th>
                <th>Payment method</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  <td>{row.date}</td>
                  <td>{row.paymentNumber}</td>
                  <td>{row.paymentMethod}</td>
                  <td>{row.price}</td>
                  <td>
                    <button
                      onClick={handleViewDetailsClick}
                      className="text-indigo-700 text-base font-medium font-['Poppins'] underline"
                    >
                      View details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="absolute w-[800px] top-10 bg-white z-50">
          {isPopupVisible && (
            <>
              <div className="w-[970px] h-[610px] px-[59px] pt-[61.62px] pb-[512.38px] bg-white justify-center items-center inline-flex">
                <div className="self-stretch justify-start items-start gap-[620px] inline-flex">
                  <div className="text-zinc-800 text-2xl font-semibold font-['Poppins']">
                    Payment details
                  </div>
                  <button onClick={handlePopupClose}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="33"
                      viewBox="0 0 32 33"
                      fill="none"
                    >
                      <path
                        d="M8.53366 25.9538L6.66699 24.0871L14.1337 16.6204L6.66699 9.15378L8.53366 7.28711L16.0003 14.7538L23.467 7.28711L25.3337 9.15378L17.867 16.6204L25.3337 24.0871L23.467 25.9538L16.0003 18.4871L8.53366 25.9538Z"
                        fill="black"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PaymentHistory;
