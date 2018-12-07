export function getMembers(response) {
  return response.members.map((member) => {
    return {
      id: member.enterprise_user.id,
      realName: member.profile.real_name,
      aliases: [],
    }
  });
}

export function mapIdsToRealNames(members) {
  let result = {};
  members.forEach((member) => {
    result[member.id] = member.realName;
  });
  return result;
}

export function splitStringIntoArray(string) {
  let array = string.split(',');
  return array.map((element) => {
    return element.trim();
  });
}