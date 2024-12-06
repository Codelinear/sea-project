import React from "react";
import "./profile.scss";
import { useState } from "react";
import rigth from "./right.svg";
import esc from "./esc.svg";
import help from "./help.svg";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [usermail, setusermail] = useState("");

  // name input
  const [errorpage, setErrorpage] = useState(false);
  const [inputerror, setInputerror] = useState(false);
  const [Name, setName] = useState("");

  // email input
  const [errorpageemail, setErrorpageemail] = useState(false);
  const [inputerroremail, setInputerroremail] = useState(false);
  const [email, setEmail] = useState("");
  // email input
  const [errorpageotp, setErrorpageotp] = useState(false);
  const [inputerrorotp, setInputerrorotp] = useState(false);
  // const [otp, setOtp] = useState("");

  // password input

  const [errorpagepass, setErrorpagepass] = useState(false);
  const [inputerrorpass, setInputerrorpass] = useState(false);
  const [password, setPassword] = useState("");

  // New password input

  const [errorpagepassNew, setErrorpagepassNew] = useState(false);
  const [inputerrorpassNew, setInputerrorpassNew] = useState(false);
  const [Newpassword, setNewPassword] = useState("");
  const [Reinputpassword, setReinputPassword] = useState("");

  // otp input
  const [otp, setOtp] = useState("");

  const [userData, setUserData] = useState(null);
  const [trialCredits, setTrialCredits] = useState(null);

  // Fetch user data from the backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/get_account", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authentication
          },
        });
        const data = await response.json();
        setUserData(data[0]); // Store fetched data in state
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData && userData.display_name) {
      setName(userData.display_name);
    }
  }, [userData]);

  useEffect(() => {
    if (userData && userData.email) {
      setEmail(userData.email);
    }
  }, [userData]);

  useEffect(() => {
    if (userData && userData.trial_credits) {
      setTrialCredits(userData.trial_credits);
    }
  }, [userData]);

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  const handleNextStepOtp = () => {
    // const dataa = { Name };
    // axios
    //   .post("http://localhost:7700/sendotp")
    //   // .then((response) => response.json())
    //   .then((response) => {
    //     if (response) {
    //       console.log("otp sent");
    //       // alert("Login successful");
    //       console.log("clicked");
    //     } else {
    //       console.error("Login failed");
    //     }
    //   });
    setCurrentStep(currentStep + 1);
  };
  const handleNextStepverify = () => {
    setCurrentStep(6);
  };

  const handleNextStepback = () => {
    setCurrentStep(currentStep - 1);
  };
  const onNameClick = async (e) => {
    e.preventDefault(); // Prevent form submission behavior

    if (!Name) {
      setInputerror(true);
      setErrorpage(false);
      return;
    }

    try {
      const response = await axios.post(
        "/api/set_name", // Update to your correct API route
        { name: Name },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data.message); // "Name updated successfully"
        setErrorpage(true);
        setInputerror(false);
      }
    } catch (error) {
      console.error("Failed to update name:", error);
      setErrorpage(false);
      setInputerror(true);
    }
  };

  const onEmailClick = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!email || !email.includes("@")) {
      setInputerroremail(true);
      setErrorpageemail(false);
      return;
    }

    try {
      const response = await axios.post(
        "/api/set_email", // Update to your correct API route
        { email: email },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data.message); // "Email updated successfully"
        setErrorpageemail(true);
        setInputerroremail(false);
      }
    } catch (error) {
      console.error("Failed to update email:", error);
      setErrorpageemail(false);
      setInputerroremail(true);
    }
  };

  const onpassClick = (e) => {
    if (password) {
      setErrorpagepass(true);
      setInputerrorpass(false);
      setCurrentStep(6);
      return;
    }
    if (!password) {
      setInputerrorpass(true);
    }
    e.preventDefault();
  };

  const onrenew = (e) => {
    if (!Newpassword || !Reinputpassword) {
      setInputerrorpassNew(true);
      return;
    }
    if (Newpassword === Reinputpassword) {
      setErrorpagepassNew(true);
      setInputerrorpassNew(false);
      setTimeout(() => {
        setCurrentStep(1);
      }, 3000);
      return;
    } else {
      setInputerrorpassNew(true);
      return;
    }

    e.preventDefault();
  };
  const onotpClick = (e) => {
    if (otp) {
      setErrorpageotp(true);
      setInputerrorotp(false);
      setTimeout(() => {
        setCurrentStep(6);
      }, 3000);
      return;
    }
    if (!otp) {
      setInputerrorotp(true);
    }
    e.preventDefault();
  };

  // ////////////////resend otp

  const [cooldown, setCooldown] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const startCooldown = () => {
    setIsButtonDisabled(true);
    setCooldown(60);

    const interval = setInterval(() => {
      setCooldown((prevCooldown) => prevCooldown - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      setIsButtonDisabled(false);
    }, 80000);
  };

  const handleResendClick = () => {
    // TODO: Implement your resend OTP logic here
    // For demonstration purposes, we'll just start the cooldown
    startCooldown();
  };

  useEffect(() => {
    if (cooldown > 0) {
      const timeout = setTimeout(() => {
        setCooldown((prevCooldown) => prevCooldown - 1);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [cooldown]);

  const [otpp, setOtpp] = useState(["", "", "", "", "", ""]);

  const handleOtpChange = (index, value) => {
    const newOtp = [...otpp];
    newOtp[index] = value;
    setOtpp(newOtp);

    if (index < otpp.length - 1 && value !== "") {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <>
      <div className="profile-setting">
        <div className="head-profile-setting">
          <h1>Profile settings</h1>
        </div>

        {currentStep === 1 && (
          <div className="profile-details ">
            <div className="save-sucess flex gap-20 items-center">
              <div className="username-profile flex flex-col gap-4 justify-start w-[309px]">
                <label htmlFor="name-na">Name</label>
                <input
                  id="name-na"
                  type="text"
                  placeholder=""
                  required
                  value={Name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputerror ? "activeError" : ""}
                />
                <button onClick={onNameClick} className="save-btn-profile">
                  <span>Save changes</span>
                </button>
              </div>
              {errorpage ? (
                <>
                  <div className="frame h-[44px] -mt-4">
                    <div className="div">
                      <img
                        className="material-symbols"
                        alt="Material symbols"
                        src={rigth}
                      />
                      <div className="div-wrapper">
                        <p className="text-wrapper">
                          Your Name was successfully updated
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}

              {inputerror ? (
                <>
                  <div className="w-[214px] h-11 p-2.5 bg-orange-100 rounded-xl flex-col justify-start items-start gap-2 inline-flex -mt-4">
                    <div className="justify-center items-center gap-[19px] inline-flex">
                      <img
                        className="material-symbols"
                        alt="Material symbols"
                        src={esc}
                      />
                      <div className="text-orange-900 text-xs font-normal font-['poppins'] leading-[18px]">
                        please enter your Name
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>

            <div className="save-sucess flex gap-20 items-center mt-5">
              <div className="username-profile flex flex-col gap-4 justify-start w-[309px]">
                <label htmlFor="email">Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  type="email"
                  placeholder=""
                  value={email}
                  className={inputerroremail ? "activeError" : ""}
                  required
                />
                <button onClick={onEmailClick} className="save-btn-profile">
                  <span>Save changes</span>
                </button>
              </div>

              {errorpageemail ? (
                <>
                  <div className="frame h-[44px] -mt-4">
                    <div className="div">
                      <img
                        className="material-symbols"
                        alt="Material symbols"
                        src={rigth}
                      />
                      <div className="div-wrapper">
                        <p className="text-wrapper">Your Email was updated</p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}

              {inputerroremail ? (
                <>
                  <div className="w-[214px] h-11 p-2.5 bg-orange-100 rounded-xl flex-col justify-start items-start gap-2 inline-flex -mt-4">
                    <div className="justify-center items-center gap-[19px] inline-flex">
                      <img
                        className="material-symbols"
                        alt="Material symbols"
                        src={esc}
                      />
                      <div className="text-orange-900 text-xs font-normal font-['poppins'] leading-[18px]">
                        please enter your Email
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>

            <div className="username-profile flex flex-col gap-4 justify-start w-[309px] pt-5">
              <label htmlFor="trialCredits">Trial Credits Remaining</label>
              <p>{trialCredits}</p>
            </div>

            {/* TODO: Implement functionality to change password */}
            {/* <div className="password-save w-[309px] mt-8">
              <div className="username-profile flex flex-col gap-4 justify-start">
                <label htmlFor="password">Password</label>
                <button onClick={handleNextStep} className="save-btn-profile">
                  <span>Change password</span>
                </button>
              </div>
            </div> */}

            <div className="w-[122px] h-[17px] justify-start items-start gap-2 inline-flex mt-5">
              {/* <div className="w-4 h-4 relative" /> */}
              <Link to="/support" onClick={scrollToTop}>
                <div className="text-indigo-700 text-sm font-medium font-['poppins'] underline ">
                  <div className="flex gap-1 items-center">
                    <img src={help} alt="" />
                    Need Help?
                  </div>
                </div>
              </Link>
            </div>
          </div>
        )}

        {/* //////////////////////////////////// */}

        {currentStep === 2 && (
          <>
            {/* <h1>enter your current password</h1> */}

            <div className="w-[434px] h-[21px] mb-8 justify-start items-start gap-1 inline-flex">
              <div className="opacity-50 text-zinc-800 text-sm font-normal font-['Poppins']">
                Profile settings
              </div>
              <div className="opacity-50 text-zinc-800 text-sm font-normal font-['Poppins']">
                {"<"}
              </div>
              <div className="opaci text-zinc-800 text-sm font-normal font-['Poppins']">
                Change Password
              </div>
            </div>
            <div className="change-password">
              <div className="username-profile flex flex-col gap-4 justify-start w[309px]">
                <div className="save-sucess flex gap-20 items-center">
                  <div className="username-profile flex flex-col gap-4 justify-start w-[309px]">
                    <label htmlFor="passowrd">
                      Enter your current password
                    </label>
                    <input
                      id="passowrd"
                      type="text"
                      placeholder=""
                      required
                      onChange={(e) => setPassword(e.target.value)}
                      className={inputerrorpass ? "activeError" : ""}
                    />
                  </div>
                  {errorpagepass ? (
                    <>
                      <div className="frame h-[44px] -mt-4">
                        <div className="div">
                          <img
                            className="material-symbols"
                            alt="Material symbols"
                            src={rigth}
                          />
                          <div className="div-wrapper">
                            <p className="text-wrapper">
                              Your Name was successfully updated
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}

                  {inputerrorpass ? (
                    <>
                      <div className="w-[230px] h-11 p-2.5 bg-orange-100 rounded-xl flex-col justify-start items-start gap-2 inline-flex mt-8">
                        <div className="justify-center items-center gap-[19px] inline-flex">
                          <img
                            className="material-symbols"
                            alt="Material symbols"
                            src={esc}
                          />
                          <div className="text-orange-900 text-xs font-normal font-['poppins'] leading-[18px]">
                            Your password is incorrect
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>

                <p
                  onClick={handleNextStepOtp}
                  // onClick={onpassClick}
                  className="forgetpassword cursor-pointer"
                >
                  Forgot password?
                </p>
                <button
                  // onClick={handleNextStepverify}
                  onClick={onpassClick}
                  className="save-btn-profile-verify"
                >
                  <span>Verify </span>
                </button>
              </div>
            </div>
          </>
        )}

        {/* //////////////////////////////////// */}

        {currentStep === 6 && (
          <>
            <div className="w-[434px] h-[21px] mb-8 justify-start items-start gap-1 inline-flex">
              <div className="opacity-50 text-zinc-800 text-sm font-normal font-['Poppins']">
                Profile settings
              </div>
              <div className="opacity-50 text-zinc-800 text-sm font-normal font-['Poppins']">
                {"<"}
              </div>
              <div className="opaci text-zinc-800 text-sm font-normal font-['Poppins']">
                Change Password
              </div>
            </div>
            <div className="profile-details ">
              <div className="flex">
                <div>
                  <div className="save-sucess flex gap-20">
                    <div className="username-profile flex flex-col gap-4 justify-start w-[309px]">
                      <label htmlFor="reenterpass">Enter new password</label>
                      <input
                        onChange={(e) => setNewPassword(e.target.value)}
                        id="reenterpass"
                        type="text"
                        placeholder=""
                        className={inputerrorpassNew ? "activeError" : ""}
                      />
                    </div>
                  </div>

                  <div className="email-save w-[309px] mt-8">
                    <div className="username-profile flex flex-col gap-4 justify-start">
                      <label htmlFor="renew">Re-enter new password</label>
                      <input
                        onChange={(e) => setReinputPassword(e.target.value)}
                        id="renew"
                        type="text"
                        placeholder=""
                        className={inputerrorpassNew ? "activeError" : ""}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  {errorpagepassNew ? (
                    <>
                      <div className="frame h-[44px] mt-9 ml-10 w-full">
                        <div className="div">
                          <img
                            className="material-symbols"
                            alt="Material symbols"
                            src={rigth}
                          />
                          <div className="div-wrapper">
                            <p className="text-wrapper w-full">
                              Your password was successfully updated
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}

                  {inputerrorpassNew ? (
                    <>
                      <div className="w-[280px] h-11 p-2 bg-orange-100 rounded-xl flex-col justify-start items-start gap-2 inline-flex mt-7 ml-8">
                        <div className="justify-center items-center gap-[19px] inline-flex">
                          <img
                            className="material-symbols"
                            alt="Material symbols"
                            src={esc}
                          />
                          <div className="text-orange-900 text-xs font-normal font-['poppins'] leading-[18px]">
                            The Passwords entered don’t match
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="password-save w-[309px] mt-8">
                <div className="renter-password flex flex-col gap-4 justify-start">
                  <button onClick={onrenew} className="save-btn-profile">
                    <span>Save New Password</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* //////////////////////////////////// */}

        {currentStep === 3 && (
          <>
            <div className="w-[434px] h-[21px] mb-8 justify-start items-start gap-1 inline-flex">
              <div className="opacity-50 text-zinc-800 text-sm font-normal font-['Poppins']">
                Profile settings
              </div>
              <div className="opacity-50 text-zinc-800 text-sm font-normal font-['Poppins']">
                {"<"}
              </div>
              <div className="opacity-50 text-zinc-800 text-sm font-normal font-['Poppins']">
                Change Password
              </div>
              <div className="opacity-50 text-zinc-800 text-sm font-normal font-['Poppins']">
                {"<"}
              </div>
              <div className="opaci text-zinc-800 text-sm font-normal font-['Poppins']">
                Forgot Password
              </div>
            </div>
            {/* <h1>if click on forget passwrod </h1> */}
            <div>
              <div className="email-sent-to my-7">
                <p>OTP sent to {usermail.data}</p>
              </div>

              <div className="verify-otp-profile">
                <button onClick={handleNextStep}>
                  Proceed to verifying OTP
                </button>
              </div>
            </div>
          </>
        )}

        {/* //////////////////////////////////// */}
        {currentStep === 4 && (
          <>
            <div className="w-[434px] h-[21px] mb-8 justify-start items-start gap-1 inline-flex">
              <div className="opacity-50 text-zinc-800 text-sm font-normal font-['Poppins']">
                Profile settings
              </div>
              <div className="opacity-50 text-zinc-800 text-sm font-normal font-['Poppins']">
                {"<"}
              </div>
              <div className="opacity-50 text-zinc-800 text-sm font-normal font-['Poppins']">
                Change Password
              </div>
              <div className="opacity-50 text-zinc-800 text-sm font-normal font-['Poppins']">
                {"<"}
              </div>
              <div className="opaci text-zinc-800 text-sm font-normal font-['Poppins']">
                Forgot Password
              </div>
            </div>
            <br />
            <label htmlFor="otp">OTP</label>
            <div className="otp-inputs flex gap-2">
              <input
                type="text"
                // id="otp"
                onChange={(e) => setOtp(e.target.value)}
                className={inputerrorotp ? "activeError" : "number-otp"}
                maxLength="1"
                id="otp-input-0"
              />
              <input
                type="text"
                className={inputerrorotp ? "activeError" : "number-otp"}
                maxLength="1"
                onChange={(e) => handleOtpChange(1, e.target.value)}
                id="otp-input-1"
              />
              <input
                id="otp-input-2"
                type="text"
                className={inputerrorotp ? "activeError" : "number-otp"}
                maxLength="1"
                onChange={(e) => handleOtpChange(2, e.target.value)}
              />
              <input
                id="otp-input-3"
                type="text"
                className={inputerrorotp ? "activeError" : "number-otp"}
                maxLength="1"
                onChange={(e) => handleOtpChange(3, e.target.value)}
              />
              <input
                id="otp-input-4"
                type="text"
                className={inputerrorotp ? "activeError" : "number-otp"}
                maxLength="1"
                onChange={(e) => handleOtpChange(4, e.target.value)}
              />
              <input
                onChange={(e) => handleOtpChange(5, e.target.value)}
                id="otp-input-5"
                type="text"
                className={inputerrorotp ? "activeError" : "number-otp"}
                maxLength="1"
              />
            </div>

            <div className="verify-otp-profile mt-10">
              <button
                // onClick={handleNextStepverify}
                onClick={onotpClick}
              >
                Proceed to verifying OTP
              </button>
            </div>
            <div className="resend-otp flex  justify-start pt-4 gap-1 w-[309px] items-start">
              <p>Didn’t get an OTP?</p>
              <button
                onClick={handleResendClick}
                disabled={isButtonDisabled}
                className="flex  justify-start [309px] items-start"
              >
                {isButtonDisabled ? (
                  <span className="opacity-75">Resend</span>
                ) : (
                  <span>Resend</span>
                )}
                {/* Resend{" "} */}
              </button>
            </div>
            <div className="resend-otp flex  justify-start pt-4 gap-1 w-[309px]">
              {cooldown > 0 && (
                <>
                  <div className="email-sent-to">
                    <p>OTP sent to sea@sea.com</p>
                  </div>
                </>
              )}
              {/* <span>Resend</span> */}
            </div>

            <p>
              {cooldown > 0 &&
                `You can request OTP in(${cooldown}s)
              `}
            </p>

            {errorpageotp ? (
              <>
                <div className="frame h-[44px] mt-4">
                  <div className="div">
                    <img
                      className="material-symbols"
                      alt="Material symbols"
                      src={rigth}
                    />
                    <div className="div-wrapper">
                      <p className="text-wrapper">
                        {/* Your Name was successfully updated */}
                        otp successfully updated
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}

            {inputerrorotp ? (
              <>
                <div className="w-[300px] h-11 p-2.5  rounded-xl flex-col justify-start items-start gap-2 inline-flex mt-1">
                  <div className="justify-center items-center gap-[19px] inline-flex">
                    <div className="text-[red] text-xs font-normal font-['poppins'] leading-[18px]">
                      Incorrect OTP. Please try again.
                    </div>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
            {/* <h1>if click on resent opt</h1> */}
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
