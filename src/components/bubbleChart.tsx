"use client";

import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import React, { useEffect } from "react";
import { Bubble } from "react-chartjs-2";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Bubble {
  x: number;
  y: number;
  r: number;
  label: string;
}

const BubbleChart = () => {
  useEffect(() => {
    // Define the plugin to change the background color
    Chart.register({
      id: "backgroundFill",
      beforeDraw: (chart) => {
        const ctx = chart.ctx;
        const { left, top, bottom, width, height } = chart.chartArea;

        const regions = [
          {
            xStart: 0,
            xEnd: width / 2,
            yStart: 0,
            yEnd: height / 2,
            color: "rgba(229, 255, 0, 0.2)",
          }, // First region
          {
            xStart: width / 2,
            xEnd: width,
            yStart: 0,
            yEnd: height / 2,
            color: "rgba(0, 255, 0, 0.2)",
          }, // Second region
          {
            xStart: 0,
            xEnd: width / 2,
            yStart: height / 2,
            yEnd: height,
            color: "rgba(255, 0, 0, 0.2)",
          }, // Third region
          {
            xStart: width / 2,
            xEnd: width,
            yStart: height / 2,
            yEnd: height,
            color: "rgba(0, 247, 255, 0.2)",
          }, // Forth region
          {
            xStart: 0,
            xEnd: width / 5,
            yStart: height,
            yEnd: height - height / 5,
            color: "#cf2923",
          }, // Forth region
          {
            xStart: width - width / 5,
            xEnd: width,
            yStart: 0,
            yEnd: height / 5,
            color: "#119c46",
          }, // F
        ];

        ctx.save();

        // Loop through the regions and fill each one with the specified color
        regions.forEach((region) => {
          const { xStart, xEnd, yStart, yEnd, color } = region;

          ctx.fillStyle = color;

          // Clip the region and fill it with the specified color
          ctx.beginPath();
          ctx.rect(left + xStart, top + yStart, xEnd - xStart, yEnd - yStart);
          ctx.closePath();
          ctx.fill();
        });

        ctx.restore();
      },
      afterDraw: (chart) => {
        const { ctx, data } = chart;
        const { datasets } = data;
        const { top, left, right, width, height } = chart.chartArea;

        const quadrant1Label = "DESENVOLVER";
        const quadrant2Label = "RETER";
        const quadrant3Label = "RECUPERAR";
        const quadrant4Label = "MOTIVAR";

        ctx.save();
        ctx.textAlign = "end";
        ctx.textBaseline = "top";
        ctx.fillStyle = "#181818"; // Change the font color
        ctx.font = "bold 14px Arial"; // Change the font size and font weight

        // Quadrant 1
        ctx.fillText(quadrant1Label, left + 120, top + 20);

        // Quadrant 2
        ctx.fillText(quadrant2Label, width / 2 + 110, top + 20);

        // Quadrant 3
        ctx.fillText(quadrant3Label, left + 110, height / 2 + 60);

        // Quadrant 4
        ctx.fillText(quadrant4Label, width / 2 + 120, height / 2 + 60);

        ctx.fillStyle = "#FFFFFF"; // Change the font colo

        ctx.font = "bold 12px Arial"; // Change the font size and font weight

        ctx.fillText("DECIDIR", left + 70, height * 0.9);
        ctx.fillText("DESAFIAR", width - 15, top + 20);

        ctx.restore();
      },
      afterLayout: (chart) => {
        const { top, bottom, left, right } = chart.chartArea;

        // Expand the chart area to include the negative part of the Cartesian plane
        chart.chartArea.top = Math.max(top, 0);
        chart.chartArea.bottom = Math.min(bottom, 0);
        chart.chartArea.left = Math.max(left, 0);
        chart.chartArea.right = Math.min(right, 0);

        chart.update(); // Update the chart after modifying the chart area
      },

      afterRender: (chart) => {
        const { ctx, data } = chart;
        const { datasets } = data;

        datasets.forEach((dataset) => {
          const { data: bubbleData } = dataset;
          bubbleData.forEach((bubble: any) => {
            const { x, y, r, label } = bubble;

            const xPosition = chart.scales.x.getPixelForValue(x);
            const yPosition = chart.scales.y.getPixelForValue(y);

            // Adjust the font settings as needed
            ctx.font = `bold ${r / 2}px Arial`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#3073ca"; // Change the font color

            // Adjust the label offset as needed
            const labelOffsetX = 0;
            const labelOffsetY = 0;

            ctx.fillText(
              label,
              xPosition + labelOffsetX,
              yPosition + labelOffsetY
            );
          });
        });
      },
    });
  }, []);

  const data = {
    datasets: [
      {
        label: "Matriz de Análise de Pessoas",
        data: [
          { x: 5, y: 5.5, r: 20, label: "1" },
          { x: 8, y: 1, r: 30, label: "2" },
          { x: 5, y: 8, r: 25, label: "3" },
          { x: 3, y: 8, r: 40, label: "4" },
        ],
        backgroundColor: "#f0ecec",
        borderColor: "#3073ca",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        min: 0, // Set the minimum value of the x-axis
        max: 10, // Set the maximum value of the x-axis
        beginAtZero: false, // Ensure the axis does not start at zero
      },
      y: {
        min: 0, // Set the minimum value of the y-axis
        max: 10, // Set the maximum value of the y-axis
        beginAtZero: false, // Ensure the axis does not start at zero
      },
    },

    layout: {
      padding() {
        return 16;
      },
    },
  };

  return (
    <Bubble
      width={800}
      height={800}
      style={{ maxWidth: "800px", maxHeight: "800px" }}
      data={data}
      options={options}
    />
  );
};

export default BubbleChart;
