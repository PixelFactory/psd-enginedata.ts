import Parser from './Parser';

export default abstract class NumbersParser extends Parser {
  // eslint-disable-next-line class-methods-use-this
  convertToNumber(num: string): number {
    const dot = num.indexOf('.');

    if (dot === 0) {
      // Format .XX
      return Number(`0${num}`);
    }

    // Format XX.XX or -XX.XX or XX or -XX
    return Number(num);
  }
}
