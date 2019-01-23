LearnosityAmd.define(["jquery-v1.10.2"], function ($) {
	const dataCampScriptURL = '//cdn.jsdelivr.net/gh/UCLATALL/datacamp-light@build/dist/dcl-react.js.gz';
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
	
	// lock to make sure we don't start loading the script from multiple instances at the same time
	let loadingDCLScript = false;

	function DataCampFeature(init) {
		init.$el.html(getDataCampHTML(init.feature.extraPreExerciseCode || '', init.feature.extraSampleCode || ''));

		// only load the DCL script once, because double-loading it breaks them
		// we check for the global initAddedDCLightExercises function to determine if DCL is already loaded
		let dclAlreadyLoaded = (typeof window.initAddedDCLightExercises === 'function');

		if (dclAlreadyLoaded) {
			// DCL already loaded, so just initialize the new exercises added
			window.initAddedDCLightExercises();
			init.events.trigger('ready');
		} else if (loadingDCLScript) {
			// somebody else is grabbing DCL, we can just chill
			init.events.trigger('ready');
		} else {
			// fetch the script if we're not already doing so (and lock so other instances don't try also)
			loadingDCLScript = true;

			// caching is A-OK with us - we only _want_ to load the script once anyway
			return $.ajax({
					dataType: 'script',
					cache: true,
					url: dataCampScriptURL,
					success: function() {
						console.log('Loaded DataCamp Light script sucessfully!');
						init.events.trigger('ready');
					},
					error: function(jqXHR, textStatus, errorThrown) {
						console.log('Error loading DataCamp Light script: ', textStatus, errorThrown);
					},
					complete: function() {
						// whether we succeeded or failed, we're not trying anymore
						loadingDCLScript = false;
					}
				});
		}
		
	}

	return { Feature: DataCampFeature };
});
