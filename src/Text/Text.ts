import TextInterface from './TextInterface';

export default class Text implements TextInterface {
  protected text: Uint8Array | undefined;

  setText(text: Uint8Array | string): TextInterface {
    if (typeof text === 'string') {
      // eslint-disable-next-line no-param-reassign
      text = this.hexToUint8Array(text);
    }

    this.text = text;

    return this;
  }

  getText(): Uint8Array {
    if (typeof this.text === 'undefined') {
      throw new Error('Text is undefined.');
    }

    return this.text;
  }

  getArray(): Array<number> {
    return [].slice.call(this.text);
  }

  getString(): string {
    return String.fromCharCode(...this.getArray());
  }

  getHex(): string {
    /**
     * Join hex string by pair.
     * Example:
     * AABBCC => AA_BB_CC
     * Because we can find text what have split part:
     * 09 00 A2 FF => 09 0 [SPLIT 0A2F] F
     */
    return this
      .getArray()
      .map((char: number) => `0x${char.toString(16).padStart(2, '0')}`)
      .join('_');
  }

  // eslint-disable-next-line class-methods-use-this
  protected hexToUint8Array(hex: string): Uint8Array {
    const arrayLine = hex.split('_').reduce((data: number[], char: string) => {
      if (char !== '') {
        const charNumber = Number(char);

        if (Number.isNaN(charNumber)) {
          throw new Error('Wrong hex data');
        }

        data.push(charNumber);
      }

      return data;
    }, [] as number[]);

    return new Uint8Array(arrayLine);
  }
}
