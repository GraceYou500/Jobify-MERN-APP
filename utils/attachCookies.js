const attachCookies = ({ res, token }) => {
  const oneDay = 1000 * 60 * 60 * 24; // millionsecondes

  // don't need to return the res.cookie, it will auto add to the response
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay), // time of now in millionseconds plus 1 day
    secure: process.env.NODE_ENV === 'production', // only send to cookie, only if the protocol is HTTPS. Here only we put it in production (NODE_ENV), secure will be true, if not true we still can test in local environment.
  });
};

export default attachCookies;

// res.cookie => only the cookie/brower can read the token (security). If the cookie expires, the token also cannot access, so it make scense to set the cookie expire same as the token expire time.
