import {IData} from './IData'

/**
 * Конструктор экземпляра данных.
 */
export interface IDataConstructor<D extends IData> {
	new(...parameters: any[]): D
}
