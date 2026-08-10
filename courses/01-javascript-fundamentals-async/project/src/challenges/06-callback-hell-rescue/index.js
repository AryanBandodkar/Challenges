export function solve_06_callback_hell_rescue(callback) {
  function fetchData(next) {
    setTimeout(() => { next(null, "Data"); }, 500);
  }
  function processData(data, next) {
    setTimeout(() => { next(null, `${data} Processed`); }, 500);
  }
  fetchData((err, data) => {
    if (err)
    { return callback(err); }
    processData(data, (err, result) => {
      if (err) { return callback(err); }
      callback(null, result);
    });
  });
}
  

