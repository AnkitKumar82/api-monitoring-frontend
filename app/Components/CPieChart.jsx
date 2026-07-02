import {
  Pie,
  PieChart,
  PieLabelRenderProps,
  PieSectorShapeProps,
  Sector,
  useActiveTooltipDataPoints,
  useIsTooltipActive,
} from 'recharts'

const RADIAN = Math.PI / 180;
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const formatValue = (value) => {
  const num = Number(value);
 
  const formatted = num.toLocaleString(undefined, {
    minimumFractionDigits: Number.isInteger(num) ? 0 : 2,
    maximumFractionDigits: Number.isInteger(num) ? 0 : 2
  })

  return formatted
}

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
  value,
}) => {
  if (
    cx == null ||
    cy == null ||
    innerRadius == null ||
    outerRadius == null
  ) {
    return null;
  }

  const radius =
    innerRadius + (outerRadius - innerRadius) * 0.6;

  const x =
    Number(cx) +
    radius * Math.cos(-(midAngle || 0) * RADIAN);

  const y =
    Number(cy) +
    radius * Math.sin(-(midAngle || 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill='black'
      textAnchor={x > Number(cx) ? 'start' : 'end'}
      dominantBaseline='central'
      fontSize={10}
    >
      <tspan x={x} dy='-0.6em'>
        {name}
      </tspan>
      <tspan x={x} dy='1.2em'>
        {formatValue(value)}
      </tspan>
      <tspan x={x} dy='1.2em'>
        {((percent || 0) * 100).toFixed(1)}%
      </tspan>
    </text>
  )
}

const MyCustomPie = (props) => {
  const p = useActiveTooltipDataPoints();
  const isAnyPieActive = useIsTooltipActive();
  const isThisPieActive = isAnyPieActive && props.payload === p?.[0];
  let fillOpacity;
  if (isAnyPieActive && !isThisPieActive) {
    fillOpacity = 0.5;
  } else {
    fillOpacity = 1;
  }
  return (
    <Sector
      {...props}
      fill={COLORS[props.index % COLORS.length]}
      fillOpacity={fillOpacity}
      style={{ transition: 'fill-opacity 0.3s ease' }}
    />
  );
};

export default function PieChartWithCustomizedLabel({ isAnimationActive = true, data = [] }) {
  return (
    <PieChart
      style={{ width: '100%', aspectRatio: 1 }}
      margin={{
        top: 8,
        right: 12,
        bottom: 8,
        left: 12
      }}
      responsive
    >
      <Pie
        data={data}
        labelLine={false}
        label={renderCustomizedLabel}
        fill='#8884d8'
        dataKey='value'
        isAnimationActive={isAnimationActive}
        shape={MyCustomPie}
      />
    </PieChart>
  )
}