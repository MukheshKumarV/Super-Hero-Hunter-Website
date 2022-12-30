//Super Hunter website java script file
//marvel api is used for the super heros data
var l=[]
// all the api urls are marvel api urls
const api_url = "https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=8bec8b766428aa3fb2f14f052573f734&hash="+hash+"&limit=100";

//this a async function which fetches the data from the url
async function getapi(url,l) {

   // Storing response
    const response = await fetch(url);

    // Storing data in form of JSON
    var data1 = await response.json();
    //calling two functions locally written
    show(data1);
    all(data1,l);
}

// Calling that async function
getapi(api_url,l);

//show function renders the data to html using dom , this data is passed by the api function
function show(data1) {
    let tab = ``;
    
    // Loop to access all rows 
    for (let r of data1.data.results) {
        tab += `<li class="list-group-item list-group-item-action list-group-item-info l">
                <input class="form-check-input me-1 z" type="checkbox" data-id = ${r.id} >
                <label class="form-check-label p" data-id = ${r.id} ">${r.name}</label>
            </li>`;
    }
    // Setting innerHTML as tab variable
    document.getElementById("super-heros-list").innerHTML = tab;
}

//all function stores the data feteched from the api in a local variable
function all(data1,l) {
    for (let r of data1.data.results)
    {
    l.push(r)
    }    
    for (let r of l)
    {
        r.fav=false;
    }
}

var favourite = document.getElementById("fav");

// adding an event lister to render favorite heros
fav.addEventListener('click', function () {
    document.getElementById("title").innerHTML = "Favorite Super Heros List(characters)";
	showFav();
});

//show fav function renders favorite heros by checking if a specif hero is fav to the user or not
//each hero has a property "fav" which is true if user selects the hero as fav
function showFav(){
    let l = JSON.parse(localStorage.getItem("favHeros"))
    tab =``
    for (let r of l) 
    {
    const api_url8 = "https://gateway.marvel.com:443/v1/public/characters/"+r+"?ts=1&apikey=8bec8b766428aa3fb2f14f052573f734&hash="+hash;

    async function getapi9(url) {
    // Storing response
    const response3 = await fetch(url);

    // Storing data in form of JSON
    var data1 = await response3.json();
    var name1 = data1.data.results[0].name;
    
    tab += `<li class="list-group-item list-group-item-action list-group-item-info l">
                <input class="form-check-input me-1 z" type="checkbox" data-id = ${r} >
                <label class="form-check-label p" data-id = ${r} ">${name1}</label>
            </li>`;  
            
    // Setting innerHTML as tab variable
    document.getElementById("super-heros-list").innerHTML = tab;
    }
    // Calling that async function
    getapi9(api_url8);
    }
    }

//toggle function is used to toggle the value of fav  
function toggle(id,l){
    for (let r of l) {
        if(r.id==id)
        {
            r.fav=!r.fav
        }
    }
}
var check = document.getElementById("firstCheckbox");

//handle function is used to render superhero specific details if clicked
//or toggle the fav if clicked
function handle(e){
    const target = e.target;
    if (target.className === 'form-check-input me-1 z')
    {
        toggle(target.dataset.id,l)
        let fav=[]
        for (let r of l) {
            if(r.fav==true)
            {
              fav.push(r.id)
            }
            }
            localStorage.setItem("favHeros", JSON.stringify(fav));

    }
    else if(target.className === 'form-check-label p'){
        showIndividual(target.dataset.id)
    }
    else if(target.className === 'btn btn-outline-success q'){
        seraching()
    }
}

// this used to find out which element is clicked
document.addEventListener('click',handle);

//searching function is used to find heros with a string of name
function seraching()
{
    var name2 = document.getElementById("name2").value;
        const api_url7 = "https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=8bec8b766428aa3fb2f14f052573f734&hash="+hash+"&nameStartsWith="+name2;

        async function getapi2(url) {
        // Storing response
            const response2 = await fetch(url);

            // Storing data in form of JSON
            var data4 = await response2.json();
            //Loop to access all rows 
            for (let r of data4.data.results) {
            tab += `<li class="list-group-item list-group-item-action list-group-item-info l">
                <input class="form-check-input me-1 z" type="checkbox" data-id = ${r.id} >
                <label class="form-check-label p" data-id = ${r.id} ">${r.name}</label>
            </li>`;
            }
            // Setting innerHTML as tab variable
            document.getElementById("super-heros-list").innerHTML = tab;
        }

            // Calling that async function
            getapi2(api_url7);
            let tab = ``;
    
            
}
        
//shoeindividual function used to render information about a specific superhero by superhero id
function showIndividual(id)
{
   const api_url2 = "https://gateway.marvel.com:443/v1/public/characters/"+id+"?ts=1&apikey=8bec8b766428aa3fb2f14f052573f734&hash="+hash;
   async function getapi(url) {

   // Storing response
    const response = await fetch(url);

    // Storing data in form of JSON
    var data1 = await response.json();
    var name1 = data1.data.results[0].name
    var path = data1.data.results[0].thumbnail.path
    console.log(path)
    tab = `<h1 class="display-1 text-center" id = "title"><b> ${name1} 
    <img src="${path}" alt="image not recieved from api oops" width="50" height="60"></b></h1><h2>Comics:</h2>`;
    for (let r of data1.data.results[0].comics.items) {
        tab += `<li class="list-group-item list-group-item-action list-group-item-info l">
                <label class="form-check-label" for="firstCheckbox" >${r.name}</label>
                </li>`;
    }
    tab += `<h2>Events:</h2>`;
    for (let r of data1.data.results[0].events.items) {
        tab += `<li class="list-group-item list-group-item-action list-group-item-info l">
                <label class="form-check-label" for="firstCheckbox" >${r.name}</label>
                </li>`;
    }
    tab += `<h2>Series:</h2>`;
    for (let r of data1.data.results[0].series.items) {
        tab += `<li class="list-group-item list-group-item-action list-group-item-info l">
                <label class="form-check-label" for="firstCheckbox" >${r.name}</label>
                </li>`;
    }
    tab += `<h2>Stories:</h2>`;
    for (let r of data1.data.results[0].stories.items) {
        tab += `<li class="list-group-item list-group-item-action list-group-item-info l">
                <label class="form-check-label" for="firstCheckbox" >${r.name}</label>
                </li>`;
    }

    document.getElementById("hero").innerHTML = tab;
}

// Calling that async function
getapi(api_url2);
}
