import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';

import { IHourlyExchange } from '@/shared/types/hourly-exchange';

interface LineChartProps {
  data: IHourlyExchange[];
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 720;
    const height = 450;
    const margin = { top: 20, right: 40, bottom: 50, left: 40 }; // увеличил нижний отступ

    svg
      .attr('viewBox', `0 0 ${width} ${height}`)
      .style('background', 'transparent')
      .style('overflow', 'hidden')
      .style('width', '100%')
      .style('height', '100%');

    const x = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => new Date(d.time * 1000)) as [Date, Date])
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.volume)!])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const line = d3
      .line<IHourlyExchange>()
      .x((d) => x(new Date(d.time * 1000))!)
      .y((d) => y(d.volume)!)
      .curve(d3.curveMonotoneX); // изменено на d3.curveMonotoneX

    svg.selectAll('*').remove();

    const xAxis = svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(width / 80)
          .tickFormat((d) => d3.timeFormat('%d.%m.%Y %H:%M:%S')(d as Date))
          .tickSizeOuter(0),
      );

    xAxis
      .selectAll('text')
      .attr('transform', 'rotate(20)')
      .style('text-anchor', 'start')
      .attr('x', 9)
      .attr('y', 0);

    svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', line);
  }, [data]);

  return (
    <div className="w-full h-full">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default LineChart;
