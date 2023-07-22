export const parentNodeSymbol = Symbol.for('ParentNode')

export interface INode {
	[parentNodeSymbol]: INode | null
}
