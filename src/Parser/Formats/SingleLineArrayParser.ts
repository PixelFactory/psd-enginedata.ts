import NumbersParser from '../NumbersParser';
import TextInterface from '../../Text/TextInterface';

export default class SingleLineArrayParser extends NumbersParser {
  // eslint-disable-next-line class-methods-use-this
  expression(): RegExp {
    // eslint-disable-next-line no-useless-escape
    return /^([A-Z0-9]+) \[(.*)\]$/i;
  }

  parse(line: TextInterface, matches: Array<string>): void {
    const name = matches[1];
    const values = (matches[2]).trim().split(' ');

    this.node.addNode(name);

    values.forEach((num: string) => {
      this.node.addValue(this.convertToNumber(num));
    });

    this.node.parentNode();
  }
}
