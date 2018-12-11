export function getMembers(membersResponse = {members: []}, aliasesStub = []) {
  const aliasesToId = mapAliasesToId(aliasesStub);
  return membersResponse.members.map((member) => {
    const id = member.enterprise_user.id;
    const realName = member.profile.real_name;
    const aliases = aliasesToId[member.enterprise_user.id];
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
    res[member.user_id] = member.aliases
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
    realName: rowData.realName,
    slackHandle: rowData.id,
    aliases: rowData.aliases,
  };
  console.log('~row Saved');
  console.log(result);
}