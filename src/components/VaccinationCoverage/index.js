import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'

import './index.css'
// Do not use responsive container as per description to both pie chart and bar chart in this case, provide width and height in pie/bar charts itself
const VaccinationCoverage = props => {
  const {vaccinationCoverage} = props
  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }
  return (
    <div className="vaccination-coverage-card">
      <h1 className="coverage-card-heading">Vaccination Coverage</h1>
      <BarChart
        width={1000}
        height={500}
        data={vaccinationCoverage}
        margin={{
          top: 20,
        }}
      >
        <XAxis
          dataKey="vaccine_date"
          tick={{
            stroke: 'gray',
            strokeWidth: 1,
          }}
        />
        <YAxis
          tickFormatter={DataFormatter}
          tick={{
            stroke: 'gray',
            strokeWidth: 1,
          }}
        />
        <Legend
          wrapperStyle={{
            padding: 30,
          }}
        />
        <Bar dataKey="dose_1" name="Dose 1" fill="#5a8dee" barSize="20%" />
        <Bar dataKey="dose_2" name="Dose 2" fill="#f54394" barSize="20%" />
      </BarChart>
    </div>
  )
}

export default VaccinationCoverage
