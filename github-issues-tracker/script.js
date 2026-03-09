const API="https://phi-lab-server.vercel.app/api/v1/lab/issues"

const container=document.getElementById("issuesContainer")

const searchInput=document.getElementById("searchInput")

const allBtn=document.getElementById("allBtn")
const openBtn=document.getElementById("openBtn")
const closedBtn=document.getElementById("closedBtn")

let allIssues=[]

async function loadIssues(){

const res=await fetch(API)

const data=await res.json()

allIssues=data.data

display(allIssues)

setActive(allBtn)

}


function display(issues){

container.innerHTML=""

document.getElementById("issueCount").innerText=issues.length+" Issues"

issues.forEach(issue=>{

const card=document.createElement("div")

card.className="card "+issue.status

card.onclick=()=>openModal(issue)

let priorityClass=""

if(issue.priority==="high") priorityClass="priority-high"

if(issue.priority==="medium") priorityClass="priority-medium"

if(issue.priority==="low") priorityClass="priority-low"


card.innerHTML=`

<div class="card-header">

<span class="status-dot ${issue.status}"></span>

<span class="priority ${priorityClass}">

${issue.priority.toUpperCase()}

</span>

</div>


<h4>${issue.title}</h4>

<p>${issue.description}</p>


<div class="labels">

<span class="label bug">BUG</span>

<span class="label help">HELP WANTED</span>

</div>


<div class="card-footer">

<span>#1 by ${issue.author}</span>

<span>${new Date(issue.createdAt).toLocaleDateString()}</span>

</div>

`

container.appendChild(card)

})

}



// ACTIVE TAB

function setActive(btn){

allBtn.classList.remove("active")

openBtn.classList.remove("active")

closedBtn.classList.remove("active")

btn.classList.add("active")

}


// FILTER BUTTONS

allBtn.onclick=()=>{

display(allIssues)

setActive(allBtn)

}


openBtn.onclick=()=>{

const open=allIssues.filter(i=>i.status==="open")

display(open)

setActive(openBtn)

}


closedBtn.onclick=()=>{

const closed=allIssues.filter(i=>i.status==="closed")

display(closed)

setActive(closedBtn)

}


// SEARCH

searchInput.addEventListener("input",function(){

const text=this.value.toLowerCase()

const filtered=allIssues.filter(issue=>

issue.title.toLowerCase().includes(text)

)

display(filtered)

})



// MODAL

function openModal(issue){

document.getElementById("modal").style.display="flex"

let priorityClass=""

if(issue.priority==="high") priorityClass="priority-high"

if(issue.priority==="medium") priorityClass="priority-medium"

if(issue.priority==="low") priorityClass="priority-low"


document.getElementById("modalTitle").innerText=issue.title

document.getElementById("modalDescription").innerText=issue.description

document.getElementById("modalAuthor").innerText=issue.author


document.getElementById("modalPriority").innerHTML=

`<span class="priority ${priorityClass}">${issue.priority.toUpperCase()}</span>`


document.getElementById("modalDate").innerText=issue.createdAt

}


function closeModal(){

document.getElementById("modal").style.display="none"

}


// START

loadIssues()