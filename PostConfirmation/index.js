const fetch = require('node-fetch');

const adminSecret = process.env.ADMIN_SECRET;
const hgeEndpoint = process.env.HGE_ENDPOINT;

const query = `
mutation addUser($id: String!, $email: String!, $name: String!){
  insert_users(objects:[{
    email: $email
    id: $id
   	name: $name
  }]) {
    returning {
      email
    }
  }
}
`

exports.handler = (event, context, callback) => {

  console.log('event:', JSON.stringify(event));

  try {
    const qv = {
      email: event.request.userAttributes.email,
      id: event.request.userAttributes.sub,
      name: event.userName
    };

    fetch(hgeEndpoint + '/v1/graphql', {
      method: 'POST',
      body: JSON.stringify({ query: query, variables: qv }),
      headers: { 'Content-Type': 'application/json', 'x-hasura-admin-secret': adminSecret },
    })
      .then(res => res.json())
      .then(json => {
        callback(null, event);
      });


  } catch (e) {
    callback(null, false)
  }


};