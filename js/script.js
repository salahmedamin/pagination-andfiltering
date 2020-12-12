/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

const showPage = (list,page)=>{
   let start=page*9
   let end=start+8
   let studentList = document.querySelector("ul.student-list")
   studentList.innerHTML = ''
   list.forEach((e,i) => {
      if(i>=start && i<=end){
         let val = `
         <li class="student-item cf">
         <div class="student-details">
           <img class="avatar" src="${e.picture.large}" alt="Profile Picture">
           <h3>${e.name.first} ${e.name.last}</h3>
           <span class="email">${e.email}</span>
         </div>
         <div class="joined-details">
           <span class="date">Joined ${e.registered.date}</span>
         </div>
       </li>
         `
         studentList.insertAdjacentHTML("beforeend", val);
      }
   });
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

const addPagination = (list)=>{
   let needed = list.length % 9 == 0 ? (list.length / 9)-1 : (list.length/9);
   let linkList = document.querySelector("ul.link-list")
   linkList.innerHTML = ''
   let counter = 0;
   while(counter < (needed)){
      let v = `<li>
                  <button type="button" ${counter==0?'class="active"':''}>${counter+1}</button>
               </li>`
      linkList.insertAdjacentHTML("beforeend", v);
      counter++
   }
   linkList.addEventListener("click",(e)=>{
      if(e.target.tagName == "BUTTON"){
         document.querySelector(".active").classList.remove("active")
         e.target.classList.add("active")
         showPage(list,parseInt(e.target.textContent)-1)
      }
   })
}

const search = (list,keyword)=>{
   let key = new RegExp(keyword);
   return list.filter(e=>e.name.first.match(key) || e.name.last.match(key))
}

document.querySelector("label.student-search > button").addEventListener("click",(e)=>{
   let inp;
   if(e.target.tagName == "BUTTON"){
      inp = e.target.previousElementSibling
   }
   else{
      inp = e.target.parentElement.previousElementSibling
   }
   if(inp.value == ""){
      showPage(data,0)
      addPagination(data)
      return;
   }
   let newData = search(data,inp.value)
   showPage(newData,0)
   addPagination(newData)
})

// Call functions
showPage(data,0)
addPagination(data)