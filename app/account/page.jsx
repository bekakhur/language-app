"use client";

import Header from "@/components/Header";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  useUser,
} from "@clerk/nextjs";
import React from "react";

const page = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  return (
    <>
      <Header />
      <div className="min-h-screen font-light py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-center">
            Account Settings
          </h1>
          {/* Profile Information Section */}
          <SignedIn>
            <div className="bg-white rounded-xl p-8 mb-8 transform transition-transform duration-300">
              <h2 className="text-2xl font-semibold mb-6">
                Profile Information
              </h2>
              <div className="flex flex-col lg:flex-row lg:items-center gap-10">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    defaultValue={user?.username || ""}
                    className="w-[300px] sm:w-[380px] px-4 py-3 border rounded-lg focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue={
                      user?.primaryEmailAddress?.emailAddress ||
                      "Email не найден"
                    }
                    className="w-[300px] sm:w-[380px] px-4 py-3 border rounded-lg focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </SignedIn>
          {/* Subscription Plan Section */}
          <div className="bg-white rounded-xl p-8 transform transition-transform duration-300">
            <h2 className="text-2xl font-semibold mb-8">Subscription Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Monthly Plan Card */}
              <div className="border rounded-xl p-8 hover:shadow-xl transition-all">
                <h3 className="text-2xl font-bold mb-4">Monthly Plan</h3>
                <p className="text-green-700 text-lg font-semibold mb-6">
                  $9.99<span className="text-sm ">/month</span>
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center ">
                    <span className="mr-2">•</span>Access to all features
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>24/7 Support
                  </li>
                  <li className="flex items-center ">
                    <span className="mr-2">•</span>Cancel anytime
                  </li>
                </ul>
                <SignedIn>
                  <button className="w-full bg-green-400 py-3 px-6 shadow-lg rounded-lg hover:bg-green-500 focus:outline-none transition-colors active:bg-green-600">
                    Select Monthly Plan
                  </button>
                </SignedIn>
              </div>

              {/* Yearly Plan Card */}
              <div className="border rounded-xl p-8 hover:shadow-xl transition-all">
                <h3 className="text-2xl font-bold mb-4">Yearly Plan</h3>
                <p className="text-green-700 text-lg font-semibold mb-6">
                  $99.99<span className="text-sm ">/year</span>
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <span className="mr-2">•</span>Access to all features
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>24/7 Support
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>Save $19.89 compared to
                    monthly
                  </li>
                </ul>

                <SignedIn>
                  <button className="w-full bg-green-400 py-3 px-6 shadow-lg rounded-lg hover:bg-green-500 focus:outline-none transition-colors active:bg-green-600">
                    Select Yearly Plan
                  </button>
                </SignedIn>
              </div>
            </div>
          </div>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="mt-12 w-[200px] ml-[50%] -translate-x-[50%] bg-gradient-to-t from-green-500 to-green-300 py-3 shadow-lg rounded-lg hover:opacity-90 focus:outline-none transition-opacity active:opacity-95">
                Log In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <SignOutButton>
              <button className="mt-12 w-[200px] ml-[50%] -translate-x-[50%] bg-gradient-to-t from-red-500 to-red-300 py-3 shadow-lg rounded-lg hover:opacity-90 focus:outline-none transition-opacity active:opacity-95">
                Log Out
              </button>
            </SignOutButton>
          </SignedIn>
        </div>
      </div>
    </>
  );
};

export default page;
