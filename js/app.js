import CACHE from './cache.js';

//All the DOM functionality and control of the application happens in this file
//All the code dealing with the Cache is in the cache.js file.
const APP = {
  itemList: [],
  activeLI: '',
  init() {
    //page loaded
    document.getElementById('itemForm').addEventListener('submit', APP.addItem);
    document.getElementById('btnItem').addEventListener('click', APP.addItem);
    document.getElementById('btnList').addEventListener('click', APP.saveListAsFile);
    //access the cache
    //then display files
    //and then show all the current files
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
  saveListAsFile(ev) {
    ev.preventDefault();
    //turn the data from the list into the contents for a json file
    //and then create a file with the json
    //and then create a response object to hold the file
    //and then save the response in the cache
  },
  saveFile(filename, response) {
    //create a url or request object
    //save the file in the Cache
    //when file has been saved,
    //clear the displayed list
    //and then update the list of files
  },
  getFiles() {
    //display all the files in the cache
    //loop through response matches and display the file names
  },
  displayFiles(matches) {
    //show the file names from the cache as a list.
    //each list item contains a span for the file name plus a button for deleting the file from the cache
  },
  displayFileContents(ev) {
    //get the list item from the file
    //and show its contents in the <pre><code> area
  },
  deleteFile(ev) {
    ev.preventDefault();
    //user has clicked on a button in the file list
    //delete the file from the cache using the file name
    //remove the list item from the list if successful
    //clear the code contents
  },
};

document.addEventListener('DOMContentLoaded', APP.init);
