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
  const W = [1, 2, 3];

  // Create a meshgrid for the hyperplane
  const linspace = (start: number, end: number, num: number) => {
    const step = (end - start) / (num - 1);
    return Array.from({length: num}, (_, i) => start + step * i);
  };

  const x = linspace(-3, 3, 20);
  const y = linspace(-3, 3, 20);
  const [X, Y] = meshgrid(x, y);

  // Calculate Z values for the hyperplane
  const Z = X.map((row, i) => row.map((_, j) => (-W[0] * X[i][j] - W[1] * Y[i][j]) / W[2]));

  // Generate 1000 random points
  const numPoints = 1000;
  const randomPoints = Array.from({length: numPoints}, () => 
    [Math.random() * 6 - 3, Math.random() * 6 - 3, Math.random() * 6 - 3]
  );

  // Calculate the dot product of each point with W
  const dotProducts = randomPoints.map(point => 
    point[0] * W[0] + point[1] * W[1] + point[2] * W[2]
  );

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
      mode: 'lines',
      line: {color: 'red', width: 5}
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
        color: dotProducts,
        colorscale: 'RdYlBu',
        opacity: 0.8,
      }
    }
  ];

  const layout = {

    scene: {
      xaxis: {title: 'X', range: [-3, 3]},
      yaxis: {title: 'Y', range: [-3, 3]},
      zaxis: {title: 'Z', range: [-3, 3]},
      aspectmode: 'manual',
      camera: {
        eye: { x: 2, y: -2, z: 1.5 },
        center: { x: 0, y: 0, z: 0 },
        up: { x: 0, y: 0, z: 1 },
      },
    },
    aspectratio: {x: 4, y: 4, z: 4},
    showlegend: false,
    margin: {l: 0, r: 0, t: 0, b: 0, pad: -20},  // Reduce top margin
    autosize: true,
    title: {
        // center
        text: title,
        font: {
          size: 15,
          color: '#7f7f7f'
        },
        xref: 'paper',
        x: 0.5,
        y: 0.85,
      },
  };
  
  const config = {
    responsive: true,
    displayModeBar: true,
    modeBarButtonsToRemove: ['toImage', 'sendDataToCloud'],
    displaylogo: true,
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