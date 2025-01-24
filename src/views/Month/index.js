import { useState, useMemo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { NavBar, DatePicker } from 'antd-mobile'
import enUS from 'antd-mobile/es/locales/en-US';
import './index.scss'
import classNames from 'classnames'
import dayjs from 'dayjs'
import _ from 'lodash'
import DailyBill from './components/DayBill'

const Month = () => {
  // monthly data on groups
  const billList = useSelector(state => state.bill.billList)

  const monthGroup = useMemo(() => {
    // return data after computing
    return _.groupBy(billList, (item) => dayjs(item.date).format('YYYY-MM'))
  }, [billList])

  const [dateVisible, setDateVisible] = useState(false)

  // control time display
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs(new Date()).format('YYYY-MM')
  })

  const [ currentMonthList, setMonthList ] = useState([])

  const monthResult = useMemo(() => {
    // income / expense / balance
    const expense = currentMonthList.filter(item => item.type==='pay').reduce((a, c) => a + c.money, 0)
    const income = currentMonthList.filter(item => item.type==='income').reduce((a, c) => a + c.money, 0)
    return {
      expense,
      income,
      balance: expense + income
    }
  }, [currentMonthList])

  // show current monthly data when initialazation
  useEffect(() => {
    const nowDate = dayjs().format('YYYY-MM')
    // Boundary value
    if (monthGroup[nowDate]) {
      setMonthList(monthGroup[nowDate])
    }
  }, [monthGroup])

  const onConfirm = (date) => {
    setDateVisible(false)
    // console.log(date)
    const formatDate = dayjs(date).format('YYYY-MM')
    setMonthList(monthGroup[formatDate])
    setCurrentDate(formatDate)
  }

  // current month data group by day
  const dayGroup = useMemo(() => {
    // return data after computing
    const groupData = _.groupBy(currentMonthList, (item) => dayjs(item.date).format('YYYY-MM-DD'))
    const keys = Object.keys(groupData)
    return {
      groupData,
      keys
    }
  }, [currentMonthList])

  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        Monthly Bill
      </NavBar>
      <div className="content">
        <div className="header">
          {/* switch months */}
          <div className="date" onClick={() => setDateVisible(true)}>
            <span className="text">
              { currentDate + '' }
            </span>
            {/* Control whether the expand class name exists */}
            <span className={classNames('arrow', dateVisible && 'expand')}></span>
          </div>
          {/* data area */}
          <div className='twoLineOverview'>
            <div className="item">
              <span className="money">{ monthResult.expense.toFixed(2) }</span>
              <span className="type">Expense</span>
            </div>
            <div className="item">
              <span className="money">{ monthResult.income.toFixed(2) }</span>
              <span className="type">Income</span>
            </div>
            <div className="item">
              <span className="money">{ monthResult.balance.toFixed(2) }</span>
              <span className="type">Balance</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            locale={enUS}
            className="kaDate"
            title="Bill Date"
            precision="month"
            visible={dateVisible}
            max={new Date()}
            onConfirm={onConfirm} 
            onCancel={() => setDateVisible(false)}
            onClose={() => setDateVisible(false)}
          />
        </div>
        {/* daily data area */}
        {
          dayGroup.keys.map(key => {
            return <DailyBill key={key} date={key} billList={dayGroup.groupData[key]} />
          })
        }
      </div>
    </div >
  )
}

export default Month