
module.exports.applyAggregation = (data) => {
  const result = data.reduce((acc, current,index) => {
    const key = `${current.Category}-${index+1}`;

    // group by category & idx and push all the items with same categories to its items array
    if (!acc[key]) {
      acc[key] = {
        Category: current.Category,
        idx: index+1,
        side: index%2 == 0 ? 'left' : 'right',
        items: [],
      };
    }
  

    acc[key].items.push({
      itemName: current.Item,
      itemDescription: current.Description,
      itemPrice: current.Price.replace("$",""),
    });

    return acc;
  }, {});

  // Convert the result object back to an array
  return Object.values(result);
};
