import CACHE from './cache.js';

//All the DOM functionality and control of the application happens in this file
//All the code dealing with the Cache is in the cache.js file.
const APP = {
  itemList: [],
  activeLI: '',
  init() {
    console.log(APP.itemList);
    //page loaded
    document.getElementById('itemForm').addEventListener('submit', APP.addItem);
    document.getElementById('btnItem').addEventListener('click', APP.addItem);
    document.getElementById('btnList').addEventListener('click', APP.saveListAsFile);
    //access the cache
    CACHE.init();
    //then display files
    //and then show all the current files
    APP.getFiles();
    APP.clearCodeBox();
  },
  addItem(ev) {
    //add an item to the list
    ev.preventDefault();
    let item = document.getElementById('gItem').value;
    item = item.trim();
    if (!item) return;
    APP.itemList.push(item);
    APP.displayList();
  },
  displayList() {
    //populate the list of items
    let list = document.getElementById('item_list');
    if (APP.itemList.length === 0) {
      list.innerHTML = 'No Items currently.';
    } else {
      list.innerHTML = APP.itemList
        .map((txt) => {
          return `<li>${txt}</li>`;
        })
        .join('');
    }
    document.getElementById('gItem').value = '';
  },
  clearList() {
    let list = document.getElementById('item_list');
    APP.itemList = [];
    list.innerHTML = 'No Items currently.'
  },
  clearCodeBox() {
    let code = document.querySelector('.data_display code');
    code.innerHTML = 'No file selected';
  },
  saveListAsFile(ev) {
    ev.preventDefault();

    let warning = document.querySelector('.warning');
    let list = document.getElementById('item_list');
    let listItems = list.querySelectorAll(':scope > *');

    //turn the data from the list into the contents for a json file
    if(listItems.length === 0) {
      warning.innerHTML = 'Please enter some data into list before saving.'
    } else {
      warning.innerHTML = '';
      let json = JSON.stringify(APP.itemList);
  
      //and then create a file with the json
      let id = Date.now();
      let filename = `data/data-${id}.json`
      let file = new File([json], filename, { type: 'application/json' });
  
      //and then create a response object to hold the file
      const res = new Response(file, {
        status: 200,
        statusText: 'file good',
        headers: {
          'content-type': file.type,
          'content-length': file.size,
          'X-file': file.name,
        }
      });
      //and then save the response in the cache
      APP.saveFile(filename, res);
      
    }
  },
  saveFile(filename, response) {
    //create a url or request object
    //save the file in the Cache
    //when file has been saved,
    //clear the displayed list
    //and then update the list of files

    if (response) {
      let url = new URL(filename, location.origin);
      CACHE.saveInCache(url, response).then(APP.getFiles); // add warnings
    }
  },
  getFiles() {
    APP.clearList();
    //display all the files in the cache
    CACHE.getFromCache().then(APP.displayFiles);
  },
  displayFiles(matches) {
    console.log(matches);

    //show the file names from the cache as a list.
    console.log(matches.length != 0);
    let list = document.getElementById('file_list');
    if(matches.length === 0) {
      list.innerHTML = 'No Items currently.';
      APP.clearCodeBox();
    } else {
      list.innerHTML = matches
        .map((match) => {
          let filename = match.split('/').at(-1);
          console.log(filename);
          let dateInt = +filename.split('-')[1].split('.')[0];
          console.log(dateInt);
          let timestamp = new Date(dateInt).toLocaleDateString();
          console.log(timestamp);
          return `<li><span class="filename">${filename} </span><span class="timestamp">|| created on: ${timestamp}</span> <button class="delete">Delete</button></li>`;
        })
        .join('');
      
      list.addEventListener('click', APP.handleFileClick);

    }
  },
  handleFileClick(ev) {
    ev.preventDefault();
    let el = ev.target.className;
    if (el === 'delete') {
      console.log(`clicked ${el}`);
      APP.deleteFile(ev);
    }

    if (el === 'filename') {
      console.log(`clicked ${el}`);
      APP.displayFileContents(ev);
    }
  },
  displayFileContents(ev) {
    ev.preventDefault();

    let filename = ev.target.textContent;
    let req = `./data/${filename}`;
    console.log(req);
    //get the list item from the file
    //and show its contents in the <pre><code> area
    CACHE.getFromCache(req).then(txt => {
      let code = document.querySelector('code');
      code.innerHTML = txt;
    });

  },
  deleteFile(ev) {
    ev.preventDefault();
    //user has clicked on a button in the file list
    let li = ev.target.closest(`li`);
    let filename = li.querySelector('span').textContent;
    console.log(filename);

    //delete the file from the cache using the file name
    //remove the list item from the list if successful
    CACHE.deleteFromCache(filename).then(res => {
      if (res) {
        li.remove();
        return;
      }
    })
    .then(res => {
      let list = document.getElementById('file_list');
      let listItems = list.querySelectorAll(':scope > *');
      if (listItems.length === 0) {
        list.innerHTML = 'No Items currently.';
        APP.clearCodeBox();
      }
    });
  },
};

document.addEventListener('DOMContentLoaded', APP.init);
