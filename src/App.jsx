import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Blog from "./components/pages/blog/Blog";
import Blogpage from "./components/pages/blogPage/blogPages";
import Contact from "./components/pages/contact/Contact";
import FAQ from "./components/pages/faq/FAQ";
import Home from "./components/pages/home/Home";
import Login from "./components/pages/login/Login";
import Meetowner from "./components/pages/meetOwner/Meetowner";
import Othertools from "./components/pages/othertools/Othertools";
import Roas from "./components/pages/raos/Roas";
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import Signup from "./components/pages/signup/Signup";
import { useEffect } from "react";
import Pricing from "./components/pages/pricing/Pricing";
import Freetrial from "./components/pages/Freetrial/Freetrial";
import UserAccount from "./components/userflow/UserAccount";
import Support from "./components/pages/support/Support";
import Qa from "./components/pages/qa/Qa";
import Payment from "./components/pages/payment/Payment";
import ConfirmEmail from "./components/pages/confirmEmail/ConfirmEmail";
import PasswordResetRequest from "./components/pages/passwordResetRequest/passwordResetRequest";
import PasswordReset from "./components/pages/passwordReset/passwordReset";
function App() {
  function ScrollToTop() {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    return null;
  }
  return (
    <div className="App ">
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route exact path="/user" element={<UserAccount />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/blog" element={<Blog />} />
          <Route exact path="/owner" element={<Meetowner />} />
          <Route exact path="/product" element={<Othertools />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/price" element={<Pricing />} />
          <Route exact path="/freetrail" element={<Freetrial />} />
          <Route exact path="/support" element={<Support />} />
          <Route exact path="/qa" element={<Qa />} />
          <Route exact path="/payment" element={<Payment />} />
          <Route exact path="/Blog1" element={<Blogpage />} />
          <Route exact path="/confirm-email" element={<ConfirmEmail />} />
          <Route
            exact
            path="/password-reset-request"
            element={<PasswordResetRequest />}
          />
          <Route exact path="/reset-password" element={<PasswordReset />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
