import $ from 'jquery';
import BpmnModeler from 'bpmn-js/lib/Modeler';

import propertiesPanelModule from 'bpmn-js-properties-panel';
import propertiesProviderModule from './provider/magic';
import magicModdleDescriptor from './descriptors/magic';
import processhistory from './descriptors/processhistory';

//var processhistory;
var urldata;

import {
  debounce
} from 'min-dash';

import diagramXML from '../resources/newDiagram.bpmn';

var container = $('#js-drop-zone');



var getBusinessObject = require('bpmn-js/lib/util/ModelUtil').getBusinessObject;
var bpmnModeler = new BpmnModeler({
  container: '#js-canvas',
  additionalModules: [
    propertiesPanelModule,
    propertiesProviderModule
  ],
  moddleExtensions: {
    magic: magicModdleDescriptor
  }
});

function createNewDiagram() {
  openDiagram(diagramXML);
}

var myObj;
function openDiagram(xml) {
  var url_string = window.location.href;
  var url = new URL(url_string);
  var c = url.searchParams.get("c");
  var ab = JSON.parse(c);
  console.log(c);
  bpmnModeler.importXML(xml, function(err) {
    if (err) {
      container
        .removeClass('with-diagram')
        .addClass('with-error');

      container.find('.error pre').text(err.message);

      console.error(err);
    } else {
      container
        .removeClass('with-error')
        .addClass('with-diagram');
    }
console.log(getBusinessObject);
// logging history
var propertiesPanel = $('#bpp-properties');
console.log(propertiesPanel);
var myObj, i, j, x = "<ul style='border: 1px solid black ;background: #f8f8f8; box-shadow: 0 0 2px 1px #f8f8f8; list-style-type: none;'><br>";
 
myObj =ab;
   
for (i in myObj.process.history.historyEntries) {
    x += "<div class=history-list  style='border: 1px solid #CCC'><div style='margin: 0 0 6px 11px;'><h3><a id="+  myObj.process.history.historyEntries[i].name +" href='' > "+myObj.process.history.historyEntries[i].name +"</a></h3>";
 
   x+= "<li> User: " + myObj.process.history.historyEntries[i].user + "</li>";
   x+="<li> Role: " + myObj.process.history.historyEntries[i].role + "</li>";
     x += "<li> Name: " + myObj.process.history.historyEntries[i].name + "</li>";
    x += "<li> Type: " + myObj.process.history.historyEntries[i].type + "</li>";
    x += "<li>Begin:" + myObj.process.history.historyEntries[i].begin + "</li>";
    x += "<li> End:" + myObj.process.history.historyEntries[i].end + "</li></div></div><br>";
    
   
}
x+="</ul>";
document.getElementById("demo").innerHTML = x;





// implementing the history interaction

var eventBus = bpmnModeler.get('eventBus');

// you may hook into any of the following events
var events = [
  //'element.hover',
  'element.click',
];

events.forEach(function(event) {

  eventBus.on(event, function(e) {
    console.log(e.element.id);
    var h = document.getElementById(e.element.id);
    h.focus();
    //alert(h);
    //h.style.color = 'red';
    

    /*
    var eventid = e.element.id;
    var endEventNode = document.querySelector('#js-canvas [data-element-id='+eventid+']');
      endEventNode.addEventListener('click', function(e) {
        var historyelement = document.getElementById(e.element.id);
        $('#'+historyelement).focus();
        console.log('clicked the end event!');
      });

    // e.element = the model element
    // e.gfx = the graphical element
    //console.log(event, 'on', e.element.id);
    //console.log(event, 'on', e.element);
    
    */

  });
});




  });
}

function saveSVG(done) {
  bpmnModeler.saveSVG(done);
}

function saveDiagram(done) {

  bpmnModeler.saveXML({ format: true }, function(err, xml) {
    done(err, xml);
  });
}

function registerFileDrop(container, callback) {

  function handleFileSelect(e) {
    e.stopPropagation();
    e.preventDefault();

    var files = e.dataTransfer.files;

    var file = files[0];

    var reader = new FileReader();

    reader.onload = function(e) {

      var xml = e.target.result;

      callback(xml);
    };

    reader.readAsText(file);
  }

  function handleDragOver(e) {
    e.stopPropagation();
    e.preventDefault();

    e.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }

  container.get(0).addEventListener('dragover', handleDragOver, false);
  container.get(0).addEventListener('drop', handleFileSelect, false);
}


////// file drag / drop ///////////////////////

// check file api availability
if (!window.FileList || !window.FileReader) {
  window.alert(
    'Looks like you use an older browser that does not support drag and drop. ' +
    'Try using Chrome, Firefox or the Internet Explorer > 10.');
} else {
  registerFileDrop(container, openDiagram);
}

// bootstrap diagram functions
createNewDiagram();
$(function() {


  $('#demo').click(function(e) {
    e.stopPropagation();
    e.preventDefault();
    
  });

  var downloadLink = $('#js-download-diagram');
  var downloadSvgLink = $('#js-download-svg');

  $('.buttons a').click(function(e) {
    if (!$(this).is('.active')) {
      e.preventDefault();
      e.stopPropagation();
    }
  });

  function setEncoded(link, name, data) {
    var encodedData = encodeURIComponent(data);

    if (data) {
      link.addClass('active').attr({
        'href': 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData,
        'download': name
      });
    } else {
      link.removeClass('active');
    }
  }

  var exportArtifacts = debounce(function() {

    saveSVG(function(err, svg) {
      setEncoded(downloadSvgLink, 'diagram.svg', err ? null : svg);
    });

    saveDiagram(function(err, xml) {
      setEncoded(downloadLink, 'diagram.bpmn', err ? null : xml);
    });
  }, 500);

  bpmnModeler.on('commandStack.changed', exportArtifacts);
});





/*
// code for workflow history

var points = [
  {title: "Point", children: [
      {title: "Point"},
      {title: "Point"},
      {title: "Point"},
      {title: "Point", children: [
          {title: "Point"},
          {title: "Point"},
          {title: "Point"}
      ]}
  ]},
  {title: "Point", children: [
      {title: "Point"},
      {title: "Point", children: [
          {title: "Point"},
          {title: "Point"},
          {title: "Point"}
      ]},
      {title: "Point"}
  ]},
];

function buildList(parentElement, items) {
  var i, l, list, li;
  if( !items || !items.length ) { return; } // return here if there are no items
  list = $("<ul></ul>").appendTo(parentElement);
  for(i = 0, l = items.length ; i < l ; i++) {
      li = $("<li></li>").text(items[i].title);
      buildList(li, items[i].children);
      list.append(li);
  }
}

buildList($('#pageContent').empty(), points);

*/

///////////////////////////////////////////////////////////
/*
$('#demo').click(function(e) {
  //alert(e.target);
  console.log(e.target.id);
  var endEventNode = document.querySelector('#js-canvas [data-element-id=Start]');
  console.log(endEventNode);
  $('#js-canvas [data-element-id=Start]').click();
});
*/


var $file =$('[data-open-file]');
//read file function
function readFile(file, done) {

  if (!file) {
    return done(new Error('no file chosen'));
  }

  var reader = new FileReader();

  reader.onload = function(e) {
    done(null, e.target.result);
  };

  reader.readAsText(file);
}

 //on file change
$file.on('change', function() {
  readFile(this.files[0], function(err, xml) {

    if (err) {
      alert('could not read file, see console');
      return console.error('could not read file', err);
    }
    openDiagram(xml);
  });

});







