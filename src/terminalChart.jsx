import React from 'react'
import ReactEcharts from 'echarts-for-react'
import Papa from 'papaparse' 
import { useState, useEffect, useMemo } from 'react';
import data from './data/terminalInfo7.json'


function terminalBarChart({setTimeSelected, simpleTerminal}) {

  const timeAxis = function (params) {
    setTimeSelected(params[0].data[0])
  }
  
  const [option, setOption] = useState ({
    visualMap: {
      type: 'piecewise',
      top: 'center',
      right: '10',
      orient: 'vertical',
      dimension: 2,
      categories:['occupied', 'free'],
      inRange: {
        color:['rgb(40,75,99)' , 'rgb(155,155,155) ']
      },
      align: 'left'
    },
    grid: {
        left: '5%',
        right: '15%',
        bottom: '12%',
        containLabel: true
    },
    title: {
        text: 'Gate Status',
        left: 'center',
        top: 20,
        color: 'black',
        nameTextStyle:{
          color:'black'
        }
    },
    tooltip: {
      trigger: "axis",
      formatter: timeAxis
      // formatter: function(params) {
      //   console.log(params[0].data[0])
      //     return (
      //         'CoO: ' + params[0].data + '%' +
      //         '<br />ZnO: ' + params[1].data + '%' +
      //         '<br />NiO: ' + params[0].data + '%'
      //     );
      //   }
    },
    xAxis: {
        name: 'Time',
        nameLocation: 'center',
        nameGap: 30,
        type: 'category',
        nameTextStyle: {
            fontWeight: 'bold',
            fontSize: 18,
            padding:[0,0,0,60],
            color: 'black'
        },
        // axisTick: {
        //     alignWithLabel:'true',
        //     interval: 0
        // },
        // axisLabel: {
        //     interval: 1
        // },
        
    },
    yAxis: {
        name: 'Gates',
        nameLocation: 'center',
        nameGap: 10,
        type:'category',
        // max: 100,
        nameTextStyle: {
            fontWeight: 'bold',
            fontSize: 18,
            color: 'black'
        },
        axisTick: {
            show:false
        },
        axisLabel: {
          show: false

        }
    },
    series: [
        {
          type: 'scatter',
          data: simpleTerminal,
          encode:{
            x:0,
            y:1
          },
          symbol: 'rect',
          symbolSize: [5,2],

      
      }
    ]
  })
  
  const Chart = useMemo(() => {
    if (!option) {
        return;
    }

    return (
        <ReactEcharts
            option={option}
            style={{ width: '100%', height: '100%' }}
        />
    );
  }, [option]);

  return (
      <>{Chart}</>
  );
  
  

}

export default terminalBarChart