LearnosityAmd.define(["jquery-v1.10.2"], function ($) {
	const dataCampScriptURL = '//cdn.datacamp.com/dcl-react.js.gz';
	const getDataCampHTML = (extraPreExerciseCode, extraSampleCode) => `
		<div data-datacamp-exercise data-lang="r" data-height="350" data-show-run-button = TRUE>
			<code data-type="pre-exercise-code">
				require(mosaic)
				require(tidyverse)
				require(ggformula)
				require(supernova)
				require(Lock5Data)
				require(Lock5withR)
				Fingers <- supernova::Fingers
				Servers <- supernova::Servers
				Survey <- supernova::Survey
				TipExperiment <- supernova::TipExperiment
				MindsetMatters <- Lock5Data::MindsetMatters
				HappyPlanetIndex <- Lock5Data::HappyPlanetIndex
				${extraPreExerciseCode}
			</code>
			<code data-type="sample-code">    
				${extraSampleCode}
			</code>
			<code data-type="solution">   
			</code>
			<code data-type="sct">  
			</code>
			<div data-type="hint">Try any code you like!</div>
		</div>
	`;

    function DataCampFeature(init) {
		init.$el.html(getDataCampHTML(init.feature.extraPreExerciseCode || '', init.feature.extraSampleCode || ''));
		init.$el.append(dataCampScriptTag);
	    
	    	// only load the DCL script once because double-loading it breaks them
	    	var dclAlreadyLoaded = !!($(`script[src*="${dataCampScriptURL}"]`).length);
	    	console.log('DCL already loaded?', dclAlreadyLoaded);
	    
	    	if (dclAlreadyLoaded) {
			init.events.trigger('ready');
		} else {
			return $.ajax({
				dataType: 'script',
				cache: true,
				url: dataCampScriptURL
			}).done(function(script) {
				console.log('Loaded DataCamp script', script);
				init.events.trigger('ready');
			});
		}
    }

    return { Feature: DataCampFeature };
});
