import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import Icon from '@/components/Icon'
import './index.scss'
import classNames from 'classnames'
// import { billListData } from '@/contants'
import { useNavigate } from 'react-router-dom'
import { billListData } from '@/constants'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBillList } from '@/store/modules/billStore'
import dayjs from 'dayjs'

const New = () => {
  const navigate = useNavigate()
  // prepare a state for expense and income
  const [billType, setBillType] = useState('pay')
  // save bill
  // collect money amount
  const [money, setMoney] = useState(0)
  const moneyChange = (value) => {
    setMoney(value)
  }

  // collect bill type
  const [useFor, setUseFor] = useState('')
  const dispatch = useDispatch()
  const saveBill = () => {
    // save new bill data
    const data = {
      type: billType,
      money: billType === 'pay' ? -money : +money,
      date: date,
      useFor: useFor
    }
    // console.log(data)
    dispatch(addBillList(data))
  }
  // save the date we choose
  const [date, setDate] = useState()

  // control the display of time selection
  const[dateVisible, setDateVisible] = useState(false)
  const dateConfirm = (value) => {
    // console.log(value)
    setDate(value)
    setDateVisible(false)
  }
  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        Make a note
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            className={classNames(billType === 'pay' ? 'selected' : '')}
            onClick={() => setBillType('pay')}
            shape="rounded"
          >
            Expense
          </Button>
          <Button
            className={classNames(billType === 'income' ? 'selected' : '')}
            onClick={() => setBillType('income')}
            shape="rounded"
          >
            Income
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon type="calendar" className="icon" />
              <span className="text" onClick={() => setDateVisible(true)}>{dayjs(date).format('YYYY-MM-DD')}</span>
              <DatePicker
                className="kaDate"
                title="Bill Date"
                max={new Date()}
                visible={dateVisible}
                onConfirm={dateConfirm}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                value={money}
                onChange={moneyChange}
              />
              <span className="iconYuan">$</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {billListData[billType].map(item => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map(item => {
                  return (
                    <div
                      className={classNames(
                        'item',
                        useFor === item.type ? 'selected' : ''
                      )}
                      key={item.type}
                      onClick={() => setUseFor(item.type)}
                    >
                      <div className="icon">
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="btns">
        <Button 
          className="btn save"
          onClick={saveBill}
        >
          Save
        </Button>
      </div>
    </div>
  )
}

export default New