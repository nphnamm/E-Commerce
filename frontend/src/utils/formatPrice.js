const formatPrice = (price) =>{
    return parseInt(price).toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      })

}
export default formatPrice;