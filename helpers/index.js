
module.exports.applyAggregation = (data) => {
    const result = data.reduce((acc, current) => {
      const key = `${current.Category}-${current.idx}`;
  
      // group by category & idx and push all the items with same categories to its items array
      if (!acc[key]) {
        acc[key] = {
          Category: current.Category,
          idx: current.idx,
          side: current.idx%2 !== 0 ? 'left' : 'right',
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
  