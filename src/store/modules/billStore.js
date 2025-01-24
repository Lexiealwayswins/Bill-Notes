// Bill related store

import { createSlice } from "@reduxjs/toolkit"
import axios from 'axios'

const billStore = createSlice({
  name: 'bill',
  // state
  initialState: {
    billList: []
  },
  reducers: {
    // methods of updating data
    setBillList (state, action) {
      state.billList = action.payload
    },
    addBill (state, action) {
      state.billList.push(action.payload)
    }
  }
})

// deconstruction actionCreater functions
const { setBillList, addBill } = billStore.actions

// asynchronous methods
const getBillList = () => {
  return async (dispatch) => {
    // asynchronous request
    const res = await axios.get('http://localhost:8888/ka')
    // revoke synchronous reducer
    dispatch(setBillList(res.data))
  }
}

const addBillList = (data) => {
  return async(dispatch) => {
    const res = await axios.post('http://localhost:8888/ka', data)
    dispatch(addBill(res.data))
  }
}

export { getBillList, addBillList }

// 导出reducer
const reducer = billStore.reducer

export default reducer