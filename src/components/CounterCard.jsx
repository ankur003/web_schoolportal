import React from 'react';
import { ResponsiveLine } from '@nivo/line';

const CounterCard = ({ title, value, chartData }) => {
    return (
        <div className="counter-card">
            <h4>{title}</h4>
            <h2>{value}</h2>

            <div style={{ height: '80px' }}>
                <ResponsiveLine
                    data={chartData}
                    margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                    xScale={{ type: 'point' }}
                    yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={null}
                    axisLeft={null}
                    enableGridX={false}
                    enableGridY={false}
                    enablePoints={false}
                    colors="#fff"
                    lineWidth={2}
                    useMesh={true}
                />
            </div>
        </div>
    );
};

export default CounterCard;
