import Parser from '../Parser';
import TextInterface from '../../Text/TextInterface';

export default class MultiLineArrayEndParser extends Parser {
  // eslint-disable-next-line class-methods-use-this
  expression(): RegExp {
    // eslint-disable-next-line no-useless-escape
    return /^\]$/;
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  parse(line: TextInterface, matches: Array<string>): void {
    this.node.parentNode();
  }
}
