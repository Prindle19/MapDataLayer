function loadJSONP() {
    
 // Get MapRoot JSON from Maps Engine Directory

// URL of the external script
var url = 'https://mapsenginedirectory.appspot.com/maproot/?acl=public&format=jsonp&callback=parseMapRoot&map=04996796288385000359-08363259842776504974-4';

// Create Insertable Script
var script = document.createElement('script');
script.setAttribute('src', url);

// load the script
document.getElementsByTagName('head')[0].appendChild(script);    
    
}    


function parseMapRoot(data) {
    $("#side_bar").append('<div id="map_title"><h3>' + data.name +'</h3></div>');
    $("#side_bar").append('<ul id="layer_picker" style="list-style-type: none;"></ul>');
    var index = 0
    setMapBounds(data.bounds);
    $.each(data.layers, function(index) {
        $("#layer_picker").append('<li><input type="checkbox" id="' + index + '" class="layer"/><label for="' + index + '">' + data.layers[index].layerName.replace("Frederick County Virginia", "").replace("County Mosaic", "") + '</label></li>');
        
        gebLayer = new google.maps.visualization.MapDataLayer({
            mapId: data.assetId,
            layerId: data.layers[index].key,
            suppressInfoWindows: false,
            oAuthToken: "public"
        });
        gebLayers.push(gebLayer);
        
    });  
  
  //add a JQuery Listener to the new "layer" class, so when a checkbox is checked, it will toggle a layer on or off
  $('.layer').change(function(){
  var layerID = parseInt($(this).attr('id'));
      if ($(this).attr('checked')){
          gebLayers[layerID].setMap(map);
      }else{
          gebLayers[layerID].setMap(null);
      }      
});  
    
}