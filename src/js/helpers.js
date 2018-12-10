export function getMembers(response) {
  return response.members.map((member) => {
    return {
      id: member.enterprise_user.id,
      realName: member.profile.real_name,
      aliases: [],
    }
  });
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