import React, { useState } from "react";
import {
  Input,
  Pagination,
  Select,
  Table,
  DatePicker,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { Navigate } from "../../Navigate";

const Report = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const pageSize = 10;

  // ✅ Data
  const [reports] = useState(
    Array.from({ length: 20 }, (_, index) => ({
      key: index + 1,
      name: `User ${index + 1}`,
      email: `user${index + 1}@example.com`,
      image: `https://i.pravatar.cc/150?img=${index + 1}`,
      title: `Report Title ${index + 1}`,
      date: dayjs()
        .subtract(index, "day")
        .format("YYYY-MM-DD"),
      status: ["Resolved", "Pending", "Dismissed"][
        index % 3
      ],
    }))
  );

  // ✅ Filtering
  const filteredData = reports.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.email.toLowerCase().includes(searchText.toLowerCase());

    const matchStatus = statusFilter
      ? item.status === statusFilter
      : true;

    const matchDate = selectedDate
      ? dayjs(item.date).isSame(selectedDate, "day")
      : true;

    return matchSearch && matchStatus && matchDate;
  });

  // Pagination
  const start = (currentPage - 1) * pageSize;
  const paginatedData = filteredData.slice(start, start + pageSize);

  // ✅ Columns
  const columns = [
    {
      title: "User",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={record.image}
            className="w-10 h-10 rounded-full"
            alt=""
          />
          <div>
            <p className="font-medium">{record.name}</p>
            <p className="text-xs text-gray-500">
              {record.email}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text) => {
        const color =
          text === "Resolved"
            ? "green"
            : text === "Pending"
            ? "orange"
            : "red";

        return (
          <span
            className={`px-2 py-1 rounded text-xs bg-${color}-100 text-${color}-600`}
          >
            {text}
          </span>
        );
      },
    },
  ];

  return (
    <div className="bg-white p-3 h-[87vh] overflow-auto">
      <div className="flex justify-between mb-4">
        <Navigate title={"Report"} />

        <div className="flex gap-3 ">
          {/* Search */}
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined />}
            onChange={(e) => setSearchText(e.target.value)}
          style={{ maxWidth: "200px", height: "40px" }}
          />

          {/* ✅ Single DatePicker */}
          <DatePicker
            onChange={(date) => setSelectedDate(date)}
            style={{ maxWidth: "300px", height: "40px" }}
          />

          {/* Status Filter */}
          <Select
            placeholder="Sort by Status"
            onChange={(val) => setStatusFilter(val)}
            allowClear
            options={[
              { value: "Resolved", label: "Resolved" },
              { value: "Pending", label: "Pending" },
              { value: "Dismissed", label: "Dismissed" },
            ]}
           style={{ maxWidth: "200px", height: "40px" }}
          />
        </div>
      </div>

      <Table
        dataSource={paginatedData}
        columns={columns}
        pagination={false}
        rowKey="key"
      />

      <div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filteredData.length}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default Report;