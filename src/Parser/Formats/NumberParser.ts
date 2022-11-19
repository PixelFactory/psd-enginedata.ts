import NumbersParser from '../NumbersParser';
import TextInterface from '../../Text/TextInterface';

export default class NumberParser extends NumbersParser {
  // eslint-disable-next-line class-methods-use-this
  expression(): RegExp {
    // eslint-disable-next-line no-useless-escape
    return /^([A-Z0-9]+) ((-?\d+)|\.(\d+)|(-?\d+)\.(\d+))$/i;
  }

  parse(line: TextInterface, matches: Array<string>): void {
    const name = matches[1];
    const number = this.convertToNumber(matches[2]);

    this.node.setValue(name, number);
  }
}
