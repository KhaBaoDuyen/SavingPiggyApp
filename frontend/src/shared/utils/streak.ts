export const calculateStreak = (history: any[]) => {

  const savedDates = new Set(
    history.map(item =>
      new Date(item.createdAt).toISOString().slice(0,10)
    )
  )

  const today = new Date()
  let current = new Date(today)

  let streak = 0
  let ice = 3

  const startMonth = today.getMonth()
  const startYear = today.getFullYear()

  while (true) {

    const key = current.toISOString().slice(0,10)

    const sameMonth =
      current.getMonth() === startMonth &&
      current.getFullYear() === startYear

    if (savedDates.has(key)) {

      streak++

    } else {

      if (sameMonth) {

        if (ice > 0) {
          ice--
        } else {
          streak = 0
          break
        }

      } else {
        break
      }

    }

    current.setDate(current.getDate() - 1)

  }

  return { streak, ice }

}