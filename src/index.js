import './styles/style.sass';
import { stub, aliasesStub } from './js/stub';
import $ from 'jquery';
import {
  getIdByRealName,
  getMembers,
  getRealNames,
  mapRealNamesToIds,
  saveRow,
  splitStringIntoArray,
} from './js/helpers';
import { printButton } from './js/elementFormatters';

const Tabulator = require('tabulator-tables');

let members = getMembers(stub, aliasesStub); // After aliases and members retrieving
let realNames = getRealNames(members);
let realNamesToIds = mapRealNamesToIds(members);
// console.log('~members');
// console.log(members);
// console.log('realNamesToIds');
// console.log(realNamesToIds);

let table = new Tabulator('#table', {
  height: 847,
  pagination: 'local',
  paginationSize: 15,
  data: members,
  layout: 'fitColumns',
  columns: [
    {
      title: 'Full name',
      field: 'realName',
    },
    {
      title: 'Slack Handle',
      field: 'id',
      editor: 'autocomplete',
      editorParams: {
        showListOnEmpty: true,
        values: realNames,
      },
      cellEdited: slackHandleCellEdited,
    },
    {
      title: 'Aliases',
      field: 'aliases',
      editor: 'input',
      cellEdited: aliasCellEdited,
      headerSort: false,
    },
    {
      width: '90',
      title: 'Action',
      formatter: printButton,
      align: 'center',
      cellClick: saveRow,
      headerSort: false,
    },
  ],
});

$('#search-input').change(updateFilter);
$('#search-input').keyup(updateFilter);
$('#clear-search').click(clearSearch);

function updateFilter() {
  let val = $('#search-input').val();
  table.setFilter('realName', 'like', val);
}

function clearSearch() {
  $('#search-input').val('');
  table.clearFilter();
}

function aliasCellEdited(cell) {
  let aliases = splitStringIntoArray(cell.getValue());
  let id = cell.getRow().getData().id;
  table.updateData([{id, aliases}]); // TODO: bug: upd by first found id
}

function slackHandleCellEdited(cell) {
  let row = cell.getRow();
  let cellData = row.getData();
  let realName = cellData.id;
  let newId = getIdByRealName(realName, realNamesToIds);
  table.updateRow(row, {id: newId});
}
