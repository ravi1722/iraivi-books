import ViewCart from "./ViewCart";

async function AddToCart(postid, quantity) {
    let result = '';
    await axios({
        method: "POST",
        url: route("welcome.cart"),
        data: { mode: "addcart", postid: postid, quantity: quantity },
    }).then(res => {
        result = res.data;
    }).catch((error) => {
        alert(error);
    });
    return result;
}

export default AddToCart