// CompactCalendarDashboard.js
import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { STUDENT, TEACHER } from '../../Redux/Constants';

// const USER_ID = 'd728037d-96c9-48df-880a-ab49dd58b7d2';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

const saturdayPulse = keyframes`
  0%, 100% { 
    box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.2);
  }
  50% { 
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0);
  }
`;

// Main Container - Reduced max-width
const Container = styled.div`
//   max-width: 850px;
//   margin: 0 auto;
//   background: #ffffff;
//   border-radius: 12px;
//   box-shadow: 0 3px 15px rgba(0, 0, 0, 0.08);
//   overflow: hidden;
//   font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//   border: 1px solid #e5e7eb;
`;

// BLOCK 1: Header - Reduced padding and sizes
const HeaderBlock = styled.div`
//   background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
`;

const HeaderTitle = styled.div`
  h1 {
    font-size: 1.4rem;
    margin: 0;
    font-weight: 700;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
  
  p {
    margin: 0.2rem 0 0 0;
    opacity: 0.85;
    font-size: 0.75rem;
  }
  
  @media (max-width: 768px) {
    text-align: center;
    
    h1 {
      font-size: 1.2rem;
    }
  }
`;

const MonthYearControls = styled.div`
  display: flex;
  gap: 0.6rem;
  align-items: center;
//   background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
//   padding: 0.6rem 1rem;
  border-radius: 8px;
//   border: 1px solid rgba(255, 255, 255, 0.2);
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const NavButton = styled.button`
  background: linear-gradient(90deg, #ffcf00 0%, #ffe066 100%);
  border: none;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.05);
  }
`;

const Select = styled.select`
  padding: 0.4rem 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.9);
  color: #374151;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  width:200px;
  
  &:focus {
    outline: none;
    border-color: white;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
  }
`;

const Input = styled.input`
  padding: 0.4rem 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.9);
  color: #374151;
  font-size: 0.85rem;
  font-weight: 600;
  width: 200px;
  text-align: center;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: white;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
  }
`;

// BLOCK 2: Counter - Reduced padding and sizes
const CounterBlock = styled.div`
//   background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
//   padding: 1.2rem 1.5rem;
margin-bottom:20px;
//   border-bottom: 1px solid #e5e7eb;
`;

const CounterTitle = styled.h2`
  text-align: center;
  font-size: 1.1rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 1rem 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 0.8rem;
  }
`;

const StatCard = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .icon {
    font-size: 1.3rem;
    margin-bottom: 0.3rem;
    display: block;
  }
  
  .number {
    font-size: 1.8rem;
    font-weight: 800;
    color: ${props => props.color};
    line-height: 1;
    margin-bottom: 0.2rem;
  }
  
  .label {
    font-size: 0.7rem;
    color: #6b7280;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }
`;

// BLOCK 3: Calendar - Reduced padding and cell sizes
const CalendarBlock = styled.div`
//   background: white;
//   padding: 1.2rem 1.5rem 1.5rem;
`;

