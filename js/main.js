// variabels decleration 
var ProductName = document.getElementById("p-name");
var ProductPrice = document.getElementById("p-price");
var ProductCategory = document.getElementById("p-category");
var ProductStatus = document.getElementById("p-status");
var ProductDesc = document.getElementById("p-desc");
var mainBtn = document.getElementById("mainbtn");
var ProductContainer;
// function to cheak local storage empty or not
if (localStorage.getItem("ProductList") == null) {
    ProductContainer = [];
} else {
    ProductContainer = JSON.parse(localStorage.getItem("ProductList"));
    dispalyProducts();
}
// Add product function
function AddProducts() {
    if (cheakInputs() == true) {
        var Product = {
            name: ProductName.value,
            price: ProductPrice.value,
            category: ProductCategory.value,
            status: ProductStatus.value,
            desc: ProductDesc.value
        };
        ProductContainer.push(Product);
        localStorage.setItem("ProductList", JSON.stringify(ProductContainer));
        dispalyProducts();
        clr();
    } else {
        window.alert("please enter the hole inputs")
    }

}
// clear function on form
function clr() {
    ProductName.value = "";
    ProductPrice.value = "";
    ProductCategory.value = "";
    ProductStatus.value = "Active";
    ProductDesc.value = "";
}
// Display function to make items appear after add it on website
function dispalyProducts() {
    var box = ``;
    for (var i = 0; i < ProductContainer.length; i++) {
        box += `
        <tr>
        <td>${i+1}</td>
        <td>${ProductContainer[i].name}</td>
        <td>${ProductContainer[i].price}</td>
        <td>${ProductContainer[i].category}</td>
        <td>${ProductContainer[i].status}</td>
        <td><button onclick="UpdateProduct(` + i + `)" class="btn btn-outline-warning">Update</button></td>
        <td><button onclick="deleteProduct(` + i + `)" class="btn btn-outline-danger">Delete</button></td>
        </tr>`;
    }
    document.getElementById("tableBody").innerHTML = box;
}
// cheak method
function cheakInputs() {
    if (ProductName.value != "" && ProductPrice.value != "" && ProductCategory.value != "" && ProductStatus.value != "" && ProductDesc.value != "") {
        return true;
    } else {
        return false;
    }
}
// search by name method
function searchProduct(searchTerm) {
    var box = ``;
    for (var i = 0; i < ProductContainer.length; i++) {
        if (ProductContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase()) == true) {
            box += `
            <tr>
            <td>${i+1}</td>
            <td>${ProductContainer[i].name}</td>
            <td>${ProductContainer[i].price}</td>
            <td>${ProductContainer[i].category}</td>
            <td>${ProductContainer[i].status}</td>
            <td><button class="btn btn-outline-warning">Update</button></td>
            <td><button class="btn btn-outline-danger">Delete</button></td>
            </tr>`;
        }
    }
    document.getElementById("tableBody").innerHTML = box;
}
// delete method
function deleteProduct(ProductIndex) {

    ProductContainer.splice(ProductIndex, 1);
    localStorage.setItem("ProductList", JSON.stringify(ProductContainer));
    dispalyProducts();
}
// updateProduct function
function UpdateProduct(ProductIndex) {
    ProductName.value  =ProductContainer[ProductIndex].name;
    ProductPrice.value =ProductContainer[ProductIndex].price;
    ProductCategory.value =ProductContainer[ProductIndex].category;
    ProductStatus.value =ProductContainer[ProductIndex].status;
    ProductDesc.value  =ProductContainer[ProductIndex].desc;
    mainBtn.innerHTML="Update";
    deleteProduct();
    dispalyProducts();
}