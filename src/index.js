import './styles/style.sass';
import { stub } from './js/stub';
import { getMembers, mapIdsToRealNames } from './js/helpers';

const Tabulator = require('tabulator-tables');

let members = getMembers(stub);
let idsToRealNames = mapIdsToRealNames(members);
console.log('members');
console.log(members);
console.log('idsToRealNames');
console.log(idsToRealNames);

let table = new Tabulator("#table", {
  height: 658,
  pagination: "local",
  paginationSize: 25,
  data: members,
  layout: "fitColumns",
  columns: [
    {
      title: "Slack Handle",
      field: "id",
      editor: "autocomplete",
      editorParams: {showListOnEmpty: true, values: idsToRealNames},
      cellEdited: cellEdited,
    }, // TODO: bug: searching by ids, not by names. see searchFunc
    {title: "Aliases", align: "left"},
    {title: "Action"},
  ],
  rowClick: function(e, row) {
    console.log("Row " + row.getData().id + " Clicked!!!!");
  },
});

function cellEdited(cell) {
  console.log('members');
  console.log(members);
  console.log('cell');
  console.log(cell);
}