// bind getDate variable to anonymous function
exports.getDate = function() {
  //returns day as number 0 - 6
  const today = new Date();

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  }

  // region: en-US
  return today.toLocaleDateString('en-US', options);

}


exports.getDay = function() {
  const today = new Date();

  return today.toLocaleDateString('en-US', {weekday: "long"});
}
