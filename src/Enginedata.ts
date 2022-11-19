import NodeInterface from './Node/NodeInterface';
import LineParserInterface from './LineParser/LineParserInterface';
import Node from './Node/Node';
import LineParser from './LineParser/LineParser';
import BooleanParser from './Parser/Formats/BooleanParser';
import EmptyStringParser from './Parser/Formats/EmptyStringParser';
import HashEndParser from './Parser/Formats/HashEndParser';
import HashNameParser from './Parser/Formats/HashNameParser';
import HashStartParser from './Parser/Formats/HashStartParser';
import MultiLineArrayEndParser from './Parser/Formats/MultiLineArrayEndParser';
import MultiLineArrayStartParser from './Parser/Formats/MultiLineArrayStartParser';
import NumberParser from './Parser/Formats/NumberParser';
import SingleLineArrayParser from './Parser/Formats/SingleLineArrayParser';
import StringParser from './Parser/Formats/StringParser';
import NodeDataInterface from './Node/NodeDataInterface';
import TextInterface from './Text/TextInterface';
import Text from './Text/Text';

export default class Enginedata {
  protected node: NodeInterface;

  protected text: Array<TextInterface>;

  protected lineParser: LineParserInterface;

  constructor(text: Uint8Array) {
    this.node = this.buildNode();
    this.lineParser = this.buildLineParser();

    const textData = this.buildText(text);

    if (textData.getText().length === 0) {
      throw new Error('Text is empty');
    }

    /**
     * Chars:
     * 0x0a - \n
     * 0x09 - \t
     * 0x3e - >
     * 0x3c - <
     * 0x5d - ]
     * 0x2f - /
     */
    this.text = textData
      .getHex()
      .replace(/(0x0a_(0x09_)*)0x3e_0x3e/g, '$10x3e_0x3e_0x3e')
      .replace(/(0x0a_(0x09_)*)0x3c_0x3c/g, '$10x3c_0x3c_0x3c')
      .replace(/(0x0a_(0x09)*)0x5d/g, '$10x5d_0x5d')
      .split(/0x0a_(?:0x09_)*(?:0x3e|0x3c|0x5d|0x2f)/g)
      .map((line: string) => this.buildText(line));
  }

  // eslint-disable-next-line class-methods-use-this
  protected buildText(text: Uint8Array | string): TextInterface {
    return (new Text()).setText(text);
  }

  // eslint-disable-next-line class-methods-use-this
  protected buildNode(): NodeInterface {
    return new Node();
  }

  protected buildLineParser(): LineParserInterface {
    return new LineParser([
      new BooleanParser(this.node),
      new EmptyStringParser(this.node),
      new HashEndParser(this.node),
      new HashNameParser(this.node),
      new HashStartParser(this.node),
      new MultiLineArrayEndParser(this.node),
      new MultiLineArrayStartParser(this.node),
      new NumberParser(this.node),
      new SingleLineArrayParser(this.node),
      new StringParser(this.node),
    ]);
  }

  public parse(): NodeDataInterface {
    this.text.forEach((line: TextInterface, lineNumber: number) => {
      this.parseLine(line, lineNumber + 1);
    });

    return this.getNode();
  }

  protected parseLine(line: TextInterface, lineNumber: number): void {
    try {
      this.lineParser.parse(this.node, line);
    } catch (e) {
      throw new Error(`${(e as Error).message} Line: ${lineNumber}`);
    }
  }

  result(): NodeDataInterface {
    return this.getNode();
  }

  getNode(): NodeDataInterface {
    return this.node.getNode();
  }
}
