Реализация Entity и Component из паттерна ECS
=============================================

Концепция хранилища
-------------------

Хранилище представляет из себя дерево игровых сущностей и данных.  
Сущностью может содержать игровые данные и/или дочерние сущности.  
Данные это по сути листья данного дерева.  
У дерева есть один корневой узел. Это может быть например World.  

Ограничения
-----------

Данные являются немутабельными и поэтому их поля должны быть readonly.  
Данные не могут быть массивом Array.  
Корневая сущность обязательно должна иметь MessageEmitterData.

Сообщения
---------

Сообщения генерируются только для данных. Например "Созданы такие-то данные".

Сообщения о создании и удалении сущностей генерировать нет смысла. 
Например какой смысл о создании пустой сущности?
И где собственно граница сущности? С точки зрения системы сущность это набор данных, 
где количество данных ничем не ограничено. Иными словами сущность постоянно меняется.

Ссылки
------

В данном проекте впервые реализована система расширений от TypeScript (аналог partial class из языка C#):  
https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
