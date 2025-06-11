import React from "react";
import Header from "./Header";   // file Header bạn đã có
import Sidebar from "./Sidebar"; // file Sidebar bạn vừa tạo

export default function Layout({ user, children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header user={user} />
      <div className="flex flex-1">
        {user && <Sidebar />}
        <main className="flex-1 p-4 bg-gray-100 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
