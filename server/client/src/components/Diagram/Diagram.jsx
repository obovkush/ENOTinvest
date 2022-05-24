import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useSelector } from 'react-redux';

ChartJS.register(
  LinearScale,
  CategoryScale,
  PointElement,
  Title,
  Legend,
  Tooltip,
  LineElement,
);

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
  maintainAspectRatio: true, // сохраняет пропорции на мобильных устройствах
  interaction: {
    mode: 'index',
    intersect: false,
  },
  stacked: false,
  plugins: {
    decimation: {
      algorithm: 'lttb',
    },
    title: {
      display: false,
      text: 'Chart.js Line Chart - Multi Axis',
    },
    legend: {
      labels: {
        usePointStyle: true,
      },
      display: false,
    },
    zoom: {
      zoom: {
        wheel: {
          enabled: true,
        },
        pinch: {
          enabled: true,
        },
        mode: 'xy',
      },
    },
  },
  elements: {
    point: {
      radius: 1,
    },
  },
  // animations: {
  //   tension: {
  //     duration: 10000,
  //     easing: 'easeInElastic',
  //     from: 1,
  //     to: 0,
  //     loop: true,
  //   },
  // },
  scales: {
    y: {
      type: 'linear',
      display: true,
      position: 'left',
    },
  },
  tooltips: {
    displayColors: false,
    titleFontSize: 16,
    bodyFontSize: 14,
    xPadding: 10,
    yPadding: 10,
    callbacks: {
      label: (tooltipItem, data) => {
        return `$ ${tooltipItem.value}`;
      },
    },
  },
  backgroundColor: [
    'rgba(75,192,192,1)',
    '#ecf0f1',
    '#50AF95',
    '#f3ba2f',
    '#2a71d0',
  ],
  borderColor: '#50AF95', //'rgba(75,192,192,1)',
  borderWidth: 2,
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
