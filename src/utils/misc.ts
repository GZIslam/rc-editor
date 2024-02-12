export const stringify = (obj: object) => {
    let cache: string[] = [];
    const str = JSON.stringify(obj, function (key, value) {
      if (typeof value === "object" && value !== null) {
        if (cache.indexOf(value) !== -1) {
          return;
        }
        cache.push(value);
      }
  
      return value;
    });
    cache = [];
  
    return str;
  };
  