/*
 * Copyright 2015-2017 WorldWind Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Illustrates how to display and pick Polygons.
 */
requirejs(['./WorldWindShim',
        './LayerManager'],
    function (WorldWind,
              LayerManager) {
        "use strict";

        // Tell WorldWind to log only warnings and errors.
        WorldWind.Logger.setLoggingLevel(WorldWind.Logger.LEVEL_WARNING);

        // Create the WorldWindow.
        var wwd = new WorldWind.WorldWindow("canvasOne");

        /**
         * Add imagery layers.
         */
        var layers = [
			//{layer: new WorldWind.BMNGLayer(), enabled: false},
            //{layer: new WorldWind.BMNGLandsatLayer(), enabled: true},
            //{layer: new WorldWind.BingAerialWithLabelsLayer(null), enabled: false},
            {layer: new WorldWind.CompassLayer(), enabled: true},
            {layer: new WorldWind.CoordinatesDisplayLayer(wwd), enabled: true},
            {layer: new WorldWind.ViewControlsLayer(wwd), enabled: true}
        ];

        for (var l = 0; l < layers.length; l++) {
            layers[l].layer.enabled = layers[l].enabled;
            wwd.addLayer(layers[l].layer);
        }		
		
    var modelLayer = new WorldWind.RenderableLayer("Collada Small");
    wwd.addLayer(modelLayer);

    //var position = new WorldWind.Position(0, -120, -6378137.0);
	var position = new WorldWind.Position(0, -100, 0);
    var colladaLoader = new WorldWind.ColladaLoader(position);
    colladaLoader.init({dirPath: './collada_models/'});
    colladaLoader.load('cgprova.dae', function (scene) {
        scene.scale = 500000;
        modelLayer.addRenderable(scene);
    });
        
		
    var modelLayer2 = new WorldWind.RenderableLayer("Collada Big");
    wwd.addLayer(modelLayer2);
	
	var position = new WorldWind.Position(0, -130, 0);
    var colladaLoader = new WorldWind.ColladaLoader(position);
    colladaLoader.init({dirPath: './collada_models/'});
    colladaLoader.load('pumpkin.dae', function (scene) {
        scene.scale = 10000;
        modelLayer2.addRenderable(scene);
    });
	
	        // Create a layer to hold the polygons.
        var polygonsLayer = new WorldWind.RenderableLayer();
        polygonsLayer.displayName = "Polygons";
        wwd.addLayer(polygonsLayer);
		//alert(radtxt);
		
		var boundaries = [];
		var polygon = new WorldWind.Polygon(boundaries, null);
		var polygonAttributes = new WorldWind.ShapeAttributes(null);
		var highlightAttributes = new WorldWind.ShapeAttributes(polygonAttributes);
	
 // Create a textured polygon with extruded and textured sides.
        boundaries = [];
        boundaries[0] = []; // outer boundary
        boundaries[0].push(new WorldWind.Position(29.966935, -140.395923, 1e5));
        boundaries[0].push(new WorldWind.Position(29.750206, -142.327430, 1e5));
        boundaries[0].push(new WorldWind.Position(26.889287, -140.502637, 1e5));

        polygon = new WorldWind.Polygon(boundaries, null);
        //polygon.altitudeMode = WorldWind.ABSOLUTE;
        polygon.altitudeMode = WorldWind.RELATIVE_TO_GROUND;
        polygon.extrude = false;

        polygonAttributes = new WorldWind.ShapeAttributes(null);
        polygonAttributes.drawInterior = true;
        polygonAttributes.drawOutline = false;
        polygonAttributes.outlineColor = WorldWind.Color.RED;
        polygonAttributes.interiorColor = WorldWind.Color.RED;
        //polygonAttributes.interiorColor = WorldWind.Color(0,1,0,1);
        //polygonAttributes.drawVerticals = polygon.extrude;
        polygonAttributes.applyLighting = true;
        polygon.attributes = polygonAttributes;
        //highlightAttributes = new WorldWind.ShapeAttributes(polygonAttributes);
        //highlightAttributes.outlineColor = WorldWind.Color.RED;
        //polygon.highlightAttributes = highlightAttributes;

        polygonsLayer.addRenderable(polygon);
		//}
	
        // Create a layer manager for controlling layer visibility.
        var layerManger = new LayerManager(wwd);

        // Now set up to handle highlighting.
        var highlightController = new WorldWind.HighlightController(wwd);
    });