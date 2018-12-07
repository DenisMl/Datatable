import './styles/style.sass';
import { stub } from './js/stub';
import {
  getIdByRealName,
  getMembers,
  getRealNames,
  mapRealNamesToIds,
  saveRow,
  splitStringIntoArray
} from './js/helpers';

const Tabulator = require('tabulator-tables');

let members = getMembers(stub);
let realNames = getRealNames(members);
let realNamesToIds = mapRealNamesToIds(members);
// console.log('members');
// console.log(members);
// console.log('realNamesToIds');
// console.log(realNamesToIds);

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
      editorParams: {
        showListOnEmpty: true,
        values: realNames,
      },
      cellEdited: slackHandleCellEdited,
    }, // TODO: bug(fixed): searching by ids, not by names. see searchFunc [X]. use cb cellEdited and change val
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
  let newAliasesValue = splitStringIntoArray(cell.value);
  table.updateData([{id: cell.row.data.id, aliases: newAliasesValue}]); // TODO: bug: upd by first found id
}

function slackHandleCellEdited(cell) {
  let row = cell.getRow();
  let cellData = row.getData();
  let realName = cellData.id;
  let newId = getIdByRealName(realName, realNamesToIds);
  table.updateRow(row, {id: newId});
}
