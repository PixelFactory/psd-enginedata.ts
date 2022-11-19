import NodeValue from './NodeValue';

export default interface NodeDataInterface {
  [key: string]: NodeDataInterface | NodeValue
}
