import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

import './index.css'

const componentValues = {
  pending: 'PENDING',
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

class CowinDashboard extends Component {
  state = {vaccinationData: [], displayStatus: componentValues.initial}

  componentDidMount() {
    this.getVaccinationData()
  }

  getVaccinationData = async () => {
    this.setState({displayStatus: componentValues.pending})
    const url = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        last7DaysVaccination: data.last_7_days_vaccination,
        vaccinationByGender: data.vaccination_by_gender,
        vaccinationByAge: data.vaccination_by_age,
      }
      this.setState({
        vaccinationData: updatedData,
        displayStatus: componentValues.success,
      })
    } else {
      this.setState({displayStatus: componentValues.failure})
    }
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view"
      />
      <h1 className="failure-view-text">Something went wrong</h1>
    </div>
  )

  switchCaseCheck = () => {
    const {displayStatus} = this.state
    switch (displayStatus) {
      case componentValues.success:
        return this.renderVaccinationCharts()
      case componentValues.pending:
        return this.renderLoader()
      case componentValues.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  renderVaccinationCharts = () => {
    const {vaccinationData} = this.state
    const {
      last7DaysVaccination,
      vaccinationByGender,
      vaccinationByAge,
    } = vaccinationData
    return (
      <>
        <VaccinationCoverage vaccinationCoverage={last7DaysVaccination} />
        <VaccinationByGender vaccineByGender={vaccinationByGender} />
        <VaccinationByAge vaccinationByAge={vaccinationByAge} />
      </>
    )
  }

  render() {
    return (
      <div className="app-container">
        <div className="website-logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="website-logo"
          />
          <h1 className="logo-name">Co-WIN</h1>
        </div>
        <h1 className="website-description">CoWIN Vaccination in India</h1>
        <div>{this.switchCaseCheck()}</div>
      </div>
    )
  }
}
export default CowinDashboard
