import React from 'react'
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveLine } from '@nivo/line';
import { ResponsiveCalendar } from '@nivo/calendar';
import CounterCard from '../components/CounterCard';

export default function Dashboard() {
    // Example school analytics data for calendar chart: attendance per day
    const attendanceData = [
        { value: 450, day: "2024-06-01" }, // High attendance
        { value: 420, day: "2024-06-02" },
        { value: 430, day: "2024-06-03" },
        { value: 410, day: "2024-06-04" },
        { value: 400, day: "2024-06-05" },
        { value: 390, day: "2024-06-06" },
        { value: 380, day: "2024-06-07" }, // Lower attendance (Friday)
        { value: 0, day: "2024-06-08" },   // Weekend
        { value: 0, day: "2024-06-09" },   // Weekend
        { value: 440, day: "2024-06-10" },
        { value: 445, day: "2024-06-11" },
        { value: 430, day: "2024-06-12" },
        { value: 420, day: "2024-06-13" },
        { value: 415, day: "2024-06-14" },
        { value: 0, day: "2024-06-15" },
        { value: 0, day: "2024-06-16" },
        { value: 435, day: "2024-06-17" },
        { value: 425, day: "2024-06-18" },
        { value: 410, day: "2024-06-19" },
        { value: 400, day: "2024-06-20" },
        { value: 390, day: "2024-06-21" },
        { value: 0, day: "2024-06-22" },
        { value: 0, day: "2024-06-23" },
        { value: 420, day: "2024-06-24" },
        { value: 430, day: "2024-06-25" },
        { value: 440, day: "2024-06-26" },
        { value: 450, day: "2024-06-27" },
        { value: 420, day: "2024-06-28" },
        { value: 0, day: "2024-06-29" },
        { value: 0, day: "2024-06-30" }
    ];

    // Bar chart: Average grades per class
    const gradesBarData = [
        { class: 'Grade 1', average: 85 },
        { class: 'Grade 2', average: 88 },
        { class: 'Grade 3', average: 82 },
        { class: 'Grade 4', average: 90 },
        { class: 'Grade 5', average: 87 },
    ];

    // Pie chart: Student distribution
    const studentPieData = [
        { id: 'Boys', label: 'Boys', value: 650, color: 'hsl(205, 70%, 50%)' },
        { id: 'Girls', label: 'Girls', value: 550, color: 'hsl(340, 70%, 50%)' },
        { id: 'Teachers', label: 'Teachers', value: 75, color: 'hsl(100, 70%, 50%)' },
        { id: 'Staff', label: 'Staff', value: 30, color: 'hsl(50, 70%, 50%)' },
    ];

    // Line chart: Attendance trend over weeks
    const attendanceLineData = [
        {
            id: "Attendance",
            data: [
                { x: "Week 1", y: 420 },
                { x: "Week 2", y: 430 },
                { x: "Week 3", y: 410 },
                { x: "Week 4", y: 440 },
            ]
        }
    ];

    const createChartData = (id, values) => [{
        id,
        data: values.map((y, i) => ({ x: `Day ${i + 1}`, y })),
    }];

    return (
        <>
            <div className="header">
                <h1>School Portal Analytics</h1>
            </div>
            <div className="content-body">
                <div className='counter-wrapper'>
                    <div className="d-flex w-100">
                        <div className="flex-20 pd-r-10">
                            <CounterCard
                                className="bg-primary"
                                title="Total Students"
                                value="1,245"
                                chartData={createChartData('students', [1120, 1180, 1190, 1210, 1245])}
                            />
                        </div>
                        <div className="flex-20 pd-r-10 pd-l-10">
                            <CounterCard
                                className="bg-danger"
                                title="Attendance Rate"
                                value="92%"
                                chartData={createChartData('attendance', [88, 90, 91, 92, 92])}
                            />
                        </div>
                        <div className="flex-20 pd-r-10 pd-l-10">
                            <CounterCard
                                className="bg-warning"
                                title="Total Teachers"
                                value="55"
                                chartData={createChartData('teachers', [45, 48, 50, 52, 55])}
                            />
                        </div>
                        <div className="flex-20 pd-r-10 pd-l-10">
                            <CounterCard
                                className="bg-info"
                                title="Total Classes"
                                value="35"
                                chartData={createChartData('classes', [30, 32, 33, 34, 35])}
                            />
                        </div>
                        <div className="flex-20 pd-l-10">
                            <CounterCard
                                className="bg-success"
                                title="Fees Collected"
                                value="₹12L"
                                chartData={createChartData('fees', [8, 9, 10, 11, 12])}
                            />
                        </div>
                    </div>
                </div>
                <div className="d-flex">
                    <div className='flex-50 pd-r-20 mr-b-20'>
                        <div className="card">
                            <div className="card-header">
                                <h6>Average Grades by Class</h6>
                            </div>
                            <div className="card-body" style={{ height: 300 }}>
                                <ResponsiveBar
                                    data={gradesBarData}
                                    keys={['average']}
                                    indexBy="class"
                                    margin={{ top: 20, right: 50, bottom: 40, left: 50 }}
                                    padding={0.3}
                                    layout="vertical"
                                    colors={{ scheme: 'nivo' }}
                                    axisBottom={{ legend: 'Class', legendOffset: 34 }}
                                    axisLeft={{ legend: 'Average Grade', legendOffset: -40 }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex-50 mr-b-20'>
                        <div className="card">
                            <div className="card-header">
                                <h6>Attendance Trend (Weekly)</h6>
                            </div>
                            <div className="card-body" style={{ height: 300 }}>
                                <ResponsiveLine
                                    data={attendanceLineData}
                                    margin={{ top: 20, right: 50, bottom: 40, left: 50 }}
                                    yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
                                    axisBottom={{ legend: 'Week', legendOffset: 34 }}
                                    axisLeft={{ legend: 'Attendance', legendOffset: -40 }}
                                    pointSize={10}
                                    pointColor={{ theme: 'background' }}
                                    pointBorderWidth={2}
                                    pointBorderColor={{ from: 'seriesColor' }}
                                    enableTouchCrosshair={true}
                                    useMesh={true}
                                    legends={[
                                        {
                                            anchor: 'bottom-right',
                                            direction: 'column',
                                            translateX: 40,
                                            itemWidth: 80,
                                            itemHeight: 22,
                                            symbolShape: 'circle'
                                        }
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex-50 pd-r-20 mr-b-20'>
                        <div className="card" style={{ height: 300 }}>
                            <div className="card-header">
                                <h6>Student & Staff Distribution</h6>
                            </div>
                            <div style={{ height: 250 }}>
                                <ResponsivePie
                                    data={studentPieData}
                                    margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
                                    innerRadius={0.6}
                                    padAngle={1}
                                    cornerRadius={3}
                                    colors={{ datum: 'data.color' }}
                                    enableArcLabels={true}
                                    arcLabelsTextColor="#333333"
                                    legends={[
                                        {
                                            anchor: 'bottom',
                                            direction: 'row',
                                            justify: false,
                                            translateY: 36,
                                            itemWidth: 80,
                                            itemHeight: 18,
                                            itemsSpacing: 10,
                                            symbolSize: 18,
                                            symbolShape: 'circle',
                                        }
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex-50 mr-b-20'>
                        <div className="card" style={{ height: 300 }}>
                            <div className="card-header">
                                <h6>Attendance Calendar (June 2024)</h6>
                            </div>
                            <div style={{ height: 250 }}>
                                <ResponsiveCalendar
                                    data={attendanceData}
                                    from="2024-06-01"
                                    to="2024-06-30"
                                    emptyColor="#eeeeee"
                                    margin={{ top: 40, right: 50, bottom: 40, left: 40 }}
                                    yearSpacing={40}
                                    monthBorderColor="#ffffff"
                                    dayBorderWidth={2}
                                    dayBorderColor="#ffffff"
                                    legends={[
                                        {
                                            anchor: 'bottom-right',
                                            direction: 'row',
                                            translateY: 36,
                                            itemCount: 4,
                                            itemWidth: 42,
                                            itemHeight: 36,
                                            itemsSpacing: 14,
                                            itemDirection: 'right-to-left'
                                        }
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
