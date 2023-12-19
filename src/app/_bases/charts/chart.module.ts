import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsModule } from 'ng2-charts';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { NgxGaugeModule } from 'ngx-gauge';

import { PieChartComponent } from './pie-chart.compoment';
import { LineChartComponent } from './line-chart.compoment';
import { BarChartComponent } from './bar/bar-chart.compoment';
import { HorizontalBarChartComponent } from './bar/horizontalbar-chart.compoment';
import { GaugeChartComponent } from './gauge/gauge-chart.compoment';
import { NumberChartComponent } from './number/number-chart.compoment';
import { HMChartComponent } from './hm-chart.component';

@NgModule({
  imports: [
    CommonModule,
    ChartsModule,
    NgOptionHighlightModule,
    NgxGaugeModule
  ],
  declarations: [
    PieChartComponent, LineChartComponent, BarChartComponent, HorizontalBarChartComponent, 
    HMChartComponent, GaugeChartComponent, NumberChartComponent
  ],
  exports: [ 
    PieChartComponent, LineChartComponent, BarChartComponent, HorizontalBarChartComponent, 
    HMChartComponent, GaugeChartComponent, NumberChartComponent
  ]
})
export class HMChartdModule { }
