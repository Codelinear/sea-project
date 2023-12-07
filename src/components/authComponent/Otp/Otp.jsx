import React from "react";
import "./otp.scss";

const Otp = () => {
  return (
    <div className="verify-otp">
      <div className="main-verify flex justify-center items-center flex-col gap-10">
        <div className="head-verify">
          <h1>Verify OTP</h1>
        </div>

        <div className="otp-input">
          <div className="otp-head">
            <p>OTP</p>
          </div>

          <div className="otp-inputs flex gap-2">
            <input type="text" className="number-otp" />
            <input type="text" className="number-otp" />
            <input type="text" className="number-otp" />
            <input type="text" className="number-otp" />
            <input type="text" className="number-otp" />
            <input type="text" className="number-otp" />
          </div>

          <div className="incorect-otp mt-2">
            <p>Incorrect OTP. Please try again.</p>
          </div>

          <div className="opt-btn flex justify-center pt-8">
            <button>Verify OTP</button>
          </div>

          <div className="resend-otp flex  justify-center pt-4 gap-1">
            <p>Didn’t get an OTP?</p>
            <span>Resend    </span>
          </div>

          <div className="otp-success flex  justify-center mt-7 gap-1">
            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
              >
                <path
                  d="M9.5501 18.2501L3.8501 12.5501L5.2751 11.1251L9.5501 15.4001L18.7251 6.2251L20.1501 7.6501L9.5501 18.2501Z"
                  fill="#204F0A"
                />
              </svg>
            </p>
            <p>OTP sent to number ending with XX96</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;
