import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';

import {
  is
} from 'bpmn-js/lib/util/ModelUtil';





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
          console.log(prop + ': ' + theObject[prop]);
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
    
    "properties" : {}
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
var result = getObject(myObject);
export default function(group, element) {
  // Only return an entry, if the currently selected
  // element is a start event.
  for(var k=0;k< field.length;k++){
    var prop = field[k];
    group.entries.push(entryFactory.textField({
      id : prop,
      description : prop,
      label : prop,
      modelProperty : prop
    }));
  }
  group.entries.push(entryFactory.selectBox({
    id : 'history',
    description : 'history',
    label : 'history entries',
    modelProperty : 'history',



    selectOptions: hist,
    emptyParameter: false,
  }));
  group.entries.push(entryFactory.textField({
    id : 'title',
    description : 'Add title',
    label : 'Title',
    modelProperty : 'title'
  }));

  group.entries.push(entryFactory.textField({
    id : 'description',
    description : 'Add description',
    label : 'Description',
    modelProperty : 'description'
  }));
  group.entries.push(entryFactory.textField({
    id : 'WF_ITEM',
    description : 'Add work flow item',
    label : 'WF_ITEM',
    modelProperty : 'WF_ITEM'
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

}
