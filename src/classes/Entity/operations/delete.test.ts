import {Data} from '../../Data'
import {Entity} from '..'

test('delete', () => {
	const entity = new Entity
	const data = new Data

	// console.log(entity)
	// console.log(entity.length)
	// console.log(entity.map(item => item))



	console.dir('- - - - - - - - - - - - - - - - - - - - - - - - - - -')
	entity.push(data)
	console.dir(entity)
	console.dir(entity.length)
	console.dir('- - - - - - - - - - - - - - - - - - - - - - - - - - -')
	entity.delete(data)
	console.dir(entity)
	console.dir(entity.length)

	// expect(entity).toHaveLength(1)
	// entity.delete(data)
	// expect(entity).toHaveLength(0)
})
