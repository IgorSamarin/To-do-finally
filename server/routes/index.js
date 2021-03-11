module.exports = (app) => {
  app.get('/', (req, res) =>
    res.status(200).send({
      message: 'Welcome to the Todos API!',
    })
  );
  const klawSync = require('klaw-sync');
  const path = require('path');
  async function useControllers() {
    const paths = klawSync(
      path.resolve('server/controllers'),
      { nodir: true, }
      );
    let controllersCount = 0;
    paths.forEach((file) => {
      if (
        path.basename(file.path)[0] === '_' ||
        path.basename(file.path)[0] === '.'
      )
        return;
      app.use('/', require(file.path));
      controllersCount++;
    });

    console.info(`Total controllers: ${controllersCount}`);
  }

  useControllers();
  
};
