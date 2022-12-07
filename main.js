function saveToLocalStorage(event){
    event.preventDefault();
    const amount = event.target.amountId.value;
    const description = event.target.descriptionId.value;
    const cat = event.target.catId.value;
    const obj = {
      amount,
      cat,
      description
    }

    axios.post("https://crudcrud.com/api/307bdd5e99dd4ef2890d99f3b297828c/expenseTracker", obj)
    .then((response) => {
        showNewExpenseOnScreen(response.data);  //show on screen
    })
    .catch((err) =>{
      document.body.innerHTML = document.body.innerHTML + "<h4>Something went wrong</h4>";
      console.log(err);
    })
    
};

window.addEventListener("DOMContentLoaded", () =>{
axios.get("https://crudcrud.com/api/307bdd5e99dd4ef2890d99f3b297828c/expenseTracker")
    .then((response) =>{
        for(var i=0; i < response.data.length; i++ ){
            showNewExpenseOnScreen(response.data[i])
        }
    })
    .catch((err) =>{
        console.log(err)
    })
})
  
//show all expense details
function showNewExpenseOnScreen(expense){
    // clear field after submiting
    document.getElementById('catId').value = '';
    document.getElementById('amountId').value = '';
    document.getElementById('descriptionId').value ='';
   

    const parentNode = document.getElementById('listOfExpenses');
    const childHtML = `<li id = ${expense._id}> ${expense.amount} - ${expense.cat} - ${expense.description} 
                        <button onclick = editExpenseDetails('${expense.amount}','${expense.cat}','${expense.description}','${expense._id}')> Edit Expense </button>
                        <button onclick = deletExpense('${expense._id}')> Delete Expense </button>
                    </li>`
    
    parentNode.innerHTML = parentNode.innerHTML+childHtML;

}  
    
  
//DELETE EXPENSE FROM LOCAL STORAGE
function deletExpense(expenseId){
    axios.delete(`https://crudcrud.com/api/307bdd5e99dd4ef2890d99f3b297828c/expenseTracker/${expenseId}`)
    .then((response) =>{
        removeExpenseFromScreen(expenseId)
    })
    .catch((err) =>{
        console.log(err)
    })
}
  
//DELETE EXPENSE FROM SCREEN
function removeExpenseFromScreen(expenseId){
    const parentNode = document.getElementById('listOfExpenses');
    const childNodeToBeDeleted = document.getElementById(expenseId);
    parentNode.removeChild(childNodeToBeDeleted);
}
  
  //EDIT EXPENSE
  function editExpenseDetails(amount,cat,description,expenseId){
    document.getElementById('catId').value = cat;
    document.getElementById('amountId').value = amount;
    document.getElementById('descriptionId').value = description ;

    deletExpense(expenseId);
  }