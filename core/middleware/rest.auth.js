const responseService = require("../services/response.service")

module.exports = (req, res, next) => {
  //get the token from the header if present
  const clientId = req.headers.client_id
  const secretId = req.headers.secret_id
  //if no token found, return response (without going to the next middelware)
  if (!clientId || !secretId)
    return res
      .status(401)
      .json(responseService.createFail("Access denied. No clientId or secretId provided"))

  try {
    if(clientId === process.env.CLIENT_ID && secretId === process.env.SECRET_ID)
    next()
  } catch (ex) {
    res.status(401).json(responseService.createFail("Invalid API ID's"))
  }
}
