const API_KEY = 'r7eSqXkDRjn7qI7VWTkmReizoGM';
const API_URL = 'https://ci-jshint.herokuapp.com/api';
//bootstrap5 allows to trigger modal using JS, they suppy the methods to use
// need to load your script after bootstrap Js files
const resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"));

document.getElementById("status").addEventListener("click", e => getStatus(e));
document.getElementById("submit").addEventListener("click", e => postForm(e));

async function postForm(evt){
//The FormData interface provides a way to easily construct a set of key/value pairs representing form fields and their values
   const form = new FormData(document.getElementById('checksform'))
    // for(let each of form.entries()){
    //     console.log(each)

    // }

    
  
    
}
async function getStatus(e) {

    const queryString = `${API_URL}?api_key=${API_KEY}`;

    const response = await fetch(queryString);

    const data = await response.json();

    if (response.ok) {
      responseData(data);
      console.log(data)
    }else{
        throw new Error(data.error)
    }

}

responseData= (data)=>{
    let modelTitle = document.getElementById('resultsModalTitle').innerHTML=`You API Status code ${data.status_code}`
    let modelBody = document.getElementById('results-content').innerHTML=`Your key is valid ${data.expiry}`

    resultsModal.show()
}

