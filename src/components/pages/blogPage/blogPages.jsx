import React from "react";
import img from "../blog/assets/unsplash_L1y9f5O8wiA.svg";
import rain from "../blog/assets/Rainbow 1.png";
import rainp from "../blog/assets/unsplash_HRZUzoX1e6w.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./blogpage.scss";

const Blogpage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError(true);
      return;
    }
    // Here you can perform additional validation if needed

    // For simplicity, let's just log the email to the console
    console.log(`Subscribed with email: ${email}`);
    setError(false);

    // You may want to send the email to a server for further processing
    // For example, using fetch or axios

    // After successful subscription, update the state
    setSubscribed(true);
  };
  return (
    <>
      {/* ?///////////////////// */}
      {/* div.fixed */}
      <div class="fixed-button" onClick={scrollToTop}>
        <button class="fixed right-[50px] bottom-[50px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="79"
            height="80"
            viewBox="0 0 79 80"
            fill="none"
          >
            <circle cx="39.4639" cy="39.9436" r="39.375" fill="#3040D0" />
          </svg>
          <div class="absolute up">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="33"
              height="32"
              viewBox="0 0 33 32"
              fill="none"
            >
              <path
                d="M22.9861 18.8026L16.4637 12.2803L9.94141 18.8026"
                stroke="white"
                stroke-width="3.26117"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </button>
      </div>
      <section className="blogPage-main">
        <Link to="/blog" className="mt-100 back">
          &lt;Back
        </Link>
        <h1 className="blogpage-h1">
          Lorem ipsum dolor sit amet consectetur adipisicing.
        </h1>
        <p className="date-blog">12/12/2012</p>
        <img src={img} alt="" />
        <p className="blogpage-para">
          Lorem ipsum dolor sit amet consectetur. Quis urna neque quis
          pellentesque risus nisl diam natoque. Facilisis lacus nibh nibh lectus
          venenatis. Amet nibh elementum duis euismod id fringilla sed tincidunt
          at. Ultrices felis suspendisse amet tellus ac sed lorem. Sagittis eget
          lobortis iaculis sodales. Fames molestie varius eget convallis risus
          varius. Quis nec tortor ut proin arcu vel. Scelerisque blandit aliquet
          bibendum ipsum feugiat integer scelerisque in donec. Dignissim amet
          lectus amet luctus. Ultricies vel urna faucibus dolor aenean nunc.
          Molestie cras vitae sit eleifend eget ut netus gravida. Eget eros
          morbi urna nisl vel in aenean. Est nunc nunc quis ultricies
          consectetur lorem faucibus. Nunc posuere tellus elementum aliquam.
          Commodo orci mattis dignissim congue pellentesque sit varius orci
          pulvinar. Pellentesque vitae fermentum a auctor sit eget. Orci ipsum
          blandit auctor non vitae et auctor congue. In tristique nulla id
          tristique turpis pharetra purus dictum. Nibh tincidunt fringilla nisl
          tellus nec in adipiscing. Auctor non sem in cras et sagittis
          ullamcorper ut ac. Natoque maecenas praesent faucibus vel in enim.
          Quis commodo pulvinar sed amet cras eget pellentesque dui. Lectus
          egestas purus ut cras mauris sed vel. Justo ultricies morbi nibh eget
          odio vitae turpis. Aliquam vel tincidunt lectus lectus natoque morbi
          commodo fringilla. Maecenas malesuada feugiat imperdiet tincidunt
          varius. Vehicula tristique mi nulla nunc tortor aliquet nunc velit at.
          Ipsum pellentesque aliquam iaculis scelerisque eu convallis congue.
          Enim nibh id congue ipsum dictum parturient ut. Egestas at suspendisse
          volutpat accumsan venenatis in tempor. A libero ut integer egestas
          neque et rhoncus. Est nibh viverra faucibus mi. Est sit ipsum vitae
          justo semper volutpat sit sit justo. Sed dolor nulla tellus consequat
          vivamus et tempor sagittis bibendum. Massa nisl vivamus urna dolor
          praesent commodo. Justo fermentum aenean hendrerit mi. Ultrices massa
          et auctor arcu. Vulputate facilisis sagittis sit integer. Commodo eros
          ultrices enim velit. At id vitae mauris pellentesque. Egestas cras sed
          elit eu a amet mauris dui. Aliquam facilisis tempor orci elementum
          donec sagittis donec pretium ultrices. Cursus ipsum sollicitudin quis
          non viverra sapien. Vulputate dictum nec lorem viverra elit dignissim
          tempus venenatis sit. Hendrerit non posuere sagittis sem. Lacinia
          justo nibh sit iaculis in orci fringilla nec. Nisi porta tincidunt
          aliquet curabitur pulvinar eros metus. Suspendisse orci urna.
        </p>
        <p className="blogpage-para">
          Lorem ipsum dolor sit amet consectetur. Quis urna neque quis
          pellentesque risus nisl diam natoque. Facilisis lacus nibh nibh lectus
          venenatis. Amet nibh elementum duis euismod id fringilla sed tincidunt
          at. Ultrices felis suspendisse amet tellus ac sed lorem. Sagittis eget
          lobortis iaculis sodales. Fames molestie varius eget convallis risus
          varius. Quis nec tortor ut proin arcu vel. Scelerisque blandit aliquet
          bibendum ipsum feugiat integer scelerisque in donec. Dignissim amet
          lectus amet luctus. Ultricies vel urna faucibus dolor aenean nunc.
          Molestie cras vitae sit eleifend eget ut netus gravida. Eget eros
          morbi urna nisl vel in aenean. Est nunc nunc quis ultricies
          consectetur lorem faucibus. Nunc posuere tellus elementum aliquam.
          Commodo orci mattis dignissim congue pellentesque sit varius orci
          pulvinar. Pellentesque vitae fermentum a auctor sit eget. Orci ipsum
          blandit auctor non vitae et auctor congue. In tristique nulla id
          tristique turpis pharetra purus dictum. Nibh tincidunt fringilla nisl
          tellus nec in adipiscing. Auctor non sem in cras et sagittis
          ullamcorper ut ac. Natoque maecenas praesent faucibus vel in enim.
          Quis commodo pulvinar sed amet cras eget pellentesque dui. Lectus
          egestas purus ut cras mauris sed vel. Justo ultricies morbi nibh eget
          odio vitae turpis. Aliquam vel tincidunt lectus lectus natoque morbi
          commodo fringilla. Maecenas malesuada feugiat imperdiet tincidunt
          varius. Vehicula tristique mi nulla nunc tortor aliquet nunc velit at.
          Ipsum pellentesque aliquam iaculis scelerisque eu convallis congue.
          Enim nibh id congue ipsum dictum parturient ut. Egestas at suspendisse
          volutpat accumsan venenatis in tempor. A libero ut integer egestas
          neque et rhoncus. Est nibh viverra faucibus mi. Est sit ipsum vitae
          justo semper volutpat sit sit justo. Sed dolor nulla tellus consequat
          vivamus et tempor sagittis bibendum. Massa nisl vivamus urna dolor
          praesent commodo. Justo fermentum aenean hendrerit mi. Ultrices massa
          et auctor arcu. Vulputate facilisis sagittis sit integer. Commodo eros
          ultrices enim velit. At id vitae mauris pellentesque. Egestas cras sed
          elit eu a amet mauris dui. Aliquam facilisis tempor orci elementum
          donec sagittis donec pretium ultrices. Cursus ipsum sollicitudin quis
          non viverra sapien. Vulputate dictum nec lorem viverra elit dignissim
          tempus venenatis sit. Hendrerit non posuere sagittis sem. Lacinia
          justo nibh sit iaculis in orci fringilla nec. Nisi porta tincidunt
          aliquet curabitur pulvinar eros metus. Suspendisse orci urna.
        </p>
        <p className="blogpage-para">
          Lorem ipsum dolor sit amet consectetur. Quis urna neque quis
          pellentesque risus nisl diam natoque. Facilisis lacus nibh nibh lectus
          venenatis. Amet nibh elementum duis euismod id fringilla sed tincidunt
          at. Ultrices felis suspendisse amet tellus ac sed lorem. Sagittis eget
          lobortis iaculis sodales. Fames molestie varius eget convallis risus
          varius. Quis nec tortor ut proin arcu vel. Scelerisque blandit aliquet
          bibendum ipsum feugiat integer scelerisque in donec. Dignissim amet
          lectus amet luctus. Ultricies vel urna faucibus dolor aenean nunc.
          Molestie cras vitae sit eleifend eget ut netus gravida. Eget eros
          morbi urna nisl vel in aenean. Est nunc nunc quis ultricies
          consectetur lorem faucibus. Nunc posuere tellus elementum aliquam.
          Commodo orci mattis dignissim congue pellentesque sit varius orci
          pulvinar. Pellentesque vitae fermentum a auctor sit eget. Orci ipsum
          blandit auctor non vitae et auctor congue. In tristique nulla id
          tristique turpis pharetra purus dictum. Nibh tincidunt fringilla nisl
          tellus nec in adipiscing. Auctor non sem in cras et sagittis
          ullamcorper ut ac. Natoque maecenas praesent faucibus vel in enim.
          Quis commodo pulvinar sed amet cras eget pellentesque dui. Lectus
          egestas purus ut cras mauris sed vel. Justo ultricies morbi nibh eget
          odio vitae turpis. Aliquam vel tincidunt lectus lectus natoque morbi
          commodo fringilla. Maecenas malesuada feugiat imperdiet tincidunt
          varius. Vehicula tristique mi nulla nunc tortor aliquet nunc velit at.
          Ipsum pellentesque aliquam iaculis scelerisque eu convallis congue.
          Enim nibh id congue ipsum dictum parturient ut. Egestas at suspendisse
          volutpat accumsan venenatis in tempor. A libero ut integer egestas
          neque et rhoncus. Est nibh viverra faucibus mi. Est sit ipsum vitae
          justo semper volutpat sit sit justo. Sed dolor nulla tellus consequat
          vivamus et tempor sagittis bibendum. Massa nisl vivamus urna dolor
          praesent commodo. Justo fermentum aenean hendrerit mi. Ultrices massa
          et auctor arcu. Vulputate facilisis sagittis sit integer. Commodo eros
          ultrices enim velit. At id vitae mauris pellentesque. Egestas cras sed
          elit eu a amet mauris dui. Aliquam facilisis tempor orci elementum
          donec sagittis donec pretium ultrices. Cursus ipsum sollicitudin quis
          non viverra sapien. Vulputate dictum nec lorem viverra elit dignissim
          tempus venenatis sit. Hendrerit non posuere sagittis sem. Lacinia
          justo nibh sit iaculis in orci fringilla nec. Nisi porta tincidunt
          aliquet curabitur pulvinar eros metus. Suspendisse orci urna.
        </p>
      </section>
      <section className="similar">
        <h1 className="similar-h1">Similar articles</h1>
        <div className="similar-blogs">
          <div class="blog-box" id="display">
            <div class="in-box">
              <img src={img} alt="" />

              <p class="pt-4 pb-0">Lorem ipsum dolor sit amet consectetur.</p>
              <span class="date p4">12/12/2012</span>
              <p class="pt-2">
                <Link to="/Blog1">Read More</Link>
              </p>
            </div>
          </div>
          <div class="blog-box" id="display2">
            <div class="in-box">
              <img src={img} alt="" />

              <p class="pt-4 pb-0">Lorem ipsum dolor sit amet consectetur.</p>
              <span class="date p4">12/12/2012</span>
              <p class="pt-2">
                <Link to="/Blog1">Read More</Link>
              </p>
            </div>
          </div>
          <div class="blog-box">
            <div class="in-box">
              <img src={img} alt="" />

              <p class="pt-4 pb-0">Lorem ipsum dolor sit amet consectetur.</p>
              <span class="date p4">12/12/2012</span>
              <p class="pt-2">
                <Link to="/Blog1">Read More</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section class="news-letter mt-16 flex items-center justify-center pt16 bg-[#F4F7FA]">
        <div class="letter flex items-center justify-center flex-col">
          <h1>Subscribe to our newsletter</h1>
          <p class="pt-1 pb-8 max-md:w-full">
            Lorem ipsum dolor sit amet consectetur. Congue arcu in vel pretium
            et ac in suspendisse.
          </p>

          <>
            {error ? (
              <>
                <div className="w-[333px] h-11 p-2.5 bg-orange-100 rounded-xl flex-col justify-start items-start gap-2 inline-flex my-5">
                  <div className="justify-center items-center gap-[19px] inline-flex">
                    <div className="w-6 h-6 relative" />
                    <div className="text-orange-900 text-xs font-normal font-['poppins'] leading-[18px]">
                      please enter email id to subscribe
                    </div>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}

            <div class="input-news flex max-md:flex-wrap max-md:gap-8 max-md:justify-center">
              <input
                value={email}
                onChange={handleInputChange}
                type="email"
                placeholder="enter your email"
                required
              />
              <button onClick={handleSubmit} class="subscribe ml-2">
                Subscribe
              </button>
            </div>
          </>
          {subscribed ? (
            <div className="thanks my-5">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                >
                  <path
                    d="M10.3802 18.5001L4.68018 12.8001L6.10518 11.3751L10.3802 15.6501L19.5552 6.4751L20.9802 7.9001L10.3802 18.5001Z"
                    fill="#204F0A"
                  />
                </svg>
              </div>
              <h3>Thank you for subscribing!</h3>
            </div>
          ) : (
            ""
          )}
        </div>
      </section>
    </>
  );
};

export default Blogpage;
