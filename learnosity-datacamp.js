LearnosityAmd.define(["jquery-v1.10.2"], function ($) {
	const dataCampScriptURL = '//cdn.jsdelivr.net/gh/UCLATALL/datacamp-light@build/dist/dcl-react.js';
	const getDataCampHTML = (extraPreExerciseCode, extraSampleCode) => `
		<div data-datacamp-exercise data-lang="r" data-height="350" data-show-run-button="true" data-show-solution-before="false" data-no-lazy-load="true">
			<code data-type="pre-exercise-code">
				require(tidyverse)
	            require(readr)
	            require(mosaic)
	            require(Lock5withR)
	            require(fivethirtyeight)
	            require(okcupiddata)
	            require(supernova)

	            Fingers <- supernova::Fingers
	            Servers <- supernova::Servers
	            Survey <- supernova::Survey
	            TipExperiment <- supernova::TipExperiment
	            MindsetMatters <- Lock5Data::MindsetMatters
	            HappyPlanetIndex <- Lock5Data::HappyPlanetIndex
	            candy_rankings <- fivethirtyeight::candy_rankings %>%
	                mutate(nutty = peanutyalmondy, sugarpercent = sugarpercent * 100) %>%
	                select(competitorname, winpercent, chocolate, fruity, nutty, hard, bar, sugarpercent, pricepercent)
	            selfies <- read_csv("https://docs.google.com/spreadsheets/d/1jqMg3-L4Z5bK5FCjCC2rv6Za4qzM5nq_Yn6k_rJmZ6M/export?format=csv")
				${extraPreExerciseCode}
			</code>
			<code data-type="sample-code">
				${extraSampleCode}
			</code>
			<code data-type="solution">
			</code>
			<code data-type="sct">
			</code>
			<div data-type="hint">All code you have used in class should work here as well.</div>
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
