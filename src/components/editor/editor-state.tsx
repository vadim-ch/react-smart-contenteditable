export class Editor {
  private value: string;
  private plainValue: string;

  constructor(value: any, plainValue: string) {
    this.value = value;
    this.plainValue = plainValue;
  }

  // public init(editor: any): void {
  //   this.editor = editor;
  // }
  //
  // public focus(): void {
  //   this.editor.focus();
  // }

  // public getEditor(): HTMLElement {
  //   return this.editor;
  // }

  public getValue(): string {
    return this.value;
  }

  public getPlainValue(): string {
    return this.plainValue;
  }

  public replaceValue(oldValue: string, value: string): void {

  }

  public setValue(value: string): void {

  }

  public modifyValue(value: Node | string, line?: number): void {

  }

  // public addSpace(): void {
  //   this.addNode(document.createTextNode(' '));
  // }

  // public clearValue(): void {
  //   this.editor.innerHTML = '';
  // }

  // public lineTransfer(): void {
  //   this.editor.normalize();
  //   const selection = window.getSelection();
  //   const range = selection.getRangeAt(0);
  //   const lineBreak = (range.endOffset === this.editor.innerHTML.length) ? '\n\n' : '\n';
  //   const br = document.createTextNode('\n');
  //   const textNode = document.createTextNode(' ');
  //   range.deleteContents();
  //   range.insertNode(br);
  //   range.collapse(false);
  //   range.insertNode(textNode);
  //   range.selectNodeContents(textNode);
  //   selection.removeAllRanges();
  //   selection.addRange(range);
  // }

  // public cursorToEnd(): void {
  //   const editor = this.editor;
  //   if (editor) {
  //     editor.focus();
  //     let range = document.createRange();
  //     range.selectNodeContents(editor);
  //     range.collapse(false);
  //     let sel = window.getSelection();
  //     sel.removeAllRanges();
  //     sel.addRange(range);
  //   }
  // }

  public hasTextInEditor(): boolean {
    return this.getPlainValue().trim() !== '';
  }

  // private getCaretPosition(): number {
  //   let caretPos = 0;
  //   const sel = window.getSelection();
  //   if (sel.rangeCount) {
  //     const range = sel.getRangeAt(0);
  //     if (range.commonAncestorContainer.parentNode === this.editor) {
  //       caretPos = range.endOffset;
  //     }
  //   }
  //   return caretPos;
  // }

  private deleteWordAroundCaret(value: string): void {
    // this.editor.focus();
    // this.editor.normalize();
    let selection;
    let word;
    if (window.getSelection && (selection = window.getSelection())['modify']) {
      let selectedRange = selection.getRangeAt(0);
      selection.collapseToStart();
      selection['modify']('move', 'backward', 'word');
      selection['modify']('extend', 'forward', 'word');

      word = selection.toString();
      if (word === value) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
      }

      // Restore selection
      // selection.removeAllRanges();
      // selection.addRange(selectedRange);
    }
  }

  private createSpan(value: string): Node {
    const elem = document.createElement('span');
    elem.innerHTML = value;
    return elem;
  }

  // private addNode(node: Node): void {
  //   this.editor.appendChild(node);
  //   this.cursorToEnd();
  // }
}
