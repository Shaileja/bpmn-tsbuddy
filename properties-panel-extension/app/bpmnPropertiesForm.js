import $ from 'jquery';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import processhistory from './descriptors/processhistory';


$
var dat =processhistory.process.states;//[element];
console.log(dat);
 var dt='{"var1":"1","var2":"2"}';
 var data=dat;
      var i;     
console.log(data);
console.log(data['Start']);
for(i in data){
var ids='#'+i+'-process-name';
console.log(ids);
console.log(data[i]);
         if (data) {
                $(ids).val(data[i]["process-name"]);
            }
            if (data) {
                $('#'+i+'-process-id').val(data[i]["process-id"]);
            }
            if (data) {
             $('#'+i+'-process-permission').val(data[i]["process-permission"]);
         }
       }