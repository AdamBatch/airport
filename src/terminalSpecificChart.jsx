import React from 'react'
import ReactEcharts from 'echarts-for-react'
import Papa from 'papaparse' 
import { useState, useEffect } from 'react';
import info from './data/terminalInfo7.json'

function terminalSpecificChart({simpleTerminal}) {
    
    for (let i=0; i < simpleTerminal.length; i++){
        if(simpleTerminal[i][2] == 'free'){
          simpleTerminal[i][4] = 0
        }
        else if(simpleTerminal[i][2] == 'occupied'){
          simpleTerminal[i][4] = 1
        }
      }


    console.log(simpleTerminal[0])

    const terminalAData = simpleTerminal.filter((terminal) => terminal[1].charAt(0) == 'A')
    const terminalBData = simpleTerminal.filter((terminal) => terminal[1].charAt(0) == 'B')
    const terminalCData = simpleTerminal.filter((terminal) => terminal[1].charAt(0) == 'C')
    const terminalDData = simpleTerminal.filter((terminal) => terminal[1].charAt(0) == 'D')
    const terminalEData = simpleTerminal.filter((terminal) => terminal[1].charAt(0) == 'E')
    
    console.log(terminalAData[0])
    const totalAGates = terminalAData.filter((terminal) => terminal[0] == '00:00:00').length
    const totalBGates = terminalBData.filter((terminal) => terminal[0] == '00:00:00').length
    const totalCGates = terminalCData.filter((terminal) => terminal[0] == '00:00:00').length
    const totalDGates = terminalDData.filter((terminal) => terminal[0] == '00:00:00').length
    const totalEGates = terminalEData.filter((terminal) => terminal[0] == '00:00:00').length

    console.log(totalAGates)
    console.log(totalBGates)
    console.log(totalCGates)
    console.log(totalDGates)
    console.log(totalEGates)

    
    function sumValuesByTime(arr, total) {
        const result = {};
      
        arr.forEach(item => {
          const time = item[0]
          const value = item[4]
      
          result[time] = (result[time] || 0) + value/total*100;
        });
      
        return result;
    }
      
      
    const percentOccupiedAObject = sumValuesByTime(terminalAData, totalAGates);
    const percentOccupiedBObject = sumValuesByTime(terminalBData, totalBGates);
    const percentOccupiedCObject = sumValuesByTime(terminalCData, totalCGates);
    const percentOccupiedDObject = sumValuesByTime(terminalDData, totalDGates);
    const percentOccupiedEObject = sumValuesByTime(terminalEData, totalEGates);
    
    // console.log(percentOccupiedAObject);

    const percentOccupiedAArray = Object.entries(percentOccupiedAObject)
    const percentOccupiedBArray = Object.entries(percentOccupiedBObject)
    const percentOccupiedCArray = Object.entries(percentOccupiedCObject)
    const percentOccupiedDArray = Object.entries(percentOccupiedDObject)
    const percentOccupiedEArray = Object.entries(percentOccupiedEObject)

    // console.log(percentOccupiedAArray)

    const colors = ['rgb(20,60,60)', 'rgb(50,90,90)', 'rgb(80,120,120)', 'rgb(110,150,150)', 'rgb(140,180,180)']

    const option = {
      color: colors,
      legend: {
        // Try 'horizontal'
        data:['Terminal A', 'Terminal B', 'Terminal C', 'Terminal D', 'Terminal E'],
        orient: 'vertical',
        right: 10,
        top: 'center',
        icon: 'roundRect',
        itemWidth: 20,
      },
      grid: {
          left: '5%',
          right: '15%',
          bottom: '12%',
          containLabel: true
      },
      title: {
          text: 'Gate Utilization',
          left: 'center',
          top: 10,
          textStyle:{
            color:'black'
          }
      },

      xAxis: {
          name: 'Time',
          nameLocation: 'center',
          nameGap:30,
          type: 'category',
          nameTextStyle: {
            fontWeight: 'bold',
            fontSize: 18,
            color:'black',
            padding:[0,0,0,30]
        },
          
      },
      yAxis: {
        name: 'Gates Occupied',
        nameLocation: 'center',
        nameGap: 45,
        type:'value',
        nameTextStyle: {
          fontWeight: 'bold',
          fontSize: 18,
          color:'black',
        },
        axisLabel:{
          formatter: '{value}%'
        }  
      },
      colorBy: colors,
      series: [
          { 
            name: 'Terminal A',
            type: 'line',
            data: percentOccupiedAArray,
            encode:{
                x:0,
                y:1
            },
            showSymbol: false, 
        },
        {
            name: 'Terminal B',
            type: 'line',
            data: percentOccupiedBArray,
            encode:{
                x:0,
                y:1
            },
            showSymbol: false,
        },
        {
            name:'Terminal C',
            type: 'line',
            data: percentOccupiedCArray,
            encode:{
                x:0,
                y:1
            },
            showSymbol: false,
        },
        {
            name: 'Terminal D',
            type: 'line',
            data: percentOccupiedDArray,
            encode:{
                x:0,
                y:1
            },
            showSymbol: false,
        },
        {
            name: 'Terminal E',
            type: 'line',
            data: percentOccupiedEArray,
            encode:{
                x:0,
                y:1
            },
            showSymbol: false,
        },
      ],
      
    }
    
    return(
      <ReactEcharts 
          option={option}
          style={{ width: '100%', height: '100%' }}
      />
    )
  
  }
  
  export default terminalSpecificChart