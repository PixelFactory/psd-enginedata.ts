import Parser from '../Parser';
import TextInterface from '../../Text/TextInterface';

export default class HashEndParser extends Parser {
  // eslint-disable-next-line class-methods-use-this
  expression(): RegExp {
    return /^>>$/;
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  parse(line: TextInterface, matches: Array<string>): void {
    this.node.parentNode();
  }
}
