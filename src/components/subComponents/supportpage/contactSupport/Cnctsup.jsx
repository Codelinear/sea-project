import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const Cnctsup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "tools",
    issue: "",
  });
  const [statusMessage, setStatusMessage] = useState(null); // For success/error messages
  const [statusType, setStatusType] = useState(""); // "success" or "error"
  const RECAPTCHA_SITE_KEY = process.env.REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [recaptchaToken, setRecaptchaToken] = useState(null);
    const handleRecaptchaChange = (token) => {
      setRecaptchaToken(token); // Save the reCAPTCHA token
    };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recaptchaToken) {
      return;
    }

    // Send form data along with reCAPTCHA token to the backend
    try {
      const response = await fetch("/api/submit_support_form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, recaptchaToken }),
      });

      const result = await response.json();

      if (response.ok) {
        setFormData({
          name: "",
          email: "",
          subject: "Tools",
          issue: "",
        });
        setStatusMessage("Form submitted successfully!");
        setStatusType("success");
        setRecaptchaToken(null);
      } else {
        setStatusMessage("Form submission failed.");
        setStatusType("error");
      }
    } catch (error) {
      console.error("Error submitting support form:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <section id="contactt" className="flex justify-center items-center pt-20">
      <div className="w-[518.05px] h-full flex-col justify-start items-center gap-[63px] inline-flex support-contact">
        <div className="flex-col justify-center items-center gap-4 flex">
          <div className="text-center text-neutral-800 text-[46px] font-medium font-['Poppins']">
            Contact Support
          </div>
          <div className="w-[387.62px] opacity-70 text-center text-zinc-800 text-base font-normal font-['Poppins'] max-sm:w-full">
            Ask a question or report a problem. Our Support Team will answer
            you as soon as possible.
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="support-inputs px-[50.18px] pt-[30.71px] pb-[61.79px] bg-stone-50 bg-opacity-80 rounded-xl backdrop-blur-[91.70px] flex-col justify-start items-center flex max-sm:px-0 max-sm:ml-5"
        >
          <div className="self-stretch flex-col justify-start items-center gap-[39.71px] inline-flex">
            <div className="flex-col justify-start items-start gap-[18.05px] flex">
              <div className="flex-col justify-start items-start gap-[8.66px] flex w-full">
                <label
                  className="text-stone-950 text-xs font-normal font-['Poppins'] leading-[17.33px]"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="pl-[16.25px] pt-[9.39px] pb-[9.05px] bg-white rounded-md justify-end items-center inline-flex"
                  placeholder="John Smith"
                  required
                />
              </div>
              <div className="flex-col justify-start items-start gap-[8.66px] flex w-full">
                <label
                  className="text-stone-950 text-xs font-normal font-['Poppins'] leading-[17.33px]"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-[16.25px] pt-[9.39px] pb-[9.05px] bg-white rounded-md justify-end items-center inline-flex"
                  placeholder="johnsmith@domain.com"
                  required
                />
              </div>
              <div className="flex-col justify-start items-start gap-[8.66px] flex w-full">
                <label
                  className="text-stone-950 text-xs font-normal font-['Poppins'] leading-[17.33px]"
                  htmlFor="subject"
                >
                  How can we help you
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="pl-[16.25px] bg-white rounded-md"
                  required
                >
                  <option value="Tools">
                    I have a question about the tools
                  </option>
                  <option value="Billing">
                    I have a question about billing
                  </option>
                  <option value="Login">I have trouble logging in</option>
                  <option value="Features">
                    Some features don't work as expected
                  </option>
                </select>
              </div>
              <div className="flex-col justify-start items-start gap-[8.66px] flex w-full">
                <label
                  className="text-stone-950 text-xs font-normal font-['Poppins'] leading-[17.33px]"
                  htmlFor="issue"
                >
                  Describe your issue
                </label>
                <textarea
                  id="issue"
                  name="issue"
                  value={formData.issue}
                  onChange={handleChange}
                  className="h-88.09px pl-[19.58px] pr-[14.11px] pt-[9.05px] pb-[57.04px] bg-white rounded-md justify-start items-center inline-flex"
                  placeholder="I need support with..."
                  required
                />
              </div>
            </div>
            <div className="recaptcha-container mt-4">
                <ReCAPTCHA
                  sitekey={RECAPTCHA_SITE_KEY}
                  onChange={handleRecaptchaChange}
                />
            </div>
            <div className="mt-5 text-center">
                      {/* Display Success/Error Message */}
                      {statusMessage && (
                        <div
                        className={`${
                          statusType === "success"
                          ? "text-green-600"
                          : "text-red-600"
                        }`}
                        >
                    {statusMessage}
                  </div>
                )}
            </div>
            <button
              type="submit"
              className="px-10 py-[11px] bg-indigo-700 rounded-md justify-center items-center gap-2 inline-flex"
            >
              <div className="text-white text-base font-medium font-['Poppins']">
                Submit
              </div>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Cnctsup;
