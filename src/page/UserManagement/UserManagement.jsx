import React, { useState } from "react";
import { Input, Modal, Pagination, Select, Table, message } from "antd";
import { MdBlockFlipped } from "react-icons/md";
import { SearchOutlined } from "@ant-design/icons";
import { LuEye } from "react-icons/lu";
import { Navigate } from "../../Navigate";

const UserManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // ✅ FIXED DATA
  const [users, setUsers] = useState(
    Array.from({ length: 8 }, (_, index) => ({
      key: index + 1,
      name: `User ${index + 1}`,
      email: `user${index + 1}@example.com`,
      phone: `+8801${Math.floor(100000000 + Math.random() * 900000000)}`,
      image: `https://i.pravatar.cc/150?img=${index + 1}`,

      partnerConnection: `${Math.floor(Math.random() * 5) + 1} Partners`,
      subscription: index % 2 === 0 ? "Premium" : "Free",
      status: index % 2 === 0 ? "Active" : "Blocked",
    })),
  );

  // Modal state
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const showModal2 = (record) => {
    setSelectedUser(record);
    setIsModalOpen2(true);
  };

  const handleCancel2 = () => {
    setIsModalOpen2(false);
    setSelectedUser(null);
  };

  // ✅ REAL Block / Unblock toggle
  const handleBlockUnblock = (id) => {
    const updated = users.map((user) =>
      user.key === id
        ? {
            ...user,
            status: user.status === "Active" ? "Blocked" : "Active",
          }
        : user,
    );

    setUsers(updated);
    message.success("Status updated successfully");
  };

  // ✅ Columns
  const columns = [
    {
      title: "User",
      key: "user",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={record.image}
            className="w-10 h-10 object-cover rounded-full"
            alt=""
          />
          <div>
            <p className="font-medium">{record.name}</p>
            <p className="text-xs text-gray-500">{record.email}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Partner Connection",
      dataIndex: "partnerConnection",
    },
    {
      title: "Subscription",
      dataIndex: "subscription",
      render: (text) => (
        <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs">
          {text}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text) => (
        <span
          className={`px-2 py-1 rounded text-xs ${
            text === "Active"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2 items-center">
          <button onClick={() => showModal2(record)}>
            <LuEye className="text-xl text-blue-600" />
          </button>

          <button
            onClick={() => handleBlockUnblock(record.key)}
            className={`w-[30px] h-[30px] flex justify-center items-center text-xl rounded-md ${
              record.status === "Active" ? "bg-red-500" : "bg-green-600"
            } text-white`}
          >
            <MdBlockFlipped />
          </button>
        </div>
      ),
    },
  ];

  // Pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Paginated Data
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const paginatedUsers = users.slice(start, end);

  return (
    <div className="bg-white p-3 h-[87vh] overflow-auto">
      <div className="flex justify-between">
        <Navigate title={"User Management"} />

        <div className="flex gap-4">
          <Select
            placeholder="Sort by Status"
            options={[
              { value: "Active", label: "Active" },
              { value: "Blocked", label: "Blocked" },
            ]}
            style={{ maxWidth: "300px", height: "40px" }}
          />

          <Select
            placeholder="Subscription"
            options={[
              { value: "Free", label: "Free" },
              { value: "Individual Plan", label: "Individual Plan" },
              { value: "Individual Plan", label: "Couple" },
            ]}
            style={{ maxWidth: "300px", height: "40px" }}
          />

          <Input
            placeholder="Search by name..."
            prefix={<SearchOutlined />}
            style={{ maxWidth: "300px", height: "40px" }}
          />
          <div>
            <button className="bg-[#C09B7A80] py-2 text-[#8B4513] px-5 rounded">
              Export
            </button>
          </div>
        </div>
      </div>

      <Table
        dataSource={paginatedUsers}
        columns={columns}
        pagination={false}
        scroll={{ x: "max-content" }}
      />

      <div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={users.length}
          onChange={handlePageChange}
        />
      </div>

      {/* ✅ Modal */}
      <Modal
        open={isModalOpen2}
        centered
        onCancel={handleCancel2}
        footer={null}
      >
        {selectedUser && (
          <div className="p-5">
            <div className="flex flex-col items-center">
              <img
                src={selectedUser.image}
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-200 mb-3"
                alt=""
              />
              <h2 className="text-xl font-bold">{selectedUser.name}</h2>
              <p className="text-gray-500 text-sm">{selectedUser.email}</p>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex justify-between bg-gray-50 p-3 rounded-lg">
                <span>Phone</span>
                <span>{selectedUser.phone}</span>
              </div>

              <div className="flex justify-between bg-gray-50 p-3 rounded-lg">
                <span>Partner</span>
                <span>{selectedUser.partnerConnection}</span>
              </div>

              <div className="flex justify-between bg-gray-50 p-3 rounded-lg">
                <span>Subscription</span>
                <span className="text-blue-600">
                  {selectedUser.subscription}
                </span>
              </div>

              <div className="flex justify-between bg-gray-50 p-3 rounded-lg">
                <span>Status</span>
                <span
                  className={
                    selectedUser.status === "Active"
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {selectedUser.status}
                </span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserManagement;
