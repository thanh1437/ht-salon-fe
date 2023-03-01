export const convertNumber = (num) => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "G";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num;
};

export const convertRelativeTime = (time) => {
  let msPerMinute = 60 * 1000;
  let msPerHour = msPerMinute * 60;
  let msPerDay = msPerHour * 24;
  let msPerMonth = msPerDay * 30;
  let msPerYear = msPerDay * 365;

  let elapsed =
    Date.now() - (typeof time == "string" ? Date.parse(time) : time);

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + " giây";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " phút";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " giờ";
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + " ngày";
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + " tháng";
  } else {
    return Math.round(elapsed / msPerYear) + " năm";
  }
};
