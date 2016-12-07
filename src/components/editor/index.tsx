import * as React from 'react';
// import { Editor } from './editor';
// let styles = require('./style.css');

export interface State {

}

export interface Props {
  html: any;
  maxLength: number;
  placeHolder: string;
  onKeyDown?: (event) => void;
  onInput?: (element) => void;
  onPaste?: (event) => void;
}

export class ContentEditable extends React.Component<Props, State> {
  public refs: {
    [key: string]: (Element);
    editor: (HTMLElement);
  };

  constructor(props: any) {
    super(props);

    this.onKeyDown = this.onKeyDown.bind(this);
    this.onInput = this.onInput.bind(this);
    this.onPaste = this.onPaste.bind(this);
  }

  public render(): JSX.Element {
    const { maxLength, placeHolder, html } = this.props;
    return (
        <div
            ref='editor'
            maxLength={maxLength}
            data-placeholder={placeHolder}
            onKeyDown={this.onKeyDown}
            onInput={this.onInput}
            onPaste={this.onPaste}
            contentEditable={true}>
          {html}
        </div>
    );
  }

  private onKeyDown(e): void {
    const { onKeyDown } = this.props;
    if (onKeyDown) {
      onKeyDown(e);
    }
  }

  private onInput(): void {
    const { onInput } = this.props;
    if (onInput) {
      // onInput(new Editor(R.clone(this.refs.editor)));
    }
  }

  private onPaste(e): void {
    const { onPaste } = this.props;
    // Заменяет текст при вставке
    // cancel paste
    e.preventDefault();
    // get text representation of clipboard
    let text = e.clipboardData.getData('text/plain');
    // insert text manually
    document.execCommand('insertHTML', false, text);
    if (onPaste) {
      // onPaste();
    }
  }
}
