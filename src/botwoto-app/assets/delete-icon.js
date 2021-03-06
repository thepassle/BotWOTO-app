import { LitElement, html } from '@polymer/lit-element/';

import '@polymer/paper-tooltip/paper-tooltip.js';

class DeleteIcon extends LitElement {
	static get properties() {
		return {
			width: Number,
			height: Number,
			fill: String
		};
	}

	_render({width, height, fill}) {
		return html`<div>
				<svg style="fill:${fill}; width:${width}px;height:${height}px;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10.671154 12l-3.39594-3.39594c-.366952-.366951-.366952-.961896 0-1.328847.36695-.36695.961895-.36695 1.328845 0L12 10.671153l3.39594-3.39594c.366951-.36695.961896-.36695 1.328847 0 .36695.36695.36695.961896 0 1.328846L13.328847 12l3.39594 3.39594c.36695.366951.36695.961896 0 1.328847-.36695.36695-.961896.36695-1.328846 0L12 13.328847l-3.39594 3.39594c-.366951.36695-.961896.36695-1.328847 0-.36695-.36695-.36695-.961896 0-1.328846L10.671153 12z"/></svg>
				<paper-tooltip animation-delay="0" offset="0">delete</paper-tooltip>
			</div>
			`;
	}
}

customElements.define('delete-icon', DeleteIcon);