export const pieChartOptions = {
  plugins: {
    legend: {
      labels: {
        fontColor: 'black',
      },
      position: 'bottom',
      onClick: null,
    },
  },
};
export const barChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  aspectRatio: 0.5,
  plugins: {
    legend: {
      labels: {
        fontColor: 'black',
      },
      position: 'bottom',
      onClick: null,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
};
