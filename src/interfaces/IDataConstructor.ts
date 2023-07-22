import {IData} from './IData'

export interface IDataConstructor<D extends IData> {
	new(...parameters: any[]): D
}
