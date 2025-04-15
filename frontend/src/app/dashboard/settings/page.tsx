import React from "react";

const page = () => {
  return (
    <div
      className="overflow-y-auto p-2"
      style={{ maxHeight: "calc(100vh - 80px)" }}
    >
      <div className="p-5">
        <h2 className="text-lg font-bold border-b border-gray-200 p-1">
          Delete Account
        </h2>
        <div className="p-4 rounded-md mt-2 bg-red-50">
          <p className="p-1 my-2">
            Permanently delete your account and all associated data.
          </p>
          <p className="p-1 my-2">
            This action cannot be undone. Once you delete your account:
          </p>
          <ul className="list-disc list-inside p-1 my-2">
            <li>
              Your profile, settings, and preferences will be permanently
              erased.
            </li>
            <li>All your data will be removed from our servers.</li>
            <li>
              You will lose access to all services linked to your account.
            </li>
          </ul>
          <p className="p-1 my-2 text-red-600 font-bold">
            Please proceed only if you're sure. This action is irreversible.
          </p>
          <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
            Delete My Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
