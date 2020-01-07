/**
  Set all the important variables that can be reused
**/

const mainDiv = document.querySelector('div.page');
const ul = document.querySelector('ul.student-list');
const list = ul.children;
const limit = 10;
let dPage = 1;
let pageActive;


/*** 
  create a function that will help in creating an html element
  and decreasing the work to do
***/
function create(element,arrAtt,arrVal) {
  const elem = document.createElement(element);
  for(let i = 0; i < arrAtt.length; i++) {
    elem[arrAtt[i]] = arrVal[i];
  }
  return elem;
}

function showPage(list,page) {
    const startList = (page * limit) - limit;
    const endList = page * limit;

    for(let i = 0; i < list.length; i++) {
      const li = list[i];
      if( i < startList || i >= endList) {
        li.style.display = 'none';
      } else {
        li.style.display = '';
      }
    }
}


/*** 
   create a function that will display the page links
   and change display on page click
***/


function appendPageLinks(list) {
  pDiv = create('div',['className'],['pagination']);
  const pageList = create('ul','','');
  const pages = Math.ceil(list.length / limit);
    mainDiv.appendChild(pDiv);
    pDiv.appendChild(pageList);

  for(let i = 0; i < pages; i++) {
    const li = create('li','','');
    const a = create('a',['href','textContent'],['#',i + 1]);

    li.appendChild(a);
    pageList.appendChild(li);
  }

  pageActive = pageList.firstElementChild.firstElementChild;
  pageActive.className = 'active';

  pageList.addEventListener('click',(e) => {
    if(e.target.tagName === 'A') {
      const a = e.target;
      pageActive.className = '';
      pageActive = a;
      a.className = 'active';

      showPage(list,a.textContent);
    }
  });
}


/**
  create a search bar

**/
const srchDiv =  create('div',['className'],['student-search']);
const form = create('form','','');
const label = create('label',['textContent'],['Search By:']);
const select = create('select',['name'],['ctgry']);
const opt1 = create('option',['value','textContent'],['h3','Name']);
const opt2 = create('option',['value','textContent'],['.email','Email']);
const input =  create('input',['type','placeholder'],['text','Search for students...']);
const btn =  create('button',['type','textContent'],['submit','Search']);
  select.appendChild(opt1);
  select.appendChild(opt2);
  form.appendChild(label)
  form.appendChild(select);
  form.appendChild(input);
  form.appendChild(btn);
  srchDiv.appendChild(form);
  mainDiv.firstElementChild.appendChild(srchDiv);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const students = document.querySelectorAll('li.student-item ' + select.value);
  let data = input.value;
  let reg = new RegExp("^"+data,"ig");
  let output = [];

  for(let i = 0; i < students.length; i++) {
    const studentName = students[i].textContent;
    if(studentName.match(reg)) {
      output.push(students[i].parentNode.parentNode);
    }
    students[i].parentNode.parentNode.style.display = 'none';
  }

  mainDiv.removeChild(pDiv);
  showPage(output,dPage);
  appendPageLinks(output);
});


/**
  execute the initial page
**/
showPage(list,dPage);
appendPageLinks(list);