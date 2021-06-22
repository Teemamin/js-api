const API_KEY = 'r7eSqXkDRjn7qI7VWTkmReizoGM';
const API_URL = 'https://ci-jshint.herokuapp.com/api';
//bootstrap5 allows to trigger modal using JS, they suppy the methods to use
// need to load your script after bootstrap Js files
const resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"));

document.getElementById("status").addEventListener("click", e => getStatus(e));
document.getElementById("submit").addEventListener("click", e => postForm(e));

function processOptions(form){
    let optns = []
    for(entry of form.entries()){
        if(entry[0]==='options'){
            optns.push(entry[1])
        }
    }
    form.delete('options')
    form.append('options', optns.join())
    return form
}

async function postForm(evt){
 const form =  processOptions(new FormData(document.getElementById("checksform")));
//  for(entry of form.entries()){
//      console.log(entry)
//  }
 const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Authorization": API_KEY,
        },
        body: form,
    });
    const data = await response.json();

    if (response.ok) {
      displayErrors(data);
    }else{
        throw new Error(data.error)
    }
}

function displayErrors(data) {

    let results = "";

    let heading = `JSHint Results for ${data.file}`;
    if (data.total_errors === 0) {
        results = `<div class="no_errors">No errors reported!</div>`;
    } else {
        results = `<div>Total Errors: <span class="error_count">${data.total_errors}</span></div>`;
        for (let error of data.error_list) {
            results += `<div>At line <span class="line">${error.line}</span>, `;
            results += `column <span class="column">${error.col}:</span></div>`;
            results += `<div class="error">${error.error}</div>`;
        }
    }

    document.getElementById("resultsModalTitle").innerText = heading;
    document.getElementById("results-content").innerHTML = results;
    resultsModal.show();
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

