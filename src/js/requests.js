const domain = 'http://localhost:3000';

export async function fetchMembersAndAliases() {
  try {
    let data = await Promise.all([
      fetch(`${domain}/slackusers`),
      fetch(`${domain}/mapping`)
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
    return fetch(`${domain}/update`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: body,
      credentials: 'omit'
    });
  } catch (err) {
    console.error(err);
    alert("Can't save data. Try later");
  }
}