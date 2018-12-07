import './styles/style.sass';
import { stub } from './js/stub';
import {
  getMembers, mapIdsToRealNames, splitStringIntoArray
} from './js/helpers';

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
      // cellEdited: slackHandleCellEdited,
    }, // TODO: bug: searching by ids, not by names. see searchFunc
    {
      title: "Aliases",
      field: "aliases",
      editor: "input",
      cellEdited: aliasCellEdited,
    },
    {title: "Action"},
  ],
  rowClick: function(e, row) {
    console.log("Row " + row.getData().id + " Clicked!!!!");
  },
});

function aliasCellEdited(cell) {
  cell = cell._cell;
  console.log('~~aliasCellEdited');
  // console.log(cell);
  console.log(cell.row.data.id);
  console.log(cell.value);

  let newAliasesValue = splitStringIntoArray(cell.value);
  console.log('newAliasesValue');
  console.log(newAliasesValue);
  table.updateData([{id: cell.row.data.id, aliases: newAliasesValue}]); // TODO: bug: upd by first found id
}

// function slackHandleCellEdited(cell) {
//   console.log('~~slackHandleCellEdited');
//   console.log('members');
//   console.log(members);
//   console.log('cell');
//   console.log(cell);
// }