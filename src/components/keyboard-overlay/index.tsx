import { h, Component } from 'preact';
import { Xterm } from '../terminal/xterm';
import './keyboard-overlay.scss';

interface Props {
  terminal: Xterm;
  show: boolean;
  onToggle: () => void;
}

export class KeyboardOverlay extends Component<Props> {
  private sendKey = (sequence: string) => {
    const { terminal } = this.props;
    if (terminal) {
      terminal.sendData(sequence);
    }
  };

  render() {
    const { show } = this.props;

    if (!show) {
      return null;
    }

    return (
      <div class="keyboard-overlay">
        <div class="keyboard-overlay__buttons">
          <button
            class="keyboard-overlay__button"
            onClick={() => this.sendKey('\x1b[Z')}
            title="Shift+Tab"
          >
            ⇧ Tab
          </button>
          <button
            class="keyboard-overlay__button"
            onClick={() => this.sendKey('\x1b')}
            title="Escape"
          >
            Esc
          </button>
          <button
            class="keyboard-overlay__button"
            onClick={() => this.sendKey('\x1b[A')}
            title="Up Arrow"
          >
            ↑
          </button>
          <button
            class="keyboard-overlay__button"
            onClick={() => this.sendKey('\x1b[B')}
            title="Down Arrow"
          >
            ↓
          </button>
        </div>
      </div>
    );
  }
}
