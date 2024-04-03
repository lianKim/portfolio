'use client'
import React, { useEffect, useMemo, useState } from 'react'
import styles from '@/styles/About.module.css'
import ApexChart from 'react-apexcharts'
import { getPeriodOfWork } from '@/lib/utils/handleString'

interface TimelineChartProps {
  dataList: {
    x: string
    y: number[]
  }[]
}

export default React.memo(function TimelineChart({
  dataList,
}: TimelineChartProps) {
  const [isPC, setIsPC] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    setIsPC(window.innerWidth > 1023)
  }, [])

  const series = [
    {
      data: dataList,
    },
  ]

  const options = useMemo(
    () => ({
      colors: [
        'var(--color-purple)',
        'var(--color-light-gray)',
        'var(--color-medium-gray)',
        'var(--color-gray)',
      ],
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
          horizontal: true,
          barHeight: 32,
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
        offsetY: 28,
        style: {
          colors: ['var(--color-black)'],
          fontSize: 16,
          fontWeight: 400,
        },
        formatter: function (val: any, { dataPointIndex, w }: any) {
          // period
          const startDate = new Date(val[0]).toISOString()
          const endDate = new Date(val[1]).toISOString()
          const period = getPeriodOfWork(startDate, endDate)
          // label
          const [label, note] = w.globals.labels[dataPointIndex].split('|')

          return isPC ? [period, label + ' / ' + note] : [period, label]
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
        enabled: !isPC,
        custom: function ({ dataPointIndex, w }: any) {
          const [, note] = w.globals.labels[dataPointIndex].split('|')

          return note
        },
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
    }),
    [isPC],
  )

  return (
    <div className={styles['timeline-chart-wrapper']}>
      <ApexChart
        options={options as any}
        series={series}
        type="rangeBar"
        height={series[0].data.length * 112}
      />
    </div>
  )
})
