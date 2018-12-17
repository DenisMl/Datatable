const domain = window.domain;

export async function fetchMembersAndAliases() {
  try {
    let data = await Promise.all([
      fetch(`${domain}/slackusers`),
      fetch(`${domain}/usermapping`)
    ]);
    return Promise.all(data.map((res) => {
      return res.json();
    }))
  } catch (err) {
    console.error(err);
    alert("Can't load data. Try later");
  }
}

export function saveMember(body) {
  try {
    body = JSON.stringify(body);
    return fetch(`${domain}/userupdate`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: body,
      mode: 'no-cors',
    });
  } catch (err) {
    console.error(err);
    alert("Can't save data. Try later");
  }
}