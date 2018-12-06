import './styles/style.sass';
import { stub } from './js/stub';

const Tabulator = require('tabulator-tables');

let members = stub.members.map((member) => {
  return {
    id: member.enterprise_user.id,
    realName: member.real_name,
  }
});

console.log('members');
console.log(members);

let table = new Tabulator("#table", {
  height: 658, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
  pagination: "local",
  paginationSize: 25,
  data: members, //assign data to table
  layout: "fitColumns", //fit columns to width of table (optional)
  columns: [
    {title: "Slack Handle", field: "id"},
    {title: "Aliases", align: "left"},
    {title: "Action"},
    // {title: "Date Of Birth", field: "dob", sorter: "date", align: "center"},
  ],
  rowClick: function(e, row) {
    console.log("Row " + row.getData().id + " Clicked!!!!");
  },
});