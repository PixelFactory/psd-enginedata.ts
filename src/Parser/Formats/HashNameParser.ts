import Parser from '../Parser';
import TextInterface from '../../Text/TextInterface';

export default class HashNameParser extends Parser {
  // eslint-disable-next-line class-methods-use-this
  expression(): RegExp {
    return /^([A-Z0-9]+)$/i;
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  parse(line: TextInterface, matches: Array<string>): void {
    Parser.hashName = line.toString().trim();
  }
}
