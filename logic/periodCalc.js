import Times from './Times'
const { CycleStatus } = Times

const objGet = (key, objFixedCost, objIncome) => {
  let result = 0
  const fix = objFixedCost.result[key]
  const inc = objIncome.result[key]
  let names = []
  if (fix) {
    result += fix.money || 0
    names = names.concat(fix.names)
  }
  if (inc) {
    result += inc.money || 0
    names = names.concat(inc.names)
  }
  names = names.filter(item => item.length != 0)
  return { result, names }
}

/**
* 集計
*/
const calc = (day, pDate, objFixedCost, objIncome) => {
  const date = pDate.format('YYYY/MM/DD')
  let result = 0
  // 週単位
  const weekly = () => {
    const key = CycleStatus.Week.day + '-' + day
    return objGet(key, objFixedCost, objIncome)
  }
  // 月単位
  const month = (status) => {
    const firstMonth = pDate.startOf('month').format('YYYY/MM/DD')
    const endMonth = pDate.endOf('month').format('YYYY/MM/DD')
    let data = null
    // 月初,月末を取得
    if (date == firstMonth) {
      data = 1
    } else if (date == endMonth) {
      data = 2
    }
    // 月初かつ隔月の場合
    if (CycleStatus.TwoMonth.day == status.day && data == 1) {
      const m = +pDate.format('M')
      data = m % 2
    }
    const key = status.day + '-' + data
    return objGet(key, objFixedCost, objIncome)
  }
  // 半年
  const halfYear = () => {
    let result = 0
    let names = []
    if (
      halfYears.filter((item) => {
        return item == date
      }).length != 0
    ) {
      const key = CycleStatus.HalfYear.day + '-' + 1
      const obj = objGet(key, objFixedCost, objIncome)
      result = obj.result
      names = obj.names
    }
    return { result, names }
  }

  // １年
  const year = () => {
    let result = 0
    let names = []
    if (
      years.filter((item) => {
        return item == date
      }).length != 0
    ) {
      const key = CycleStatus.Year.day + '-' + 1
      const obj = objGet(key, objFixedCost, objIncome)
      result = obj.result
      names = obj.names
    }
    return { result, names }
  }

  // 結果取得
  const list = [weekly(),
    month(CycleStatus.Month),
    month(CycleStatus.TwoMonth),
    halfYear(),
    year()]

  const names = list.map(item => {
    return item.names.filter(val => { return val && val.length > 0 }).join(',')
  }).filter(item => { return item != '' }).join(',')

  // 合計金額
  result = list.reduce((prev, cur) => {
    return cur.result + prev
  }, 0)

  return { result, names }
}

export default {
  total () {

  }
}
