import ParserInterface from './ParserInterface';
import NodeInterface from '../Node/NodeInterface';
import TextInterface from '../Text/TextInterface';
import Text from '../Text/Text';

export default abstract class Parser implements ParserInterface {
  static hashName: string | undefined;

  protected node: NodeInterface;

  constructor(node: NodeInterface) {
    this.node = node;
  }

  abstract expression(): RegExp;
  abstract parse(line: TextInterface, matches: Array<string>): void;

  startParsing(line: TextInterface): boolean {
    const matches = (this.matchBinaryData() ? line.getHex() : line.getString())
      .trim()
      .match(this.expression());

    if (matches !== null) {
      this.parse(line, matches);
      return true;
    }

    return false;
  }

  // eslint-disable-next-line class-methods-use-this
  protected matchBinaryData(): boolean {
    return false;
  }

  // eslint-disable-next-line class-methods-use-this
  protected buildText(text: Uint8Array | string): TextInterface {
    return (new Text()).setText(text);
  }
}
