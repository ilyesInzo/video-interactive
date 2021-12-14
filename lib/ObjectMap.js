
export const jsonToMap = (dataObject) =>  {
    var dataMap = new Map(Object.entries(dataObject));
    var resultMap = new Map();
    for (const key of dataMap.keys())  {
       var value = dataMap.get(key);
        resultMap.set(Number(key), value);
    }
    return resultMap;
}
