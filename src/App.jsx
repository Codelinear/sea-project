import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Blog from "./components/pages/blog/Blog";
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
function App() {
  function ScrollToTop() {
    // const history = useHistory();
    useEffect(() => {
      // const unlisten = history.listen(() => {
      window.scrollTo(0, 0); // Scroll to the top of the page
      // });
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
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
