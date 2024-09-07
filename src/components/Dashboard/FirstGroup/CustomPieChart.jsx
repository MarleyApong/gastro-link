import React from 'react'
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts'

// Exemple de données
const data = [
  { name: 'Organisations', value: 12 },
  { name: 'Entreprises', value: 35 },
  { name: 'Enquêtes', value: 20 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28']

const CustomPieChart = () => (
  <PieChart width={300}
  height={300}>
    <Pie
      data={data}
      cx="50%"
      cy="50%"
      labelLine={false}
      fill="#8884d8"
      dataKey="value"
    >
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip />
    <Legend />
  </PieChart>
)

export default CustomPieChart
