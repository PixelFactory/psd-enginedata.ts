import NodeDataInterface from './NodeDataInterface';

export default interface NodeInterface {
  getNode(): NodeDataInterface;
  setValue(key: string, value: string | number | boolean): void;
  addValue(value: number): void;
  addNode(key: string | undefined): void;
  parentNode(): void;
}
