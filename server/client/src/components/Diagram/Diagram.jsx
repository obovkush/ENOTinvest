import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
} from 'chart.js';

function formatDateMinusYear(date) {
  let month = String(date.getMonth() + 1);
  let day = String(date.getDate());
  const year = String(date.getFullYear() - 1); // отнимаем 1 год
  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }
  return [year, month, day].join('-');
}

ChartJS.register(LinearScale, CategoryScale, PointElement, LineElement);

// Данные для графика
const stockData = [
  {
    id: 1,
    date: '16.05',
    price: 65,
  },
  {
    id: 2,
    date: '17.05',
    price: 64,
  },
  {
    id: 3,
    date: '18.05',
    price: 63,
  },
  {
    id: 4,
    date: '19.05',
    price: 64,
  },
  {
    id: 5,
    date: '20.05',
    price: 58,
  },
];

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
  useEffect(() => {
    const today = new Date();
    const todayOneYearAgo = formatDateMinusYear(today);
    console.log(todayOneYearAgo);
    const base_URL = `https://iss.moex.com/iss/history/engines/stock/markets/shares/sessions/total/boards/TQBR/securities/SBER.json?from=${todayOneYearAgo}`;
    console.log(base_URL);
    axios.get(base_URL).then((hystory) => hystory.json());
    // .then((hystory) =>
    // if (hystory.length) {
    // dispatch({ type: 'SET_ALL_STOCKS', payload: hystory });
    // setLoading(false);
    //   console.log(hystory),
    // );
  }, []);

  const [userData, setUserData] = useState({
    labels: stockData.map((data) => data.date),
    datasets: [
      {
        data: stockData.map((data) => data.price),
      },
    ],
  });

  return (
    <>
      <div style={{ width: '100%' }}>
        <Line options={options} data={userData} />
      </div>
    </>
  );
}

export default Diagram;
