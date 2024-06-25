
async function ViewCart() {
    
    let result = '';
    await axios({
        method: "POST",
        url: route("welcome.cart"),
        data: { mode: "viewcart" },
    }).then(res => {
        result = res.data;
    }).catch((error) => {
        alert(error);
    });
    return result;
}

export default ViewCart