import { decode as iconvDecode } from 'iconv-lite';
import Parser from '../Parser';
import TextInterface from '../../Text/TextInterface';

export default class StringParser extends Parser {
  // eslint-disable-next-line class-methods-use-this
  protected matchBinaryData(): boolean {
    return true;
  }

  // eslint-disable-next-line class-methods-use-this
  expression(): RegExp {
    /**
     * Find start line chars from hex buffer:
     * 0x20_0x28_0xfe_0xff(.*)0x29 === " \(\xFE\xFF(.*)\)"
     * Example string:
     * "/Text (??Some text)"
     */
    return /^([0-9a-z_]+)0x20_0x28_0xfe_0xff(.*)0x29$/i;
  }

  parse(line: TextInterface, matches: Array<string>): void {
    const name = this.buildText(matches[1]).getString();
    const stringU16 = this.buildText(matches[2]);

    // Convert sting
    const stringU8 = iconvDecode(stringU16.getArray() as never, 'utf-16be');

    let str = '';

    if (this.isValidUnicodeString(stringU8) && this.isIconvStatusOk(stringU8)) {
      str = stringU8;
    } else {
      str = stringU16.toString().replace(/(?<=^(?:.{2})+)(?!$)/g, ' 0x').trim();
    }

    this.node.setValue(name, str.trim());
  }

  /**
   * Validate unicode string. Find 'Cn' (Other, not assigned) symbols.
   * Example:
   * const mouseEmoji = [0xD8, 0x3D, 0xDC, 0x01];
   * const randomData = [0xAA, 0xFF];
   * const mouseOnly = iconvDecode(Buffer.from(mouseEmoji), 'utf-16be');
   * const allData = iconvDecode(Buffer.from([...mouseEmoji, ...randomData]), 'utf-16be');
   *
   * console.log(/\p{Cn}/gu.test(mouseOnly) ? 'Bad' : 'Good'); // Good
   * console.log(/\p{Cn}/gu.test(allData) ? 'Bad' : 'Good');   // Bad
   * );
   */
  // eslint-disable-next-line class-methods-use-this
  protected isValidUnicodeString(stringU8: string): boolean {
    return !(/\p{Cn}/gu.test(stringU8));
  }

  /**
   * Check iconv parse status. Find error char.
   */
  // eslint-disable-next-line class-methods-use-this
  protected isIconvStatusOk(stringU8: string): boolean {
    return !(/\uFFFD/ug.test(stringU8));
  }
}
