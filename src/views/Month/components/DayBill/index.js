import classNames from 'classnames'
import { useMemo, useState } from 'react'
import './index.scss'
import Icon from '@/components/Icon'

const DailyBill = ({ date, billList }) => {
  const dayResult = useMemo(() => {
    // income / expense / balance
    const expense = billList.filter(item => item.type==='pay').reduce((a, c) => a + c.money, 0)
    const income = billList.filter(item => item.type==='income').reduce((a, c) => a + c.money, 0)
    return {
      expense,
      income,
      balance: expense + income
    }
  }, [billList])

  // control dropdown list
  const [ visible, setVisible ] = useState(false)
  return (
    <div className={classNames('dailyBill')}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">{date}</span>
          <span className={classNames('arrow', visible && 'expand')} onClick={() => setVisible(!visible)}></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">Expense</span>
            <span className="money">{dayResult.expense.toFixed(2)}</span>
          </div>
          <div className="income">
            <span className="type">Income</span>
            <span className="money">{dayResult.income.toFixed(2)}</span>
          </div>
          <div className="balance">
            <span className="money">{dayResult.balance.toFixed(2)}</span>
            <span className="type">Balance</span>
          </div>
        </div>
      </div>
      {/* daily data detail */}
      {/* 单日列表 */}
      <div className="billList" style={{ display: visible ? 'block' : 'none'}}>
        {billList.map(item => {
          return (
            <div className="bill" key={item.id}>
              {/* Icon */}
              <Icon type={item.useFor} />
              <div className="detail">
                <div className="billType">{item.useFor}</div>
              </div>
              <div className={classNames('money', item.type)}>
                {item.money.toFixed(2)}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default DailyBill