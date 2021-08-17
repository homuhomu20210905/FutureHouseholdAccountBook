const TimeLine = (name, time) => {
  return {
    name,
    time,
  }
}
const items = []
items.push(new TimeLine('平日', 0))
items.push(new TimeLine('休日', 1))
items.push(new TimeLine('収入', 2))
items.push(new TimeLine('固定費', 3))
items.push(new TimeLine('集計', 4))

//const timePattern = [1, 7, 30, 180, 365]
const timePattern = []
timePattern.push(new TimeLine('1日', 1))
timePattern.push(new TimeLine('1週間', 7))
timePattern.push(new TimeLine('1ヶ月', 30))
timePattern.push(new TimeLine('半年', 182.5))
timePattern.push(new TimeLine('1年', 365))

/**
 * メニュー生成
 * @returns メニューリスト
 */
const times = () => {
  return items
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
 * 平日か休日によって日数を計算する関数
 * @param {*} tab
 * @param {*} days
 * @returns
 */
const timeCount = (tab, days) => {
  if (days <= 1) {
    return days
  }

  //週
  const week = getWeek(days)

  //平日
  if (tab == 0) {
    return 5 * week
  } else if (tab == 1) {
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

export { times, timeCount, getComma, timePattern }
