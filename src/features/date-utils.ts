export function padTo2Digits(number: number) {
  return number.toString().padStart(2, "0");
}

export function formatEventDate(startDate: Date, endDate: Date) {
  const startDay = padTo2Digits(startDate.getDate());
  const startMonth = padTo2Digits(startDate.getMonth() + 1);
  const startYear = startDate.getFullYear();

  const endDay = padTo2Digits(endDate.getDate());
  const endMonth = padTo2Digits(endDate.getMonth() + 1);
  const endYear = endDate.getFullYear();

  if (startYear === endYear) {
    if (startMonth === endMonth) {
      if (startDay === endDay) {
        // Мероприятие проходит в один день
        return `${startDay}.${startMonth}.${startYear}`;
      } else {
        // Мероприятие проходит в несколько дней в пределах одного месяца
        return `${startDay}-${endDay}.${startMonth}.${startYear}`;
      }
    } else {
      // Мероприятие проходит в несколько дней в разных месяцах одного года
      return `${startDay}.${startMonth}-${endDay}.${endMonth}.${startYear}`;
    }
  } else {
    // Мероприятие проходит в несколько дней в разных годах
    return `${startDay}.${startMonth}.${startYear}-${endDay}.${endMonth}.${endYear}`;
  }
}
