'use client'
import React from 'react'
import styles from '@/styles/About.module.css'
import ApexChart from 'react-apexcharts'

interface EducationTimelineProps {
  dataList: {
    x: string
    y: number[]
  }[]
}

export default function EducationTimeline({
  dataList,
}: EducationTimelineProps) {
  const series = [
    {
      data: dataList,
    },
  ]

  const options = {
    colors: ['#F3331B', '#CAA4CC', '#262D52'],
    fill: {
      opacity: 1,
    },
    chart: {
      width: '100%',
      fontFamily: 'Halyard Display, Helvetica, Arial, sans-serif',
      foreColor: 'lightgray',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 1000,
        },
      },
      selection: {
        enabled: false,
      },
      zoom: {
        enabled: false,
      },
      zoomin: {
        enabled: false,
      },
      zoomout: {
        enabled: false,
      },
      pan: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        barHeight: 32,
        horizontal: true,
        borderRadius: 14,
        endingShape: 'rounded',
        distributed: true,
        dataLabels: {
          hideOverflowingLabels: false,
          position: 'bottom',
        },
      },
    },
    dataLabels: {
      enabled: true,
      textAnchor: 'start',
      offsetX: -56,
      offsetY: 36,
      style: {
        colors: ['#111'],
        fontSize: 16,
        fontWeight: 400,
      },
      formatter: function (val: any, opts: any) {
        const label = opts.w.globals.labels[opts.dataPointIndex]

        const startDate = new Date(val[0]).toISOString()
        const endDate = new Date(val[1]).toISOString()
        const period =
          `${startDate.slice(0, 4)}.${startDate.slice(5, 7)}` +
          ' - ' +
          `${endDate.slice(0, 4)}.${endDate.slice(5, 7)}`

        return [label, period]
      },
    },
    xaxis: {
      type: 'datetime',
      min: new Date('2013-01-01').getTime(),
      max: new Date().getTime(),
      position: 'top',
      labels: {
        format: 'yyyy',
        style: {
          fontSize: 16,
          fontWeight: 400,
        },
      },
      axisTicks: {
        show: true,
        borderType: 'solid',
        color: 'lightgray',
        height: 2,
      },
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    grid: {
      padding: {
        left: 10,
        right: 40,
      },
      show: true,
      borderColor: 'lightgray',
      strokeDashArray: 5,
      position: 'back',
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    tooltip: {
      enabled: false,
    },
    states: {
      hover: {
        filter: {
          type: 'darken',
          value: 0.9,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
        },
      },
    },
  }

  return (
    <div className={styles['education-timeline-wrapper']}>
      <ApexChart
        options={options as any}
        series={series}
        type="rangeBar"
        height={series[0].data.length * 200}
      />
    </div>
  )
}
