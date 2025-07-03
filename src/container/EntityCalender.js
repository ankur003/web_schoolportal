import React from 'react';
import { Calendar, Badge } from 'antd';
import 'antd/dist/reset.css';

const statusMap = {
  '2025-07-01': { type: 'success', text: 'Present', color: '#43a047' },
  '2025-07-02': { type: 'error', text: 'Absent', color: '#e53935' },
  '2025-07-05': { type: 'warning', text: 'Holiday', color: '#fbc02d' },
  '2025-07-06': { type: 'processing', text: 'Leave', color: '#1e88e5' }
};

function dateCellRender(value) {
  const date = value.format('YYYY-MM-DD');
  const status = statusMap[date];
  return status ? (
    <div className="attendance-badge">
      <Badge color={status.color} text={status.text} />
    </div>
  ) : null;
}

export default function AntdCalendar() {
  return (
    <div className="attendance-calendar-page">
      <Calendar dateCellRender={dateCellRender} />
      <div className="legend">
        <span><span className="present-dot"></span>Present</span>
        <span><span className="absent-dot"></span>Absent</span>
        <span><span className="holiday-dot"></span>Holiday</span>
        <span><span className="leave-dot"></span>Leave</span>
      </div>
    </div>
  );
}