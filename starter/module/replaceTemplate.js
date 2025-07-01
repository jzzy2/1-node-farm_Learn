// this annonymouse function since we dont have a name here
module.exports = (temp, product) => {
    // ! dont use the quotes just use the regular expression!
    // -> / gamit ka niyan tas yong meaning ng g -> global indicate na lahat ng productName mapapalitan ng product.name
    // by using let we can manipulate the replace and by doing this hindi natin kailangan mag create ng new variable this is one of the best practice!
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%ID%}/g, product.id);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    if (!product.organic) {
        output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
    }

    return output;
};
