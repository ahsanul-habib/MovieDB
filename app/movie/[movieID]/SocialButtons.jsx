"use client";

import Image from "next/image";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";

const SocialButtons = () => {
  return (
    <>
      <FacebookShareButton url={window.location.origin}>
        <button className="text-center cursor-pointer">
          <Image
            height={32}
            width={32}
            src="http://facebook.com/favicon.ico"
            alt="Facebook"
            className="w-8 h-8 rounded-full object-cover mb-2 mx-auto"
          />
          <p className="text-sm">Facebook</p>
        </button>
      </FacebookShareButton>
      <TwitterShareButton url={window.location.origin}>
        <button className="text-center cursor-pointer">
          <Image
            height={32}
            width={32}
            src="http://x.com/favicon.ico"
            alt="Facebook"
            className="w-8 h-8 rounded-full object-cover mb-2 mx-auto"
          />
          <p className="text-sm">X</p>
        </button>
      </TwitterShareButton>
      <LinkedinShareButton url={window.location.origin}>
        <button className="text-center cursor-pointer">
          <Image
            height={32}
            width={32}
            src="http://linkedin.com/favicon.ico"
            alt="Facebook"
            className="w-8 h-8 rounded-full object-cover mb-2 mx-auto"
          />
          <p className="text-sm">Linkedin</p>
        </button>
      </LinkedinShareButton>
    </>
  );
};

export default SocialButtons;
