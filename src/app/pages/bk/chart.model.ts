// Angular libraries
import { Component, Injector, Input, OnChanges, OnInit } from '@angular/core';

import { ChartConfiguration, ChartDataSets } from 'chart.js';

/**
 * @license hearme 
 * @copyright 2017-2020 https://hearme.vn 
 * @author Thuc VX <thuc@hearme.vn>
 * @date 17 Dec 2022
 * @purpose Base chart model - for chart data processing
 */

/**
 * Purpose: Base chart model for processing data
*/
class BaseChartModel {
  static chart_types = {
    "BAR_CHART": "bar",
    "LINE_CHART": "line",
    "PIE_CHART": "pie",
    "HORIZONTAL_BARCHART": "horizontalBar"    
  }
  static CHART_COLORS = ['#3366CC', '#06b110', '#FF6A68', '#FF9900', '#990099', '#3B3EAC', '#0099C6', '#DD4477', '#66AA00', '#B82E2E', '#316395', '#994499', '#22AA99', '#AAAA11', '#6633CC', '#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC'];

  static default_chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      xAxes: [{
        gridLines: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: function(value: any, index) {
            return index % 2 === 0 ? value : '';
          }
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          // userCallback: function(label, index, labels) {
          //   // when the floored value is the same as the value we have a whole number
          //   if (Math.floor(label) === label) {
          //     return label;
          //   }
          // },
        }
      }]
    },
    legend: {
      display: true,
      align: 'end',
      labels: {
        boxWidth: 20
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'left',
      },
      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    }
  };

  containerStyle = '';
  chartDatasets: ChartDataSets[] = [];             // Contain data for each data set, name, and color
  chartLabels: Array<any> = [];               // Label for x axis
  options: ChartConfiguration['options'];    // Chart options
  chartType: string;                   // Chart type
  chartPlugins;

  sourceData: any;

  constructor(type, style=null, data=null, labels=null, options=null,  plugins=null) {
    if (style)  this.containerStyle = style;
    if (data) this.sourceData = data;

    if (labels) this.chartLabels = labels;
    if (options)
      this.options = options;
    else
      this.options = BaseChartModel.default_chartOptions;

    this.chartType = type;
    if (plugins)  this.chartPlugins = plugins;
  }

  getContainerStyle() {
    return this.containerStyle;
  }

  getDatasets() {
    return this.chartDatasets;
  }

  /**
   * processing data from API to feed into chart model
  */
  processChartData() {
    this.chartDatasets = this.sourceData;
  };

}

export { BaseChartModel };
