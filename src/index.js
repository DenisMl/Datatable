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

const printButton = () => "<button class='save-btn'>save</button>";

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
    {
      width: "60",
      title: "Action",
      formatter: printButton,
      align: "center",
      cellClick: saveRow,
      headerSort: false,
    },
  ],
});

function aliasCellEdited(cell) {
  cell = cell._cell; // TODO: use cell.getRow().getData();
  console.log('~~aliasCellEdited');
  // console.log(cell);
  console.log(cell.row.data.id);
  console.log(cell.value);

  let newAliasesValue = splitStringIntoArray(cell.value);
  console.log('newAliasesValue');
  console.log(newAliasesValue);
  table.updateData([{id: cell.row.data.id, aliases: newAliasesValue}]); // TODO: bug: upd by first found id
}

function saveRow(e, cell) {
  let rowData = cell.getRow().getData();
  let result = {
    slackHandle: rowData.id,
    aliases: rowData.aliases,
  };
  console.log('~row Saved');
  console.log(result);
}