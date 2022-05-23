import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
} from 'chart.js';
import { useSelector } from 'react-redux';

ChartJS.register(LinearScale, CategoryScale, PointElement, LineElement);

//Данные для графика
// const stockData = [
//   {
//     id: 1,
//     date: '16.05',
//     price: 65,
//   },
//   {
//     id: 2,
//     date: '17.05',
//     price: 64,
//   },
//   {
//     id: 3,
//     date: '18.05',
//     price: 63,
//   },
//   {
//     id: 4,
//     date: '19.05',
//     price: 64,
//   },
//   {
//     id: 5,
//     date: '20.05',
//     price: 58,
//   },
// ];

// Параметры для графика
const options = {
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: false,
      text: 'Chart.js Line Chart - Multi Axis',
    },
    legend: {
      display: false,
    },
  },
  animations: {
    tension: {
      duration: 10000,
      easing: 'linear',
      from: 1,
      to: 0,
      loop: true,
    },
  },
  scales: {
    y: {
      type: 'linear',
      display: true,
      position: 'left',
    },
  },
  backgroundColor: [
    'rgba(75,192,192,1)',
    '#ecf0f1',
    '#50AF95',
    '#f3ba2f',
    '#2a71d0',
  ],
  borderColor: 'black',
  borderWidth: 1,
};

function Diagram() {
  const stockData = useSelector((store) => store.history);
  console.log('==========> history', stockData);
  const userData = {
    labels: stockData.map((data) => data.date),
    datasets: [
      {
        data: stockData.map((data) => data.price),
      },
    ],
  };

  return (
    <>
      <div style={{ width: '100%' }}>
        <Line options={options} data={userData} />
      </div>
    </>
  );
}

export default Diagram;
