import Parser from '../Parser';
import TextInterface from '../../Text/TextInterface';

export default class MultiLineArrayStartParser extends Parser {
  // eslint-disable-next-line class-methods-use-this
  public expression(): RegExp {
    // eslint-disable-next-line no-useless-escape
    return /^([A-Z0-9]+) \[$/i;
  }

  // eslint-disable-next-line class-methods-use-this
  parse(line: TextInterface, matches: Array<string>): void {
    const name = matches[1];

    this.node.addNode(name);
  }
}
