import { bind } from 'decko';
import { Component, h } from 'preact';
import { Xterm, XtermOptions } from './xterm';
import { KeyboardOverlay } from '../keyboard-overlay';

import '@xterm/xterm/css/xterm.css';
import { Modal } from '../modal';

interface Props extends XtermOptions {
  id: string;
}

interface State {
  modal: boolean;
  showKeyboard: boolean;
}

export class Terminal extends Component<Props, State> {
  private container: HTMLElement;
  private xterm: Xterm;

  constructor(props: Props) {
    super();
    this.xterm = new Xterm(props, this.showModal);
    this.state = {
      modal: false,
      showKeyboard: false,
    };
  }

  public getTerminal() {
    return this.xterm;
  }

  async componentDidMount() {
    await this.xterm.refreshToken();
    this.xterm.open(this.container);
    this.xterm.connect();
  }

  componentWillUnmount() {
    this.xterm.dispose();
  }

  render({ id }: Props, { modal, showKeyboard }: State) {
    return (
      <div style="position: relative; height: 100%;">
        <div id={id} ref={(c) => (this.container = c as HTMLElement)}>
          <Modal show={modal}>
            <label class="file-label">
              <input
                onChange={this.sendFile}
                class="file-input"
                type="file"
                multiple
              />
              <span class="file-cta">Choose files…</span>
            </label>
          </Modal>
        </div>
        <KeyboardOverlay
          terminal={this.xterm}
          show={showKeyboard}
          onToggle={this.toggleKeyboard}
        />
        <button
          class={`keyboard-toggle ${showKeyboard ? 'keyboard-toggle--active' : ''}`}
          onClick={this.toggleKeyboard}
          title="Toggle keyboard overlay"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 5H4c-1.1 0-1.99.9-1.99 2L2 17c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-9 3h2v2h-2V8zm0 3h2v2h-2v-2zM8 8h2v2H8V8zm0 3h2v2H8v-2zm-1 2H5v-2h2v2zm0-3H5V8h2v2zm9 7H8v-2h8v2zm0-4h-2v-2h2v2zm0-3h-2V8h2v2zm3 3h-2v-2h2v2zm0-3h-2V8h2v2z" />
          </svg>
        </button>
      </div>
    );
  }

  @bind
  showModal() {
    this.setState({ modal: true });
  }

  @bind
  toggleKeyboard() {
    this.setState((prevState) => ({ showKeyboard: !prevState.showKeyboard }));
  }

  @bind
  sendFile(event: Event) {
    this.setState({ modal: false });
    const files = (event.target as HTMLInputElement).files;
    if (files) this.xterm.sendFile(files);
  }
}
