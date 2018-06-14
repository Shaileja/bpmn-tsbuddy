import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';

import {
  is
} from 'bpmn-js/lib/util/ModelUtil';

import processhistory from '../../../descriptors/processhistory';
var myObj= processhistory;

var getBusinessObject = require('bpmn-js/lib/util/ModelUtil').getBusinessObject;
 
var schema = processhistory;
var state_tokens = schema.process.state.tokens;

var field = [];
function getObject(theObject) {
  var result = null;
  if(theObject instanceof Array) {
      for(var i = 0; i < theObject.length; i++) {
          result = getObject(theObject[i]);
      }
  }
  else
  {
      for(var prop in theObject) {
         // console.log(prop + ': ' + theObject[prop]);
          field.push(prop);
          if(theObject[prop] instanceof Object || theObject[prop] instanceof Array)
              result = getObject(theObject[prop]);
      }
  }
  return result;
}



var role= [ 
  {
      "name" : "requestor",
      'value': "requestor",
     
  },  {
    "name" : "approver",
    'value': "approver",
   
}];

var view = {}
//var result = getObject(myObject);
export default function(group, element) {

 
}
