import TextInterface from '../Text/TextInterface';

export default interface ParserInterface {
  expression(): RegExp;
  startParsing(line: TextInterface): boolean;
}
