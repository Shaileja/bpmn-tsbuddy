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


  var myObject = {"process" : {
    "state" : {
        "tokens" : []
    },
        "createdAt" : 1527589244347.0,
        "finishedAt" : 1527589528464.0,
    
    //"properties" : {}
}};

var hist = [ 
  {
      "name" : "Start",
      'value': "Start",
      "type" : "startEvent",
      "begin" : 1527589244348.0,
      "end" : 1527589244354.0
  }, 
  {
      "name" : "Request",
      'value': "Request",
      "type" : "userTask",
      "begin" : 1527589244354.0,
      "end" : 1527589474782.0
  }, 
  {
      "name" : "Review",
      'value': "Review",
      "type" : "userTask",
      "begin" : 1527589474782.0,
      "end" : 1527589528463.0
  }, 
  {
      "name" : "End",
      "type" : "End",
      "begin" : 1527589528463.0,
      "end" : 1527589528464.0
  }
];

var role= [ 
  {
      "name" : "requestor",
      'value': "requestor",
     
  },  {
    "name" : "approver",
    'value': "approver",
   
}];

var view = {}
var result = getObject(myObject);
export default function(group, element) {

  // Only return an entry, if the currently selected
  // element is a start event.

  /*
  for(var k=0;k< field.length;k++){
    var prop = field[k];
    group.entries.push(entryFactory.textField({
      id : prop,
      description : prop,
      label : prop,
      modelProperty : prop
    }));
  }
*/
  for(var index=0;index<role.length;index++){
    
  group.entries.push(entryFactory.checkbox({
    id : role[index].name+'_view',
    description :role[index].name+'_view',
    label : role[index].name+' view',
    modelProperty : role[index].name+'_view',
   // selectOptions: view,
    emptyParameter: false,
  }));
    }

  group.entries.push(entryFactory.selectBox({
    id : 'role',
    description : 'role',
    label : 'Role',
    modelProperty : 'role',
    selectOptions: role,
    emptyParameter: false,
  }));

  group.entries.push(entryFactory.textField({
    id : 'permission',
    description : 'Permission',
    label : 'Permission',
    modelProperty : 'permission'
  }));
  
  group.entries.push(entryFactory.textField({
    id : 'WF_ITEM',
    description : 'work flow item',
    label : 'WF_ITEM',
    modelProperty : 'WF_ITEM'
  }));
  group.entries.push(entryFactory.textField({
    id : 'title',
    description : 'Add title',
    label : 'Title',
    modelProperty : 'title'
  }));

group.entries.push(entryFactory.selectBox({
  id : 'state',
  description : 'state',
  label : 'State',
  modelProperty : 'state',
  selectOptions: state_tokens,
  emptyParameter: false,
}));

group.entries.push(entryFactory.textBox({
  id : 'Description',
  description : 'Description',
  label : 'Description',
  modelProperty : 'Description'
}));
 /*
 
  
  

  group.entries.push(entryFactory.textField({
    id : 'description',
    description : 'Add description',
    label : 'Description',
    modelProperty : 'description'
  }));
  
  group.entries.push(entryFactory.textField({
    id : 'datetime',
    description : 'datetime',
    label : 'DateTime',
    modelProperty : 'datetime'
  }));
 
  group.entries.push(entryFactory.textField({
    id : 'role',
    description : 'role',
    label : 'Role',
    modelProperty : 'role'
  }));
  group.entries.push(entryFactory.textField({
    id : 'view',
    description : 'view',
    label : 'view',
    modelProperty : 'view'
  }));
  group.entries.push(entryFactory.textField({
    id : 'permission',
    description : 'Permission',
    label : 'Permission',
    modelProperty : 'permission'
  }));

    group.entries.push(entryFactory.textField({
      id : 'spell',
      description : 'Apply a black magic spell',
      label : 'Spell',
      modelProperty : 'spell'
    }));
    */ 

}
