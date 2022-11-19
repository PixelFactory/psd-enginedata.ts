import NodeInterface from '../Node/NodeInterface';
import TextInterface from '../Text/TextInterface';

export default interface LineParserInterface {
  parse(node: NodeInterface, line: TextInterface): boolean;
}
