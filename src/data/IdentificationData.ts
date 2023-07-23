import {Data} from '../classes/Data'

interface IIdentification {
	id?: number
	name?: string
	type?: string
}

export const byId = (searchId: number) => ({id}: IdentificationData) => id === searchId
export const byType = (searchType: string) => ({type}: IdentificationData) => type === searchType
export const byName = (searchName: string) => ({name}: IdentificationData) => name === searchName

export class IdentificationData extends Data {
	public get id() {return this.identification.id}
	public get name() {return this.identification.name}
	public get type() {return this.identification.type}

	public constructor(private identification: IIdentification) {
		super()
	}
}
