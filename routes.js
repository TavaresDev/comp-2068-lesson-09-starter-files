module.exports = router => {
  // require('')
  require('./routes/users')(router);

  return router;
};