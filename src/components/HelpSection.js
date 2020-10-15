import React from "React";
import { developers } from "../data/developerProfile";
import { createFromIconfontCN } from "@ant-design/icons";

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
});

const HelpSection = () => {
  return (
    <div className="all-profile-wrapper" style={{ display: "flex" }}>
      {developers.map(
        ({ name, phoneNo, role, email, facebookLink, profileImageUrl }) => {
          return (
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-3 mb-5 h-full">
              <div className="rounded-lg border shadow-xl overflow-hidden bg-white">
                <div className="w-xl h-64">
                  <img
                    src={profileImageUrl}
                    className="w-full max-h-80 object-contain"
                  />
                </div>
                <div className="px-5 py-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-gray-800 text-xl font-bold truncate">
                      {name}
                    </h2>
                  </div>
                </div>
                <p className="text-gray-600 p-4">
                  <span>Role: {role}</span>
                  <br />
                  <span>PhoneNo: {phoneNo}</span>
                  <br />
                  <span>Email: {email}</span>
                  <br />
                  <a
                    href={facebookLink}
                    target="__blank"
                    className="text-center"
                  >
                    <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold p-1 rounded inline-flex items-center mt-6">
                      <IconFont type="icon-facebook" />
                    </button>
                  </a>
                </p>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};
export default HelpSection;
