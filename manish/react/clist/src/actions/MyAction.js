//import {sample} from '../actions/MyAction.js';

import MyConstant from '../constants/MyConstant.js';

export const sample = () => {
  return {
    type: 'SAMPLE',
    payload: 10
  }
}

export const ipDetails = () => {
  /*const prevData = MyConstant.getData(MyConstant.IPDETAILS);
  if (prevData) {
    return {
      type: 'SET_IP_DETAILS',
      payload: prevData
    }//end return
  }*/
  
  const url = 'http://api.mkgalaxy.com/ip.php';
  return {
    type: 'SET_IP_DETAILS',
    payload: new Promise((resolve, reject) => {
      fetch(url, {
        method: 'GET'
      }).then((response) => {
        return response.json();
      }).then((j) => {
        console.log('j is ', j);
        MyConstant.saveData(MyConstant.IPDETAILS, j.data.result);
        resolve(j.data.result);
      }).catch((err) => {
        console.log('error is ', err);
        reject(err);
      })
    })
  }
  
};

export const setLocation = (location) => {
  MyConstant.saveData('location', location);
  return {
    type: MyConstant.LOCATION,
    payload: location
  }
}


export const setKeyword = (keyword) => {
  MyConstant.saveData('keyword', keyword);
  return {
    type: MyConstant.KEYWORD,
    payload: keyword
  }
}

export const parsePlace = (place) => {
  let componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    administrative_area_level_2: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
  };
  var obj = {}
  for (let component in componentForm) {
      obj[component] = null;
  }
  for (var i = 0; i < place.address_components.length; i++) {
      const addressType = place.address_components[i].types[0];
      if (componentForm[addressType]) {
          var val = place.address_components[i][componentForm[addressType]];
          obj[addressType] = val;
      }
   }
  obj['county'] = obj['administrative_area_level_2'];
  obj['state'] = obj['administrative_area_level_1'];
  obj['city'] = obj['locality'];
  obj.address = place.formatted_address;
  obj.lat = place.geometry.location.lat();
  obj.lng = place.geometry.location.lng();
  console.log('parsePlace: ', obj);
  return obj;
}


export const savePlace = (place) => {
  const obj = parsePlace(place);
  console.log('save Place: ', obj);
  return setLocation(obj);
}
