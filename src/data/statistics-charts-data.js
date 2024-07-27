import { chartsConfig } from "@/configs";
// import ApexCharts from 'apexcharts';

const websiteViewsChart = {
  type: "bar",
  height: 220,
  series: [
    {
      name: "Views",
      data: [50, 20, 10, 22, 50, 10, 40],
    },
  ],
  options: {
    ...chartsConfig,
    colors: "#388e3c",
    plotOptions: {
      bar: {
        columnWidth: "16%",
        borderRadius: 5,
      },
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: ["M", "T", "W", "T", "F", "S", "S"],
    },
  },
};

const dailySalesChart = {
  type: 'donut',
  series: [500, 200, 350], // Ubah series sesuai dengan data yang sesuai untuk grafik donut
  options: {
    maintainAspectRatio: false,
    chart: {
      height: 3000, // Ubah tinggi sesuai kebutuhan Anda di sini
    },
    colors: ['#0288d1', '#388e3c', '#f57c00'], // Ubah warna sesuai dengan kebutuhan
    labels: ['XL', 'Indosat', 'Telkomsel'], // Ubah label sesuai dengan kebutuhan
  },
};

const completedTasksChart = {
  type: 'donut',
  height: 220,
  series: [50, 20],
  options: {
    maintainAspectRatio: false,
    colors: ['#388e3c', '#ff5722'],
    labels: [
      'Regular',
      'Non Regular',
    ],
  },
};

export const statisticsChartsData = [
  {
    color: "white",
    title: "Penjualan",
    description: "Penjualan",
    footer: "campaign sent 2 days ago",
    chart: websiteViewsChart,
  },
  {
    color: "white",
    title: "Provider",
    description: "Provider",
    footer: "updated 4 min ago",
    chart: dailySalesChart,
  },
  {
    color: "white",
    title: "Produk Terlaris",
    description: "Produk Terlaris",
    footer: "just updated",
    chart: completedTasksChart,
  },
];

export default statisticsChartsData;
