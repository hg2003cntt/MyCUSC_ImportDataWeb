import React, { useState } from "react";
import * as XLSX from "xlsx";
import { Button, Upload, message, Table, Tabs } from 'antd';
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons';

const StudentPage = () => {
  const [sheetsData, setSheetsData] = useState({});
  const [activeSheet, setActiveSheet] = useState('');

  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (evt) => {
      const workbook = XLSX.read(evt.target.result, { type: "binary" });
      const allSheetsData = {};
      
      workbook.SheetNames.forEach(sheetName => {
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, {
          raw: false,
          cellDates: true, // Thêm option này để nhận dạng cell dạng date
          dateNF: 'dd/mm/yyyy', 
          defval: ""
        });

        // Xử lý dữ liệu để chuyển đổi ngày tháng
        const processedData = jsonData.map(row => {
          const newRow = {};
          Object.keys(row).forEach(key => {
            if (row[key] && typeof row[key] === 'string') {
              // Kiểm tra nếu là ngày tháng với format dd/mm/yy hoặc dd/mm/yyyy
              const dateMatch = row[key].match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/);
              if (dateMatch) {
                const [_, day, month, year] = dateMatch;
                // Xử lý năm 2 chữ số thành 4 chữ số
                let fullYear = parseInt(year);
                if (year.length === 2) {
                  fullYear = fullYear + (fullYear < 50 ? 2000 : 1900);
                }
                // Format lại ngày tháng với năm 4 chữ số
                newRow[key] = `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${fullYear}`;
                return;
              }
            }
            newRow[key] = row[key];
          });
          return newRow;
        });

        allSheetsData[sheetName] = processedData;
      });
      
      setSheetsData(allSheetsData);
      setActiveSheet(workbook.SheetNames[0]);
      message.success(`Đã tải ${workbook.SheetNames.length} sheet thành công!`);
    };
    reader.readAsBinaryString(file);
    return false;
  };

  const uploadProps = {
    name: 'file',
    accept: '.xlsx,.xls',
    beforeUpload: handleFileUpload,
    showUploadList: false,
  };

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

  const handleDownloadTemplate = () => {
    const templateUrl = '/files/DSSV.xlsx';
    
    const link = document.createElement('a');
    link.href = templateUrl;
    link.download = 'MauDanhSachSinhVien.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    message.success('Đang tải file mẫu...');
  };

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
        <div className="mb-4 flex justify-center gap-4">
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />} size="large">
              Tải lên file Excel
            </Button>
          </Upload>
          
          <Button 
            icon={<DownloadOutlined />} 
            size="large"
            onClick={handleDownloadTemplate}
          >
            Tải file mẫu
          </Button>
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
                  textAlign: 'left'
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentPage;