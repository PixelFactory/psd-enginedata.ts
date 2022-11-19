import NodeInterface from '../Node/NodeInterface';
import LineParserInterface from './LineParserInterface';
import ParserInterface from '../Parser/ParserInterface';
import TextInterface from '../Text/TextInterface';

export default class LineParser implements LineParserInterface {
  protected parsers: Array<ParserInterface>;

  constructor(parsers: ParserInterface[]) {
    this.parsers = parsers;
  }

  public parse(node: NodeInterface, line: TextInterface): boolean {
    for (let i = 0; i < this.parsers.length; i += 1) {
      if (this.parsers[i].startParsing(line)) {
        return true;
      }
    }

    throw new Error('Parser not found.');
  }
}
