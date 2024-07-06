/* eslint-disable prettier/prettier */
//@ts-nocheck
import React from 'react';
import dynamic from 'next/dynamic';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface HyperplaneChartProps {
  width?: string;
  height?: string;
  title?: string;
}

const HyperplaneChart: React.FC<HyperplaneChartProps> = ({ 
    width = "100%", 
    height = "600px",
    title = "Hyperplane Visualization"
  }) => {
    // Define the weight vector W
    const W = [1, 2, 2];
  
    // Define X1 as the feature vector
    const X1 = [1, 1, 1]; // This is now our feature vector
  
    // Calculate the dot product for the hyperplane equation
    const dotProduct = W.reduce((sum, wi, i) => sum + wi * X1[i], 0);
  
    // Create a meshgrid for the hyperplane
    const linspace = (start: number, end: number, num: number) => {
      const step = (end - start) / (num - 1);
      return Array.from({length: num}, (_, i) => start + step * i);
    };
  
    const x = linspace(-4, 4, 20);
    const y = linspace(-4, 4, 20);
    const [X, Y] = meshgrid(x, y);
  
    // Calculate Z values for the hyperplane
    const Z = X.map((row, i) => row.map((_, j) => {
      return (dotProduct - W[0] * X[i][j] - W[1] * Y[i][j]) / W[2];
    }));
  
    // Generate 1000 random points in range -4 to 4
    const numPoints = 1000;
    const randomPoints = Array.from({length: numPoints}, () => 
      [Math.random() * 8 - 4, Math.random() * 8 - 4, Math.random() * 8 - 4]
    );
  
    // Calculate the position of each point relative to the hyperplane
    const pointPositions = randomPoints.map(point => {
      const pointDotProduct = point[0] * W[0] + point[1] * W[1] + point[2] * W[2];
      return pointDotProduct - dotProduct;
    });
  
    // Normalize the point positions for coloring
    const maxDistance = Math.max(...pointPositions.map(Math.abs));
    const normalizedPositions = pointPositions.map(pos => pos / maxDistance);
  
    // Define X2 as another vector on the hyperplane
    const X2 = [2, -1, 2.5];

    // Calculate X1 - X2
    const X1minusX2 = [-1, 2, 1];

    const data = [
      // Hyperplane
      {
        type: 'surface',
        x: X,
        y: Y,
        z: Z,
        opacity: 0.3,
        colorscale: 'Viridis',
        showscale: false
      },
      // Weight vector
      {
        type: 'scatter3d',
        x: [0, W[0]],
        y: [0, W[1]],
        z: [0, W[2]],
        mode: 'lines+markers',
        line: {color: 'red', width: 5},
        marker: {size: 4, color: 'red'},
        name: 'Weight Vector'
      },
      // Feature vector (X1)
      {
        type: 'scatter3d',
        x: [0, X1[0]],
        y: [0, X1[1]],
        z: [0, X1[2]],
        mode: 'lines+markers',
        line: {color: 'green', width: 5},
        marker: {size: 4, color: 'green'},
        name: 'Feature Vector (X1)'
      },
      // X2 vector
      {
        type: 'scatter3d',
        x: [0, X2[0]],
        y: [0, X2[1]],
        z: [0, X2[2]],
        mode: 'lines+markers',
        line: {color: 'blue', width: 5},
        marker: {size: 4, color: 'blue'},
        name: 'X2'
      },
      // X1 - X2 vector
      {
        type: 'scatter3d',
        x: [X1[0], X2[0]],
      y: [X1[1], X2[1]],
      z: [X1[2], X2[2]],
        mode: 'lines+markers',
        line: {color: 'purple', width: 5},
        marker: {size: 4, color: 'purple'},
        name: 'X1 - X2'
      },
      // Random points
      {
        type: 'scatter3d',
        x: randomPoints.map(p => p[0]),
        y: randomPoints.map(p => p[1]),
        z: randomPoints.map(p => p[2]),
        mode: 'markers',
        marker: {
          size: 3,
          color: normalizedPositions,
          colorscale: [
            [0, '#ffffff'],    // Dark purple (Viridis start)
          [0.25, '#440154'], // Blue
          [0.45, '#3b528b'], // Teal
          [0.5, '#21908c'],  // White at the center
          [0.55, '#5dc963'], // Light green
          [0.75, '#fde725'], // Yellow
          [1, '#fde725']     // Yellow (Viridis end)
          ],
          opacity: 0.8,
          showscale: false
        },
        name: 'Data Points'
      }
    ];
    const layout = {
      scene: {
        xaxis: {title: 'X', range: [-4, 4]},
        yaxis: {title: 'Y', range: [-4, 4]},
        zaxis: {title: 'Z', range: [-4, 4]},
        aspectmode: 'manual',
        camera: {
          eye: { x: 2, y: -2, z: 1.5 },
          center: { x: 0, y: 0, z: 0 },
          up: { x: 0, y: 0, z: 1 },
        },
      },
      aspectratio: {x: 4, y: 4, z: 4},
      showlegend: true,
      legend: {x: 0.7, y: 0.9},
      margin: {l: 0, r: 0, t: 30, b: 0, pad: -20},
      autosize: true,
      title: {
        text: title,
        font: {
          size: 15,
          color: '#7f7f7f'
        },
        xref: 'paper',
        x: 0.5,
        y: 0.95,
      },
    };
    
  
    
    
    const config = {
      responsive: true,
      displayModeBar: true,
      modeBarButtonsToRemove: ['toImage', 'sendDataToCloud'],
      displaylogo: false,
      scrollZoom: true,
    };
  
  return (
    <div style={{width, height, position: 'relative'}}>
      <Plot
        data={data}
        layout={layout}
        config={config}
        style={{
          width: "100%", 
          height: "100%",
          
          top: 0,
          left: 0,
        }}
        useResizeHandler={true}
      />
    </div>
  );
};

// Helper function to create meshgrid
function meshgrid(x: number[], y: number[]): [number[][], number[][]] {
  const X = x.map(xi => y.map(() => xi));
  const Y = x.map(() => y.slice());
  return [X, Y];
}

export default HyperplaneChart;