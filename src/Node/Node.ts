import NodeInterface from './NodeInterface';
import NodeValue from './NodeValue';
import NodeDataInterface from './NodeDataInterface';

export default class Node implements NodeInterface {
  protected data: NodeDataInterface = {};

  protected path: Array<string> = [];

  getNode(): NodeDataInterface {
    return this.data;
  }

  setValue(key: string, value: string | number | boolean): void {
    this.setNodeData(value, key);
  }

  public addValue(value: string | number | boolean): void {
    this.setNodeData(value);
  }

  public addNode(key: string | undefined): void {
    const node = this.getNodeByPath();

    if (typeof key === 'undefined') {
      // eslint-disable-next-line no-param-reassign
      key = this.generateUniqueNodeKey(node);
    }

    node[key] = {};
    this.path.push(key);
  }

  public parentNode(): void {
    this.path.pop();
  }

  protected setNodeData(value: string | number | boolean, key: string | undefined = undefined): void {
    const node = this.getNodeByPath();
    const data = this.validateValue(value);

    if (typeof key === 'undefined') {
      // eslint-disable-next-line no-param-reassign
      key = this.generateUniqueNodeKey(node);
    }

    if (typeof node[key] !== 'undefined') {
      throw new Error(`Duplicate key: "${key}"`);
    }

    node[key] = data;
  }

  // eslint-disable-next-line class-methods-use-this
  protected generateUniqueNodeKey(node: NodeDataInterface): string {
    return String(Math.max(...Object.keys(node).map(Number.parseFloat).filter(Number.isInteger), -1) + 1);
  }

  // eslint-disable-next-line class-methods-use-this
  protected validateValue(value: NodeValue): NodeValue {
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      return value;
    }

    throw new Error('Node supported only scalar types.');
  }

  protected getNodeByPath(): NodeDataInterface {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let temp: any = this.data;

    this.path.forEach((key: string) => {
      temp = temp[key];
    });

    return temp;
  }
}
