import './styles/style.sass';
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
import { fetchMembersAndAliases } from './js/requests';

const Tabulator = require('tabulator-tables');
let table, members, realNames, realNamesToIds;

fetchMembersAndAliases()
  .then((res) => {
    console.log('~res');
    console.log(res);
    initTable(res[0], res[1]);
  })
  .catch((err) => {
    console.error(err);
    alert("Can't load data. Try later");
  });

function initTable(membersRes, aliasesRes) {
  members = getMembers(membersRes, aliasesRes);
  realNames = getRealNames(members);
  realNamesToIds = mapRealNamesToIds(members);

  table = new Tabulator('#table', {
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
}

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
