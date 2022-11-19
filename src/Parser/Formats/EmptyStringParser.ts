import Parser from '../Parser';
import TextInterface from '../../Text/TextInterface';

export default class EmptyStringParser extends Parser {
  // eslint-disable-next-line class-methods-use-this
  public expression(): RegExp {
    return /^$/i;
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  parse(line: TextInterface, matches: Array<string>): void {
  }
}
