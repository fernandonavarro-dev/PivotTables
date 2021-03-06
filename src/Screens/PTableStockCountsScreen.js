import React, { useEffect, useState } from 'react'
import PivotTableUI from 'react-pivottable/PivotTableUI'
import 'react-pivottable/pivottable.css'
import { useDispatch, useSelector } from 'react-redux'
import { listStockCounts, listStockevents } from '../actions/stockeventActions'

const PTableStockCounts = props => {
  const [initialState, setInitialState] = useState(props)

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const stockCountList = useSelector(state => state.stockCountList)
  const { loading, plazasStocks, error } = stockCountList

  const dispatch = useDispatch()

  const stockeventList = useSelector(state => state.stockeventList)
  const { stockevents } = stockeventList

  console.log('stock event is : ', stockevents)
  console.log('plazasStocks in PTableScreen, ', plazasStocks)

  useEffect(() => {
    if (userInfo && userInfo.user.isTop) {
      dispatch(listStockCounts())
      dispatch(listStockevents())
    }
    return () => {
      //
    }
  }, [dispatch, userInfo])

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <div className='content content-margined'>
            <h3>Pivot Table Stock Counts</h3>
          </div>
          {userInfo && userInfo.user.isTop && (
            <PivotTableUI
              data={plazasStocks.map((plaza, index) => {
                return { ...plaza, id: index }
              })}
              onChange={s => setInitialState(s)}
              {...initialState}
            />
          )}
        </>
      )}
    </div>
  )
}

export default PTableStockCounts
