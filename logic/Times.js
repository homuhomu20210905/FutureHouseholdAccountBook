/**
 * カンマ付与
 * @param {*} num
 * @returns
 */
const getComma = (num) => {
  return String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
}

const PayStatus = {
  Spending: 0 /** 支出 */,
  Income: 1 /** 収入 */,
}
/**
 * 周期ステータス
 */
const CycleStatus = {
  One: { day: 1, value: 1, start: 1 },
  Week: { day: 7, value: 2, start: 1 },
  Month: { day: 30, value: 3, start: 1 },
  TwoMonth: { day: 60, value: 7, start: 1 },
  HalfYear: { day: 182.5, value: 4, start: 1 },
  Year: { day: 365, value: 5, start: 1 },
  Any: { day: 0, value: 6, start: 0 },
  Other: { day: 0, value: 9, start: 0 },
  find (key, value) {
    const list = [
      this.Week,
      this.Month,
      this.TwoMonth,
      this.HalfYear,
      this.Year,
      this.Any,
      this.Other,
    ].filter((obj) => {
      return obj[key] == value
    })
    return list
  },
}

/**
 * 明細用項目
 * @param {*} name   名称
 * @param {*} day    日数
 * @param {*} cycle  周期
 * @param {*} status ステータス(支出/収入)
 *  @returns
 */
const TimeLine = (name, cycle, money, status) => {
  // 有効フラグ
  const day = cycle.day
  return {
    name,
    day,
    cycle,
    money,
    iconSelect: 0,
    status: status != PayStatus.Income ? PayStatus.Spending : PayStatus.Income,
    oneDayMoney: function () {
      const money = this.pay()
      if (this.day <= 1 || !this.day) {
        return money
      }
      return money / this.day
    },
    abs: function () {
      return Math.abs(this.oneDayMoney())
    },
    pay: function () {
      // 無効の場合は0円を返す
      if (!this.validFlag) {
        return 0
      }
      return PayStatus.Income == this.status ? this.money * -1 : +this.money
    },
    validFlag: true
  }
}
// const timePattern = [1, 7, 30, 180, 365]
const timePattern = []
timePattern.push(TimeLine('1日', CycleStatus.One))
timePattern.push(TimeLine('1週間', CycleStatus.Week))
timePattern.push(TimeLine('1ヶ月', CycleStatus.Month))
timePattern.push(TimeLine('2ヶ月', CycleStatus.TwoMonth))
timePattern.push(TimeLine('半年', CycleStatus.HalfYear))
timePattern.push(TimeLine('1年', CycleStatus.Year))

/**
 * タブ情報
 * @param {*} param0
 */
const TabInfo = (name, value, cycle) => {
  return { name, value, cycle }
}

/**
 *タブステータスパターン
 */
const TabStatus = {
  Work: 'Work',
  Holiday: 'Holiday',
  Income: 'Income',
  FixedCost: 'FixedCost',
  All: 'All',
  Calendar: 'Calendar',
}

/**
 * メニュー生成
 * @returns メニューリスト
 */
const createTabMenu = () => {
  const tabInfos = []
  tabInfos.push(TabInfo('平日', TabStatus.Work, CycleStatus.One))
  tabInfos.push(TabInfo('休日', TabStatus.Holiday, CycleStatus.One))
  tabInfos.push(TabInfo('収入', TabStatus.Income, CycleStatus.Any))
  tabInfos.push(TabInfo('固定費', TabStatus.FixedCost, CycleStatus.Any))
  tabInfos.push(TabInfo('集計', TabStatus.All, CycleStatus.Any))
  tabInfos.push(
    TabInfo('カレンダー', TabStatus.Calendar, CycleStatus.Other)
  )
  return tabInfos
}
/**
 * 日数を元に週数を取得
 * @param {*}} time
 * @returns
 */
const getWeek = (time) => {
  return time / 7
}

/**
 * 平日か休日によって週数を計算し対応日数を算出する
 * @param {*} status
 * @param {*} days
 * @returns
 */
const timeCount = (status, days) => {
  if (days <= 1) {
    return days
  }

  // 週
  const week = getWeek(days)

  // 平日
  if (status == TabStatus.Work) {
    return 5 * week
  } else if (status == TabStatus.Holiday) {
    // 休日
    return 2 * week
  }
  // それ以外
  return days
}

export default {
  CycleStatus,
  createTabMenu,
  timeCount,
  getComma,
  timePattern,
  TimeLine,
  TabStatus,
  PayStatus,
}
