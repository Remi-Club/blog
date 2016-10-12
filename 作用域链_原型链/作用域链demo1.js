//对name的访问, 那种效率更高
var name = '张三';

function hello() {
	console.log(name);
	console.log(window.name);
	console.log(this.name);
}
hello();