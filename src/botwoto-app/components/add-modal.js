import { LitElement, html } from '@polymer/lit-element/';

import '@vaadin/vaadin-button/vaadin-button.js';
import '@vaadin/vaadin-text-field/vaadin-text-field.js';
import '@vaadin/vaadin-text-field/vaadin-text-area.js';

import { SharedStyles } from './../styles/SharedStyles';
import { ModalStyles } from './../styles/ModalStyles';

import { closeModal } from '../../actions/modal';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store.js';

import { addCommand } from '../../actions/commands.js';
import { addCommandError } from '../../actions/commands.js';

import './../assets/delete-icon';
import './../assets/edit-icon';

class AddModal extends connect(store)(LitElement) {

	static get properties() {
		return {
			inputIsValid: Boolean,
			commands: Array
		}
	}

	constructor(){
		super();
		this.inputIsValid = false;
	}

	_validate() {
		let command = this.shadowRoot.getElementById('command').value;
		let clearance = this.shadowRoot.getElementById('clearance').value;
		let reply = this.shadowRoot.getElementById('reply').value;

		let commandRegex = new RegExp("![a-zA-Z0-9]{1,}");
		let clearanceRegex = new RegExp("(^sub$|^mod$|^all$)");
		let replyCheck = reply.length > 0;
		
		this.inputIsValid = commandRegex.test(command) && clearanceRegex.test(clearance) && replyCheck;
	}

	_handleSubmit() {
		let command = this.shadowRoot.getElementById('command').value;
		let clearance = this.shadowRoot.getElementById('clearance').value;
		let reply = this.shadowRoot.getElementById('reply').value;
		
	    let exists = this.commands.filter((item)=>{
	      return item.command === command;
	    });

	    if(exists.length > 0){
    	    store.dispatch(addCommandError({'error': true, 'message':'This command already exists!'}));
	    } else {
			store.dispatch(addCommand({command,clearance,reply}));
	    }
	}

	_render({inputIsValid}) {
		return html`
			${SharedStyles}
			${ModalStyles}

			<div class="modal">
				<h1>Add command</h1>
				<vaadin-text-field on-input="${() => this._validate()}" id="command" required error-message="First character must be an exclamation mark" pattern="![a-zA-Z0-9]{1,}" label="command" value=""></vaadin-text-field>
				<vaadin-text-field on-input="${() => this._validate()}" id="clearance" required error-message="Valid: sub/mod/all" pattern="(^sub$|^mod$|^all$)" label="clearance" value=""></vaadin-text-field>
				<vaadin-text-area on-input="${() => this._validate()}" id="reply" required label="reply" value=""></vaadin-text-area>
			    
			    <div class="buttons">
				    <vaadin-button disabled="${!inputIsValid}" on-tap="${() => this._handleSubmit()}" class="edit" autofocus>
					    <edit-icon slot="prefix" width="20" height="20" fill="white"></edit-icon>
					    Save
					</vaadin-button>
					<vaadin-button on-tap="${() => store.dispatch(closeModal())}" class="delete" dialog-dismiss autofocus>
					    <delete-icon slot="prefix" width="20" height="20" fill="white"></delete-icon>
					    Discard
					</vaadin-button>
				</div>
			</div>
			`
	}

	_stateChanged(state){
		this.commands = state.commands.items;
	}
}

customElements.define('add-modal', AddModal);
