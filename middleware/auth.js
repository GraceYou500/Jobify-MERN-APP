const auth = async (req, res, next) => {
  console.log('Authenticate user');
  next(); // next middleware will pass to updateUser controller automativelly.
};

export default auth;
