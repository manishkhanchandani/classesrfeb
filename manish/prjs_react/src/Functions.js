//import * as MyFunc from './Functions.js';

/*
 * MyFunc.hostDetails();
 */
export const hostDetails = () => {
  let obj = {};
  obj.host = window.location.host;
  obj.hostname = window.location.hostname;
  obj.protocol = window.location.protocol;
  obj.pathname = window.location.pathname;
  obj.origin = window.location.origin;
  console.log('host details: ', obj);
  return obj;
}
