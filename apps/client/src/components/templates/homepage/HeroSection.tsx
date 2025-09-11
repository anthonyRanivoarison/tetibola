import {Link} from "react-router-dom";
import {ArrowRight, Mails} from "lucide-react";

const Hero = () => {
  return (
    <section id="hero" className="py-4 mt-2 my-8 text-center">
      <h2 className="text-5xl font-bold mb-4 text-indigo-600 dancing-script-font">
        Manage Your Expenses with Ease
      </h2>
      <p className="text-gray-600 mb-8">
        Tetibola, your expense tracking app for better financial control.
      </p>
      <div className="flex justify-center gap-4">
        <Link to="/signup"
           className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-500 transition flex items-center gap-2">
          Get started <ArrowRight />
        </Link>
        <a href="mailto:antonitsiory@gmail.com"
           className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition flex items-center gap-2">
          Contact us <Mails />
        </a>
      </div>
    </section>
  );
};

export default Hero;
