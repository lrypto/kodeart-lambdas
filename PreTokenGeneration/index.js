exports.handler = (event, context, callback) => {
  event.response = {
    "claimsOverrideDetails": {
      "claimsToAddOrOverride": {
        "event": JSON.stringify(event.userName),
        "https://hasura.io/jwt/claims": JSON.stringify({
          "x-hasura-allowed-roles": ["anonymous", "user", "admin"],
          "x-hasura-default-role": event.userName === "elrypto" ? "admin" : "user",
          "x-hasura-user-id": event.userName
        })
      }
    }
  }
  callback(null, event)
}