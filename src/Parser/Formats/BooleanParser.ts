import Parser from '../Parser';
import TextInterface from '../../Text/TextInterface';

export default class BooleanParser extends Parser {
  // eslint-disable-next-line class-methods-use-this
  expression(): RegExp {
    return /^([A-Z0-9]+) (true|false)$/i;
  }

  // eslint-disable-next-line class-methods-use-this
  parse(line: TextInterface, matches: Array<string>): void {
    const name = matches[1];
    const value = matches[2] === 'true';

    this.node.setValue(name, value);
  }
}
