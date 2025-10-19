import React, { useState } from "react";
import * as XLSX from "xlsx";
import { Button, Upload, message, Table, Tabs } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const CirriculumPage = () => {
  const [sheetsData, setSheetsData] = useState({});
  const [activeSheet, setActiveSheet] = useState('');

  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (evt) => {
      const workbook = XLSX.read(evt.target.result, { type: "binary" });
      const allSheetsData = {};
      
      // Đọc tất cả các sheet
      workbook.SheetNames.forEach(sheetName => {
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: "" });
        allSheetsData[sheetName] = jsonData;
      });
      
      setSheetsData(allSheetsData);
      setActiveSheet(workbook.SheetNames[0]); // Set sheet đầu tiên làm active
      message.success(`Đã tải ${workbook.SheetNames.length} sheet thành công!`);
    };
    reader.readAsBinaryString(file);
    return false; // Prevent auto upload
  };

  const uploadProps = {
    name: 'file',
    accept: '.xlsx,.xls',
    beforeUpload: handleFileUpload,
    showUploadList: false,
  };

  // Tạo columns cho Ant Design Table dựa trên dữ liệu
  const createColumns = (data) => {
    if (!data || data.length === 0) return [];
    
    return Object.keys(data[0]).map(key => ({
      title: key,
      dataIndex: key,
      key: key,
      width: 150,
      render: (text, record, index) => (
        <input
          value={text || ''}
          onChange={(e) => handleCellChange(activeSheet, index, key, e.target.value)}
          className="w-full border-none outline-none p-1"
          style={{ background: 'transparent' }}
        />
      ),
    }));
  };

  const handleCellChange = (sheetName, rowIndex, key, value) => {
    const updatedSheetsData = { ...sheetsData };
    updatedSheetsData[sheetName][rowIndex][key] = value;
    setSheetsData(updatedSheetsData);
  };

  const handleExportJSON = () => {
    console.log("Tất cả dữ liệu sheets:", sheetsData);
    console.log("Dữ liệu sheet hiện tại:", sheetsData[activeSheet]);
    alert("Xem JSON trong console");
  };

  // Cập nhật tabItems
  const tabItems = Object.keys(sheetsData).map(sheetName => ({
    key: sheetName,
    label: sheetName,
    children: (
      <div className="table-wrapper w-full h-full">
        <Table
          columns={createColumns(sheetsData[sheetName])}
          dataSource={sheetsData[sheetName].map((row, index) => ({
            ...row,
            key: index
          }))}
          pagination={false}
          scroll={{ x: 'max-content', y: 'calc(100vh - 250px)' }}
          size="small"
          bordered
          style={{
            width: '100%',
            transition: 'all 0.3s ease'
          }}
        />
      </div>
    )
  }));

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="p-4 flex flex-col h-full">
        <div className="mb-4 flex justify-center">
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />} size="large">
              Tải lên file Excel
            </Button>
          </Upload>
        </div>
        
        {Object.keys(sheetsData).length > 0 && (
          <div className="flex-1 flex flex-col min-w-0">
            <div className="mb-4 flex justify-center items-center gap-4">
              <Button 
                type="primary" 
                onClick={handleExportJSON}
              >
                Xuất JSON
              </Button>
              <span className="text-gray-600">
                Tổng số sheet: {Object.keys(sheetsData).length}
              </span>
            </div>

            <div className="flex-1 overflow-hidden">
              <Tabs
                activeKey={activeSheet}
                onChange={setActiveSheet}
                items={tabItems}
                type="card"
                size="small"
                style={{ 
                  height: '100%',
                  transition: 'width 0.3s ease',
                  textAlign: 'left' // Thêm style này
                }}
                // Xóa prop centered
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CirriculumPage;
