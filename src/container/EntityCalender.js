import React, { useEffect, useState } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import { getLeaveRequestDetails, leaveRequestApply } from '../Redux/Action/LeaveAndAttandanceAction';

export default function AttendanceBigCalendar() {
  const dispatch = useDispatch();

  const { userId, role } = useSelector((state) => state.loginReducer);
  const { leaveRequest, loader, noDataFound } = useSelector((state) => state.leaveRequestReducer);

  console.log("Leave Request Data:", leaveRequest);

  const [isModal, SetIsModal] = useState(false);
  const [formData, setFormData] = useState({
    leaveType: "",
    date: ""
  });

  const locales = {
    'en-US': require('date-fns/locale/en-US')
  };

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  const statusMap = {
    '2025-07-01': { title: 'Present', color: '#43a047' },
    '2025-07-02': { title: 'Absent', color: '#e53935' },
    '2025-07-05': { title: 'Holiday', color: '#fbc02d' },
    '2025-07-06': { title: 'Leave', color: '#1e88e5' }
  };

  const events = Object.entries(statusMap).map(([date, status]) => ({
    title: status.title,
    start: new Date(date),
    end: new Date(date),
    allDay: true,
    color: status.color
  }));

  function EventStyleGetter(event) {
    return {
      style: {
        backgroundColor: event.color,
        borderRadius: '6px',
        color: '#fff',
        border: 'none',
        padding: '2px 6px'
      }
    };
  }

  useEffect(() => {
    dispatch(getLeaveRequestDetails());
  }, [dispatch]);

  const handlerChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };


  const formSubmit = async () => {
    let data = {
      leaveType: formData.leaveType,
      date: formData.date
    };
    dispatch(leaveRequestApply(data, SetIsModal));
  };

  return (
    <>
      <div className="header">
        <h1>Students</h1>
        <div className="header-right">
          <button type="button" className="btn btn-outline-primary" onClick={() => SetIsModal(true)}>Apply Attendance</button>
        </div>
      </div>
      <div className="content-body">
        <div className="card" style={{ height: 500 }}>
          <div className="card-body">
            <BigCalendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              views={['month', 'week', 'day']}
              eventPropGetter={EventStyleGetter}
              popup
            />
          </div>
        </div>
      </div>

      {isModal &&
        <div className="modal d-block">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Apply Leave</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => SetIsModal(false)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-content">
                  <div className="form-group">
                    <label className="form-group-label">Attendance Type</label>
                    <select className="form-control" name="attendanceType" onChange={(e) => handlerChange(e)}>
                      <option value="">Select Attendance Type</option>
                      <option value="LATE">Late</option>
                      <option value="PRESENT">Present</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-group-label">Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="date"
                      pattern="\d{4}-\d{2}-\d{2}"
                      onChange={(e) => handlerChange(e)}
                      value={formData.date}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => SetIsModal(false)}>Close</button>
                <button type="button" className="btn btn-primary" onClick={() => formSubmit()}>Save changes</button>
              </div>
            </div>
          </div>
        </div>}
    </>
  );
}