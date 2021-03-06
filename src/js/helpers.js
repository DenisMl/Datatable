import { saveMember } from './requests';

export function getMembers(membersResponse = {members: []}, aliasesStub = []) {
  const aliasesToId = mapAliasesToId(aliasesStub);
  return membersResponse.members.map((member) => {
    const id = member.enterprise_user.id;
    const realName = member.profile.real_name;
    const aliases = aliasesToId[member.enterprise_user.id] || [];
    return {
      id,
      realName,
      aliases,
    }
  });
}

function mapAliasesToId(aliasesStub) {
  let res = {};
  aliasesStub.forEach((member) => {
    res[member['slack handle']] = member.aliases
  });
  return res;
}

export function getRealNames(members) {
  return members.map((member) => {
    return member.realName;
  });
}

export function getIdByRealName(realName, realNamesToIds) {
  return realNamesToIds[realName];
}

export function mapRealNamesToIds(members) {
  let result = {};
  members.forEach((member) => {
    result[member.realName] = member.id;
  });
  return result;
}

export function splitStringIntoArray(string) {
  let array = string.split(',');
  return array.map((element) => {
    return element.trim();
  });
}

export function saveRow(e, cell) {
  let rowData = cell.getRow().getData();
  let result = {
    full_name: rowData.realName,
    slack_handle: rowData.id,
    aliases: rowData.aliases,
  };
  saveMember(result)
    .then((res) => {
      console.log('~saving res');
      console.log(res);
      alert('Successfully saved!')
    })
    .catch(() => { // TODO: error handling. res.ok = false (everytime)
      alert('Saving error!')
    })
}