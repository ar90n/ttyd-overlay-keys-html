import { h, Component } from 'preact';
import { Xterm } from '../terminal/xterm';
import './keyboard-overlay.scss';

interface Props {
  terminal: Xterm;
  show: boolean;
  onToggle: () => void;
}

interface State {
  fontSize: number;
}

export class KeyboardOverlay extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const terminal = props.terminal?.getTerminal();
    this.state = {
      fontSize: terminal?.options?.fontSize || 13,
    };
  }

  private sendKey = (sequence: string) => {
    const { terminal } = this.props;
    if (terminal) {
      terminal.sendData(sequence);
    }
  };

  private adjustFontSize = (delta: number) => {
    const { terminal } = this.props;
    const term = terminal?.getTerminal();
    if (term) {
      const currentSize = term.options.fontSize || 13;
      const newSize = Math.max(10, Math.min(24, currentSize + delta));
      term.options.fontSize = newSize;
      this.setState({ fontSize: newSize });

      // Store preference in localStorage
      try {
        localStorage.setItem('ttyd-font-size', newSize.toString());
      } catch (e) {
        // Ignore localStorage errors
      }
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
          <button
            class="keyboard-overlay__button keyboard-overlay__button--font"
            onClick={() => this.adjustFontSize(-1)}
            title="Decrease font size"
          >
            A-
          </button>
          <button
            class="keyboard-overlay__button keyboard-overlay__button--font"
            onClick={() => this.adjustFontSize(1)}
            title="Increase font size"
          >
            A+
          </button>
        </div>
      </div>
    );
  }
}