const CalendarTitle = styled.h2`
  text-align: center;
  font-size: 1.4rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 1.2rem 0;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const CalendarGrid = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
//   border: 1px solid #e5e7eb;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const WeekHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  
  div {
    padding: 0.6rem 0.3rem;
    text-align: center;
    font-weight: 700;
    font-size: 0.7rem;
    color: white;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    
    &:last-child {
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
    }
  }
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const DayCell = styled.div`
  min-height: 60px;
  padding: 0.5rem 0.3rem;
  border-right: 1px solid #f3f4f6;
  border-bottom: 1px solid #f3f4f6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  
  &:nth-child(7n) {
    border-right: none;
  }
  
  &:hover {
    background: #f9fafb;
    transform: scale(1.03);
    z-index: 2;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .day-number {
    font-weight: 700;
    font-size: 0.9rem;
    margin-bottom: 0.2rem;
  }
  
  .day-status {
    font-size: 0.55rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.2px;
    padding: 0.1rem 0.3rem;
    border-radius: 3px;
    background: rgba(0, 0, 0, 0.05);
  }
  
  .status-dot {
    position: absolute;
    top: 4px;
    right: 4px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }
  
  /* Saturday highlighting */
  &.saturday {
    background: linear-gradient(135deg, #eef2ff, #e0e7ff);
    color: #4338ca;
    border: 1px solid #c7d2fe;
    animation: ${saturdayPulse} 3s infinite;
    
    .day-number {
      color: #4338ca;
      font-weight: 800;
    }
    
    .day-status {
      background: #ddd6fe;
      color: #5b21b6;
    }
  }
  
  /* Status colors */
  &.present {
    background: #f0fdf4;
    color: #166534;
    border-left: 3px solid #16a34a;
    .status-dot { background: #16a34a; }
  }
  
  &.absent {
    background: #fef2f2;
    color: #991b1b;
    border-left: 3px solid #dc2626;
    .status-dot { background: #dc2626; }
  }
  
  &.late {
    background: #fffbeb;
    color: #92400e;
    border-left: 3px solid #d97706;
    .status-dot { background: #d97706; }
  }
  
  &.sick-leave {
    background: #eff6ff;
    color: #1e40af;
    border-left: 3px solid #2563eb;
    .status-dot { background: #2563eb; }
  }
  
  &.weekend:not(.saturday) {
    background: #f9fafb;
    color: #6b7280;
  }
  
  @media (max-width: 768px) {
    min-height: 50px;
    padding: 0.4rem 0.2rem;
    
    .day-number {
      font-size: 0.8rem;
    }
  }
`;

// Modal - Reduced sizes
const Modal = styled.div`
  display: ${props => props.show ? 'flex' : 'none'};
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.2rem;
  max-width: 320px;
  width: 90%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  position: relative;
  animation: ${fadeIn} 0.3s ease-out;
  
  h3 {
    font-size: 1.1rem;
    font-weight: 700;
    color: #1f2937;
    margin: 0 0 1rem 0;
    text-align: center;
  }
  
  .detail {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
    border-bottom: 1px solid #f3f4f6;
    font-size: 0.85rem;
    
    &:last-child {
      border-bottom: none;
    }
    
    .label {
      font-weight: 600;
      color: #6b7280;
    }
    
    .value {
      font-weight: 700;
      color: #1f2937;
    }
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 0.6rem;
  right: 0.8rem;
  background: #f3f4f6;
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  cursor: pointer;
  color: #6b7280;
  transition: all 0.2s ease;
  
  &:hover {
    background: #e5e7eb;
    color: #374151;
  }
`;

const CompactCalendarDashboard = () => {
    const [attendanceData, setAttendanceData] = useState(null);
    const [year, setYear] = useState(2025);
    const [month, setMonth] = useState(7);
    const [selectedDay, setSelectedDay] = useState(null);
    const userRole = useSelector(state => state.loginReducer.role);
    const { feeUserId, fetchUserId } = useSelector(state => state.entityReducer);
    const { loginUserId } = useSelector((state) => state.loginReducer);
    const basePathUrl = process.env.REACT_APP_BASE_PATH;

    useEffect(() => {
        if (fetchUserId?.isNavigate && fetchUserId?.isNavigate === true) {
            fetchData(fetchUserId?.id);
        }
        else {
            fetchData(loginUserId);

        }
    }, [year, month]);

    const fetchData = async (id) => {
        try {
            const url = `${basePathUrl}/user/${id}/monthly-attendance?year=${year}&month=${month}`;
            const res = await axios.get(url);
            setAttendanceData(res.data);
        } catch (err) {
            console.error('Error fetching attendance data:', err);
            setAttendanceData(null);
        }
    };

    const navigateMonth = (direction) => {
        let newMonth = month + direction;
        let newYear = year;

        if (newMonth > 12) {
            newMonth = 1;
            newYear++;
        } else if (newMonth < 1) {
            newMonth = 12;
            newYear--;
        }

        setMonth(newMonth);
        setYear(newYear);
    };

    const getCount = (key) => attendanceData?.summary?.[key] || 0;
    const calendar = attendanceData?.calendar || [];
    const monthName = attendanceData?.monthName || new Date(year, month - 1).toLocaleString('en', { month: 'long' });

    const renderCalendar = () => {
        const firstDay = new Date(year, month - 1, 1);
        const startDayOfWeek = firstDay.getDay();

        const cells = [];
        for (let i = 0; i < startDayOfWeek; i++) {
            cells.push(<DayCell key={`empty-${i}`} />);
        }

        calendar.forEach((day, idx) => {
            const date = new Date(day.date);
            const dayNumber = date.getDate();
            const dayOfWeek = date.getDay();
            const isSaturday = dayOfWeek === 6;

            let className = '';
            let statusText = '';

            if (isSaturday) className += ' saturday';
            if (day.weekend && !isSaturday) className += ' weekend';

            if (day.status) {
                className += ` ${day.status.toLowerCase().replace('_', '-')}`;
                statusText = day.status === 'SICK_LEAVE' ? 'SL' : day.status.charAt(0);
            } else if (day.weekend) {
                statusText = isSaturday ? 'SAT' : 'SUN';
            }

            cells.push(
                <DayCell
                    key={day.date}
                    className={className}
                    onClick={() => setSelectedDay(day)}
                >
                    <div className="day-number">{dayNumber}</div>
                    {statusText && <div className="day-status">{statusText}</div>}
                    {day.status && <div className="status-dot" />}
                </DayCell>
            );
        });

        return cells;
    };

    return (
        <>
            <div className="header">
                <h1>Calender</h1>
                {/* {role !== SUPER_ADMIN && <div className="header-right">
                    <button type="button" className="btn btn-outline-light" onClick={() => ""}>Back</button>
                </div>} */}
            </div>
            <div className="content-body">
                <Container>
                    {/* BLOCK 1: Header with Month/Year Controls */}
                    <HeaderBlock>
                        <MonthYearControls>
                            <NavButton onClick={() => navigateMonth(-1)}>←</NavButton>
                            <Select
                                value={month}
                                onChange={e => setMonth(parseInt(e.target.value))}
                            >
                                {[...Array(12)].map((_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {new Date(0, i).toLocaleString('en', { month: 'short' })}
                                    </option>
                                ))}
                            </Select>
                            <Input
                                type="number"
                                value={year}
                                onChange={e => setYear(parseInt(e.target.value) || year)}
                                min="2000"
                                max="2100"
                            />
                            <NavButton onClick={() => navigateMonth(1)}>→</NavButton>
                        </MonthYearControls>
                    </HeaderBlock>

                    {/* BLOCK 2: Statistics Counter Block */}
                    <CounterBlock>
                        <StatsGrid>
                            <StatCard color="#16a34a">
                                <span className="icon">✅</span>
                                <div className="number">{getCount('presentDays')}</div>
                                <div className="label">Present</div>
                            </StatCard>

                            <StatCard color="#dc2626">
                                <span className="icon">❌</span>
                                <div className="number">{getCount('absentDays')}</div>
                                <div className="label">Absent</div>
                            </StatCard>

                            <StatCard color="#d97706">
                                <span className="icon">⏰</span>
                                <div className="number">{getCount('lateDays')}</div>
                                <div className="label">Late</div>
                            </StatCard>

                            <StatCard color="#2563eb">
                                <span className="icon">🏥</span>
                                <div className="number">{getCount('sickLeaveDays')}</div>
                                <div className="label">Sick</div>
                            </StatCard>

                            <StatCard color="#6366f1">
                                <span className="icon">📅</span>
                                <div className="number">{calendar.filter(d => new Date(d.date).getDay() === 6).length}</div>
                                <div className="label">Saturday</div>
                            </StatCard>
                        </StatsGrid>
                    </CounterBlock>

                    {/* BLOCK 3: Calendar Block */}
                    <CalendarBlock>
                        <CalendarGrid>
                            <WeekHeader>
                                <div>Sun</div>
                                <div>Mon</div>
                                <div>Tue</div>
                                <div>Wed</div>
                                <div>Thu</div>
                                <div>Fri</div>
                                <div>Sat</div>
                            </WeekHeader>

                            <DaysGrid>
                                {renderCalendar()}
                            </DaysGrid>
                        </CalendarGrid>
                    </CalendarBlock>

                    {/* Modal */}
                    <Modal show={!!selectedDay} onClick={() => setSelectedDay(null)}>
                        <ModalContent onClick={e => e.stopPropagation()}>
                            <CloseBtn onClick={() => setSelectedDay(null)}>×</CloseBtn>
                            <h3>{selectedDay ? new Date(selectedDay.date).toDateString() : ''}</h3>

                            {selectedDay && (
                                <>
                                    <div className="detail">
                                        <span className="label">Status:</span>
                                        <span className="value">
                                            {selectedDay.status?.replace('_', ' ') ||
                                                (new Date(selectedDay.date).getDay() === 6 ? 'Saturday' :
                                                    selectedDay.weekend ? 'Weekend' : 'No Status')}
                                        </span>
                                    </div>

                                    {selectedDay.approvalStatus && (
                                        <div className="detail">
                                            <span className="label">Approval:</span>
                                            <span className="value">{selectedDay.approvalStatus}</span>
                                        </div>
                                    )}

                                    {selectedDay.note && (
                                        <div className="detail">
                                            <span className="label">Note:</span>
                                            <span className="value">{selectedDay.note}</span>
                                        </div>
                                    )}
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </Container>
            </div >
        </>
    );
};

export default CompactCalendarDashboard;
