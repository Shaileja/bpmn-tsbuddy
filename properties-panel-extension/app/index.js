import $ from 'jquery';
import BpmnModeler from 'bpmn-js/lib/Modeler';

import propertiesPanelModule from 'bpmn-js-properties-panel';
import propertiesProviderModule from './provider/magic';
import magicModdleDescriptor from './descriptors/magic';
import processhistory from './descriptors/processhistory';
import {
  debounce
} from 'min-dash';

import diagramXML from '../resources/newDiagram.bpmn';


var container = $('#js-drop-zone');

var bpmnModeler = new BpmnModeler({
  container: '#js-canvas',
  propertiesPanel: {
    parent: '#js-properties-panel'
  },
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

function openDiagram(xml) {

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

// logging history

var myObj, i, j, x = "<ul style='border: 1px solid black'>";
  /*
myObj = {
    "name":"John",
    "age":30,
    "cars": [
        { "name":"Ford", "models":[ "Fiesta", "Focus", "Mustang" ] },
        { "name":"BMW", "models":[ "320", "X3", "X5" ] },
        { "name":"Fiat", "models":[ "500", "Panda" ] }
    ]
}

*/

var myObj= processhistory;

   
for (i in myObj.process.history.historyEntries) {

  function focusElement(){
    alert('hgf');
  }
    x += "<h3><a id="+  myObj.process.history.historyEntries[i].name +" href='' > "+myObj.process.history.historyEntries[i].name +"</a></h3>";
  // x += '<h3><a  onclick= "function(){alert('hello');}" > '+myObj.process.history.historyEntries[i].name +"</a></h3>";
   
   //x += "<div id="+ myObj.process.history.historyEntries[i].type  +"><strong>"  +"<strong></div>";

    //x += "<h3><a  onclick="+"''"focusElement("+'hekkkkkkkk'+")' id="+  myObj.process.history.historyEntries[i].name +" > "+myObj.process.history.historyEntries[i].name +"</a></h3>";
     // x += "<h3 id= "+  myObj.process.history.historyEntries[i].type +" >"+ myObj.process.history.historyEntries[i].name +"</h3>";
    x += "<li> Name: " + myObj.process.history.historyEntries[i].name + "</li>";
    x += "<li> Type: " + myObj.process.history.historyEntries[i].type + "</li>";
    x += "<li>Begin:" + myObj.process.history.historyEntries[i].begin + "</li>";
    x += "<li> End:" + myObj.process.history.historyEntries[i].end + "</li>";
    
    /*
    for (j in myObj.cars[i].models) {
        x += myObj.cars[i].models[j] + "<br>";
    }
    */
}
x+="</ul>";
document.getElementById("demo").innerHTML = x;
/*
var text = 'ddddd';
$(document).click(function(event) {
  text = $(event.target).text();
  console.log(text);
});
*/




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

$(function() {

  $('#js-create-diagram').click(function(e) {
    e.stopPropagation();
    e.preventDefault();

    createNewDiagram();
  });

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







