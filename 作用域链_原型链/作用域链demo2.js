var name = '张三';
var age = 30;
var count = 100;

function Man(name, age) {
	var count = 0;
	this.name = name;
	this.age = age;
	this.display = function() {
		count++;
		var func1 = function() {
			console.log('func1:', this.name);
		};
		func1();

		console.log('display:', this.name);
		return count;
	}
}

var man = new Man('李四', 40);
var currentCount = man.display();
console.log('currentCount1:', currentCount);

Man('王五', 50);
currentCount = display();
console.log('currentCount2:', currentCount);

currentCount = man.display();
console.log('currentCount3:', currentCount);

currentCount = display();
console.log('currentCount4:', currentCount);