// src/components/CategoryChart.js

import React, { forwardRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

// Register the pieces Pie needs
ChartJS.register(ArcElement, Tooltip, Legend, Title);

// A small, pleasant default palette (cycled if categories exceed length)
const DEFAULT_COLORS = [
  '#2E8B57', // SeaGreen
  '#4CAF50', // Green
  '#8BC34A', // Light Green
  '#CDDC39', // Lime
  '#FFC107', // Amber
  '#FF9800', // Orange
  '#FF7043', // Deep Orange
  '#29B6F6', // Light Blue
  '#26A69A', // Teal
  '#9575CD', // Purple
];

const CategoryChart = forwardRef(function CategoryChart(
  {
    title = 'Waste by category',
    dataByCategory = {},
    colors = {},
    showLegend = true,
    legendPosition = 'bottom',
    height = 260,
    className = '',
  },
  ref
) {
  const labels = useMemo(() => Object.keys(dataByCategory || {}), [dataByCategory]);

  const chartData = useMemo(() => {
    const values = labels.map((k) => Number(dataByCategory?.[k] ?? 0));
    const bg = labels.map((label, i) => colors?.[label] || DEFAULT_COLORS[i % DEFAULT_COLORS.length]);

    return {
      labels,
      datasets: [
        {
          label: 'Total',
          data: values,
          backgroundColor: bg,
          borderColor: '#ffffff',
          borderWidth: 2,
          hoverOffset: 6,
        },
      ],
    };
  }, [labels, dataByCategory, colors]);

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: showLegend,
          position: legendPosition, // 'top' | 'left' | 'bottom' | 'right'
          labels: {
            boxWidth: 14,
            boxHeight: 14,
            usePointStyle: true,
            pointStyle: 'circle',
          },
        },
        title: {
          display: Boolean(title),
          text: title,
          font: { size: 16, weight: '600' },
          padding: { top: 6, bottom: 12 },
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.label ?? '';
              const value = Number(context.parsed ?? 0);
              const total = context.dataset.data.reduce((acc, v) => acc + Number(v || 0), 0);
              const pct = total ? ((value / total) * 100).toFixed(1) : '0.0';
              return `${label}: ${value} (${pct}%)`;
            },
          },
        },
      },
    }),
    [legendPosition, showLegend, title]
  );

  if (!labels.length) {
    return (
      <div
        className={className}
        style={{
          height,
          display: 'grid',
          placeItems: 'center',
          color: '#6b7280',
          background: '#f9fafb',
          borderRadius: 8,
        }}
      >
        No category data yet
      </div>
    );
  }

  return (
    <div className={className} style={{ height, position: 'relative' }}>
      <Pie ref={ref} data={chartData} options={options} />
    </div>
  );
});

CategoryChart.propTypes = {
  title: PropTypes.string,
  dataByCategory: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ),
  colors: PropTypes.objectOf(PropTypes.string),
  showLegend: PropTypes.bool,
  legendPosition: PropTypes.oneOf(['top', 'left', 'bottom', 'right']),
  height: PropTypes.number,
  className: PropTypes.string,
};

export default CategoryChart;
