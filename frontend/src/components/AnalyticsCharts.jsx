import { useEffect, useRef } from 'react';
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip
} from 'chart.js';
import { gsap } from 'gsap';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function AnalyticsCharts({ analytics }) {
  const sectionRef = useRef(null);
  const labels = ['Productive', 'Neutral', 'Distracting'];
  const values = [analytics.productive, analytics.neutral, analytics.distracting];
  const colors = ['#8CA9FF', '#AAC4F5', '#FFF2C6'];

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.fromTo(
        '[data-chart-panel]',
        {
          opacity: 0,
          y: 24,
          scale: 0.98
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out'
        }
      );
    }, sectionRef);

    return () => context.revert();
  }, [analytics]);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Minutes',
        data: values,
        backgroundColor: colors,
        borderColor: '#ffffff',
        hoverBackgroundColor: ['#7e9dff', '#98b8ff', '#ffeeb3'],
        borderWidth: 2,
        borderRadius: 10,
        maxBarThickness: 48
      }
    ]
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          color: '#4b5563',
          padding: 18,
          font: {
            family: 'Manrope',
            size: 12,
            weight: '600'
          }
        }
      }
    },
    animation: {
      duration: 900,
      easing: 'easeOutQuart'
    }
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.92)',
        titleColor: '#1f2937',
        bodyColor: '#374151',
        borderColor: 'rgba(140, 169, 255, 0.3)',
        borderWidth: 1,
        padding: 12,
        titleFont: {
          family: 'Manrope',
          weight: '700'
        },
        bodyFont: {
          family: 'Manrope'
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#64748b',
          font: {
            family: 'Manrope',
            weight: '600'
          }
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(140, 169, 255, 0.16)'
        },
        ticks: {
          precision: 0,
          color: '#64748b',
          font: {
            family: 'Manrope'
          }
        }
      }
    },
    animation: {
      duration: 900,
      easing: 'easeOutQuart'
    }
  };

  return (
    <div ref={sectionRef} className="grid gap-6 xl:grid-cols-2">
      <div
        data-chart-panel
        className="app-panel-strong relative overflow-hidden p-5 sm:p-6"
      >
        <div className="absolute right-5 top-5 h-20 w-20 rounded-full bg-[#AAC4F5]/30 blur-xl" />
        <h3 className="relative mb-2 text-2xl text-slate-900">Category Split</h3>
        <p className="relative mb-5 text-sm text-slate-600">
          A quick read on how your attention is distributed across intent types.
        </p>
        <div className="h-72 sm:h-80">
          <Pie data={chartData} options={pieOptions} />
        </div>
      </div>

      <div
        data-chart-panel
        className="app-panel-strong relative overflow-hidden p-5 sm:p-6"
      >
        <div className="absolute bottom-4 left-5 h-16 w-16 rounded-[1.5rem] bg-[#FFF2C6]/60 blur-lg" />
        <h3 className="relative mb-2 text-2xl text-slate-900">Minutes by Category</h3>
        <p className="relative mb-5 text-sm text-slate-600">
          Compare total time spent across productive, neutral, and distracting activity.
        </p>
        <div className="h-72 sm:h-80">
          <Bar data={chartData} options={barOptions} />
        </div>
      </div>
    </div>
  );
}

export default AnalyticsCharts;
