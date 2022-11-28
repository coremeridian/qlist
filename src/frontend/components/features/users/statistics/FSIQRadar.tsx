import React, { ReactNode, forwardRef } from "react";
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    ChartData,
    ChartOptions,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

interface FSIQRadarProps {
    options: ChartOptions<"radar">;
    data: ChartData<"radar">;
    children?: ReactNode;
}

const defaultProps = {
    data: {
        labels: ["FSIQ", "VIQ", "GAI", "PIQ", "WM", "CPI", "PS"],
        datasets: [
            {
                label: "Full-Scale IQ",
                data: [145, 150, 160, 140, 130, 134, 120],
                backgroundColor: "rgba(34, 197, 94, 0.2)",
                borderColor: "rgba(34, 197, 94, 1)",
                borderWidth: 1,
            },
        ],
    },
};

const FSIQRadar: React.FC<FSIQRadarProps> = forwardRef<
    HTMLDivElement,
    FSIQRadarProps
>(({ options, data, ...rest }, ref) => {
    return (
        <div ref={ref} {...rest}>
            <Radar options={options} data={data} />
        </div>
    );
});

FSIQRadar.defaultProps = defaultProps;

export default FSIQRadar;
