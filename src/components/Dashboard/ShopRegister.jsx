import React, { useState } from "react";
import { Table, Modal } from "antd";
import { LuEye } from "react-icons/lu";
import { MdBlockFlipped, MdDelete } from "react-icons/md";

const ShopRegister = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // ✅ Demo Data (replace with API later)
  const paginatedUsers = [
    {
      key: 1,
      name: "John Doe",
      image: "https://i.pravatar.cc/150?img=1",
      connectedDate: "2024-01-10",
      duration: "3 Months",
      subscription: "Premium",
      relationship: "Committed",
      email: "john@example.com",
    },
    {
      key: 2,
      name: "Sarah Smith",
      image: "https://i.pravatar.cc/150?img=2",
      connectedDate: "2024-02-15",
      duration: "1 Month",
      subscription: "Free",
      relationship: "Single",
      email: "sarah@example.com",
    },
  ];

  // ✅ Modal handlers
  const showModal = (record) => {
    setSelectedUser(record);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };


  const handleBlock = (user) => {
    console.log("Block user:", user);
  };

  const handleDelete = (user) => {
    console.log("Delete user:", user);
  };

  // ✅ Table Columns
  const columns = [
    {
      title: "User",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={record.image}
            className="w-10 h-10 object-cover rounded-full border"
            alt=""
          />
          <span className="font-medium">{record.name}</span>
        </div>
      ),
    },
    {
      title: "Connected Date",
      dataIndex: "connectedDate",
    },
    {
      title: "Duration",
      dataIndex: "duration",
    },
    {
      title: "Subscription",
      dataIndex: "subscription",
      render: (text) => (
        <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-md text-xs">
          {text}
        </span>
      ),
    },
    {
      title: "Relationship",
      dataIndex: "relationship",
      render: (text) => (
        <span className="px-2 py-1 bg-pink-100 text-pink-600 rounded-md text-xs">
          {text}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <button onClick={() => showModal(record)}>
            <LuEye className="text-xl text-blue-600" />
          </button>

          <button
            onClick={() => handleBlock(record)}
            className="bg-red-500 text-white p-1 rounded"
          >
            <MdBlockFlipped />
          </button>

          <button
            onClick={() => handleDelete(record)}
            className="bg-gray-800 text-white p-1 rounded"
          >
            <MdDelete />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="">
       <div className="flex mb-3 justify-between">
        <p className="text-xl  font-semibold text-gray-800">
          Recent Collaboration
        </p>
        <button className="text-[#B7835E]">View All</button>
       </div>
      <Table
        dataSource={paginatedUsers}
        columns={columns}
        pagination={false}
        scroll={{ x: "max-content" }}
      />

      {/* ✅ Modal */}
      <Modal
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
        centered
      >
        {selectedUser && (
          <div className="p-5 text-center">
            {/* Profile */}
            <div className="flex flex-col items-center">
              <img
                src={selectedUser.image}
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-200 mb-3"
                alt=""
              />
              <h2 className="text-xl font-bold">{selectedUser.name}</h2>
              <p className="text-gray-500 text-sm">
                {selectedUser.email}
              </p>
            </div>

            {/* Info */}
            <div className="mt-6 space-y-3 text-left">
              <div className="flex justify-between bg-gray-50 p-3 rounded-lg">
                <span className="text-gray-500">Connected Date</span>
                <span className="font-medium">
                  {selectedUser.connectedDate}
                </span>
              </div>

              <div className="flex justify-between bg-gray-50 p-3 rounded-lg">
                <span className="text-gray-500">Duration</span>
                <span className="font-medium">
                  {selectedUser.duration}
                </span>
              </div>

              <div className="flex justify-between bg-gray-50 p-3 rounded-lg">
                <span className="text-gray-500">Subscription</span>
                <span className="text-blue-600 font-medium">
                  {selectedUser.subscription}
                </span>
              </div>

              <div className="flex justify-between bg-gray-50 p-3 rounded-lg">
                <span className="text-gray-500">Relationship</span>
                <span className="text-pink-600 font-medium">
                  {selectedUser.relationship}
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => handleBlock(selectedUser)}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg"
              >
                Block
              </button>
              <button
                onClick={() => handleDelete(selectedUser)}
                className="flex-1 bg-gray-800 text-white py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ShopRegister;