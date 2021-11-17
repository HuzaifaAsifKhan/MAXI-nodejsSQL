const path = require('path');

// module.exports = path.dirname(process.mainModule.filename); //mainModule Deprecated
module.exports = path.dirname(require.main.filename);
