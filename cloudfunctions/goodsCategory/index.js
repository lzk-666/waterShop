// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database();
  const $ = db.command.aggregate;
  return db.collection('goods').where({
    category:event.category
  }).field({
    sell_number:true,
    sell_price:true,
    title:true,
    img_url:true,
    category:true
  }).get()
}