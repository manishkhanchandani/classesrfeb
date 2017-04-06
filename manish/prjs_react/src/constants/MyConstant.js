const MyConstant = {
  LOCATION: 'LOCATION',
  KEYWORD: 'KEYWORD',
  saveData: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  },
  getData: (key) => {
    let obj = localStorage.getItem(key);
    if (obj) {
      obj = JSON.parse(obj);
    }

    return obj;
  }
}

export default MyConstant;
