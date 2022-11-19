export default interface TextInterface {
  getText(): Uint8Array;
  getArray(): Array<number>;
  getString(): string;
  getHex(): string;
}
