LearnosityAmd.define(["jquery-v1.10.2"], function ($) {
	const dataCampScriptTag = `<script type="text/javascript" src="//cdn.datacamp.com/dcl-react.js.gz"></script>`;
	const dataCampHTML = `
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
			</code>
			<code data-type="sample-code">    
			</code>
			<code data-type="solution">   
			</code>
			<code data-type="sct">  
			</code>
			<div data-type="hint">Try any code you like!</div>
		</div>
	`;

    function DataCampFeature(init) {
		init.$el.html(dataCampHTML);
		init.$el.append(dataCampScriptTag);

		init.events.trigger('ready');
    }

    return { Feature: DataCampFeature };
});
