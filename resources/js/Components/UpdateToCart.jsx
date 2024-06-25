async function UpdateToCart(postid, quantity) {
    let result = '';
    await axios({
        method: "POST",
        url: route("welcome.cart"),
        data: { mode: "updatecart", postid: postid, quantity: quantity },
    }).then(res => {
        result = res.data;
    }).catch((error) => {
        alert(error);
    });
    return result;
}
export default UpdateToCart