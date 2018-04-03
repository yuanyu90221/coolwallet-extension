/**
 * asyncWrapper turn callback function into Promise
 * @param {*} asycFunc 
 */
function asyncWrapper(asycFunc) {
  return function(arg) {
    return new Promise((resolve, reject) => {
      asycFunc(arg, (e, data) => e? reject(e): resolve(data));
    })
  }
 }