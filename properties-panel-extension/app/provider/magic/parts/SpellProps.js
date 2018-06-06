import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';

import {
  is
} from 'bpmn-js/lib/util/ModelUtil';


export default function(group, element) {

  // Only return an entry, if the currently selected
  // element is a start event.
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

  if (is(element, 'bpmn:StartEvent')) {
    group.entries.push(entryFactory.textField({
      id : 'spell',
      description : 'Apply a black magic spell',
      label : 'Spell',
      modelProperty : 'spell'
    }));
  }
}