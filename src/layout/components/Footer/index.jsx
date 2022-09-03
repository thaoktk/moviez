import { BsGithub, BsFacebook } from "react-icons/bs";

function Footer() {
  return (
    <div className="mt-5 p-5 text-center">
      <span className="block text-xl text-white">
        Development by <code className="text-red">Thaoktk - CTer</code> with ❤️
      </span>
      <div className="mt-4 flex items-center justify-center gap-5">
        <a
          className="block"
          target="_blank"
          rel="noreferrer"
          href="https://github.com/thaoktk"
        >
          <BsGithub className="text-xl text-white" />
        </a>
        <a
          className="block"
          target="_blank"
          rel="noreferrer"
          href="https://www.facebook.com/thaoktk0508"
        >
          <BsFacebook className="text-xl text-white" />
        </a>
      </div>
    </div>
  );
}

export default Footer;
