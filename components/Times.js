/**
 * 明細用項目
 * @param {*} name   名称
 * @param {*} day    日数
 * @param {*} cycle  周期
 * @param {*} status ステータス(支出/収入)
 *  @returns
 */
const TimeLine = (name, day, cycle, money, status) => {
  return {
    name,
    day,
    cycle,
    money,
    status: status != 1 ? 0 : status,
  }
}

//const timePattern = [1, 7, 30, 180, 365]
const timePattern = []
timePattern.push(new TimeLine('1日', 1))
timePattern.push(new TimeLine('1週間', 7))
timePattern.push(new TimeLine('1ヶ月', 30))
timePattern.push(new TimeLine('半年', 182.5))
timePattern.push(new TimeLine('1年', 365))

/**
 * タブ情報
 * @param {*} param0
 */
const TabInfo = (name, value, status) => {
  return { name, value, status }
}

/**
 *タブステータスパターン
 */
const TabStatus = {
  Work: 0,
  Holiday: 1,
  Income: 2,
  FixedCost: 3,
  All: 4,
}

/**
 * メニュー生成
 * @returns メニューリスト
 */
const createTabMenu = () => {
  const tabInfos = []
  tabInfos.push(new TabInfo('平日', TabStatus.Work))
  tabInfos.push(new TabInfo('休日', TabStatus.Holiday))
  tabInfos.push(new TabInfo('収入', TabStatus.Income))
  tabInfos.push(new TabInfo('固定費', TabStatus.FixedCost))
  tabInfos.push(new TabInfo('集計', TabStatus.All))
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

  //週
  const week = getWeek(days)

  //平日
  if (status == TabStatus.Work) {
    return 5 * week
  } else if (status == TabStatus.Holiday) {
    //休日
    return 2 * week
  }
  //それ以外
  return days
}

/**
 * カンマ付与
 * @param {*} num
 * @returns
 */
const getComma = (num) => {
  return String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
}

export { createTabMenu, timeCount, getComma, timePattern, TimeLine, TabStatus }
