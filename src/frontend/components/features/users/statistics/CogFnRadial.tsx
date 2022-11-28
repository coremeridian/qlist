import React, { ReactNode, forwardRef } from "react";
import {
    Chart as ChartJS,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    ChartData,
    ChartOptions,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip);

interface CogFnProps {
    options: ChartOptions<"polarArea">;
    data: ChartData<"polarArea">;
    children?: ReactNode;
}

const defaultProps = {
    options: {
        scales: {
            r: {
                max: 100,
                min: 0,
                ticks: {
                    count: 4,
                    stepSize: 25,
                },
            },
        },
        animation: {
            animateRotate: false,
        },
        elements: {
            arc: {
                angle: 180,
                borderColor: "black",
            },
        },
    },
    data: {
        labels: ["Ti", "Si", "Fe", "Ne"],
        datasets: [
            {
                label: "Cognitive Function Stack",
                data: [100, 50, 25, 75],
                backgroundColor: [
                    "rgba(255, 0, 0, 0.1)",
                    "rgba(0, 255,200, 0.1)",
                    "rgba(200, 0, 200, 0.1)",
                    "rgba(0, 255, 0, 0.1)",
                ],
                borderWidth: 1,
            },
        ],
    },
};

const CogFnRadial: React.FC<CogFnProps> = forwardRef<
    HTMLDivElement,
    CogFnProps
>(({ options, data, ...rest }, ref) => {
    return (
        <div ref={ref} {...rest}>
            <PolarArea options={options} data={data} />
        </div>
    );
});

CogFnRadial.defaultProps = defaultProps;

export default CogFnRadial;
