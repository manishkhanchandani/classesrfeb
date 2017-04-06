import MyConstant from '../constants/MyConstant.js';

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
