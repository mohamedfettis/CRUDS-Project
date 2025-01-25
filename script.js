// input variable

const titleInput = document.getElementById('title');
const priceInput = document.getElementById('price');
const taxesInput = document.getElementById('taxes');
const adsInput = document.querySelector('#ads');
const discountInput = document.getElementById('discount');
const total = document.getElementById('total');
const countInput = document.getElementById('count');
const categoryInput = document.getElementById('category');
const submitButton = document.getElementById('submit');
let mood = 'create';
let temp ;
//function to calculate total
function calculateTotal() {
    if (priceInput.value !==''){
        let priceCalculated =( +priceInput.value + +taxesInput.value + +adsInput.value) - +discountInput.value;
        total.innerHTML = priceCalculated;
        total.style.backgroundColor = 'green';
    }else{
        total.innerHTML = '';
        total.style.backgroundColor = '#f00';
    }

}

//event listener onclick submit button
let dataProduct;

try {
    dataProduct = JSON.parse(localStorage.getItem('dataLocal') || '[]');
    
    if (!Array.isArray(dataProduct)) {
        throw new Error("Le format des données est invalide");
    }
} catch (error) {
    dataProduct = []; 
    console.error('Erreur de données :', error.message);
}

submitButton.onclick = function() {
    let newProduct = {  
         title : titleInput.value,
        price : priceInput.value,
        taxes : taxesInput.value,
        ads : adsInput.value,
        discount : discountInput.value,
        total : total.innerHTML,
        category : categoryInput.value,
        count : countInput.value, 
    };
    if (mood === "create"){
        if ( newProduct.count >1){
            for (let i = 0 ; i < newProduct.count; i++){
                dataProduct.push(newProduct);
                
            }
        }else{
            dataProduct.push(newProduct);
        }

    }else {
        dataProduct[temp] = newProduct;
        mood = 'create';
        submitButton.innerHTML = 'Submit';
        submitButton.style.backgroundColor = '#165c21';
        countInput.style.display = 'block';


    }
   
    
    
    localStorage.setItem('dataLocal', JSON.stringify(dataProduct));
    clearInput();
    showData ();
}

// clear input data after submit
function clearInput() {
    titleInput.value = '';
    priceInput.value = '';
    taxesInput.value = '';
    adsInput.value = '';
    discountInput.value = '';
    total.innerHTML = '';
    countInput.value = '';
    categoryInput.value = '';

}

// read 

function showData() {
    calculateTotal();
    const tableHtml = document.getElementById('t-body');
    let tableContent = ''; // Initialize an empty string to hold table rows
    let index = 0; // Index variable to track the row number

    for (let i of dataProduct) {
        tableContent += `
         <tr>
             <td>${index}</td> <!-- Afficher l'index ici -->
             <td>${i.title}</td>
             <td>${i.price}</td>
             <td>${i.taxes}</td>
             <td>${i.ads}</td>
             <td>${i.discount}</td>
             <td>${i.total}</td>
             <td>${i.category}</td>
             <td><button onclick="updateData(${index})" id="update-btn">update</button></td>
             <td><button onclick='deleteData(${index})' id="delete-btn">delete</button></td>
         </tr>
        `;
        index++;
    }
    tableHtml.innerHTML = tableContent; 
    let deleteAll = document.getElementById('delete-all');
    if (dataProduct.length >0){
        deleteAll.innerHTML =`
        <button id="delete-all-btn" onclick="deleteAllData()">Delete all (${dataProduct.length})</button>
        `
    }else{
        deleteAll.innerHTML = '';
    }
}

showData();



//delete data

function deleteData(id) {
    dataProduct.splice(id , 1);
    localStorage.dataLocal = JSON.stringify(dataProduct);
    showData();
}


// delete all data
function deleteAllData() {
    localStorage.removeItem('dataLocal');
    dataProduct = [];
    showData();
}

//update data

function updateData(id) {
    titleInput.value = dataProduct[id].title;
    priceInput.value = dataProduct[id].price;
    taxesInput.value = dataProduct[id].taxes;
    adsInput.value = dataProduct[id].ads;
    discountInput.value = dataProduct[id].discount;
    categoryInput.value = dataProduct[id].category;
    calculateTotal();
    countInput.style.display = 'none';
    submitButton.innerHTML = 'Update';
    submitButton.style.backgroundColor = 'orange';
    mood = 'update';
    temp = id;
    scroll({
        top:0,
        behavior: 'smooth'
    })
    


  
}
