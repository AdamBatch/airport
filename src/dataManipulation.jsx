import Map from './terminalMap.jsx'
import TerminalBarChart from './terminalChart.jsx'
import { useState, useEffect } from 'react'
import Description from './description.jsx'
import TerminalSpecific from './terminalSpecificChart.jsx'
import data from './data/terminalInfo7.json'

function dataManipulation() {
    
    const currentTime = '00:10:00'
    const [timeSelected, setTimeSelected] = useState(currentTime)

    const terminalInfo = data

    function replaceStringInArrayOfArrays(arr, target, replacement) {
        return arr.map(subArray => {
          return subArray.map(item => {
            if (typeof item === 'string') {
              return item.replace(target, replacement);
            }
            return item;
          });
        });
      }
    
      const noActive = replaceStringInArrayOfArrays(terminalInfo, 'active', 'free')
      const noPrepared = replaceStringInArrayOfArrays(noActive, 'prepared', 'free')
      const noOTS = replaceStringInArrayOfArrays(noPrepared, 'ots', 'occupied')
      const noDeparture = replaceStringInArrayOfArrays(noOTS, 'departure', 'occupied')
      const noDocking = replaceStringInArrayOfArrays(noDeparture, 'docking', 'occupied')
      const simpleTerminal = replaceStringInArrayOfArrays(noDocking, 'blocked', 'occupied')

      console.log(simpleTerminal[0])
    
        for (let i=0; i < 24400; i++){
            if(simpleTerminal[i][2] == 'free'){
              simpleTerminal[i][3] = 'rgb(155,155,155)'
            }
            else if(simpleTerminal[i][2] == 'occupied'){
              simpleTerminal[i][3] = 'rgb(40,75,99)'
            }
          }

    const filteredData = simpleTerminal.filter((time) => time[0] == timeSelected)
    console.log(filteredData[0])

    const colors = []
      for (let i = 0; i < filteredData.length; i++){
        colors[i] = filteredData[i][3]
      }

    console.log(colors.length)
    
    return (
        <div className = 'wrapper'>
            <div className = 'description'>
                <Description
                />
            </div>
            <div className = 'map'>
                <Map
                    colors = {colors}
                />
            </div>
            <div className = 'allTerminals'>
                <TerminalBarChart
                    setTimeSelected = {setTimeSelected}
                    simpleTerminal = {simpleTerminal}
                />
            </div>
            <div className = 'terminalSpecific'>
                <TerminalSpecific
                    simpleTerminal = {simpleTerminal}
                />
            </div>
        </div>
    );
}

export default dataManipulation;