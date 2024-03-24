const moment = require('moment-timezone');

function utcTimeChange(timeStamp, fromTz, toTz) {
  const newDate = (moment.tz(timeStamp, fromTz)).tz(toTz).format('YYYY-MM-DD LT');
  return newDate;
};

function textOrder(orderArr) {
  let orderText = '';
  for (let item of orderArr) {
    orderText += `${item.itemQuantity} x ${item.itemName} : $${item.totalCostOfItems}\n`;
  }
  return orderText;
}

module.exports = { utcTimeChange, textOrder };
