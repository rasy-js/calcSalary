/* jshint esversion: 6 */

// Класс представляет расчет зарплаты преподавателя
// `time_pair` - время пары в минутах
// `days` - кол-во занятий в неделю
// `byn_rate` - ставка в рублях
// `dollar_rate` - курс долара
// `costs` - издержки

class CalcSalary {
	constructor (time_pair,days,byn_rate,dollar_rate,costs) {
		this.time_pair = time_pair;
		this.byn_rate = byn_rate;
		this.dollar_rate = dollar_rate;
		this.days_per_week = days;
		this.hours_course = 0;
		this.number_of_months = 0;
		this.days_of_course = 0;
		this.net_salary = 0;
		this.costs = costs;
		this.n = 0;
	}
	// устанавливает общее кол-во часов в курсе
	setPairs (num_of_pairs, hours_course) {
		this.hours_course = hours_course || (this.time_pair * num_of_pairs) / 60;
		return this.prettyLog( `Кол-во часов в курсе - ${this.hours_course}` );
	}
	// рассчитывает кол-во месяцев в курсе
	calcNumberOfMonths () {
		this.number_of_months = this.hours_course / ( this.time_pair * this.days_per_week * 4 );
		return this.prettyLog( `Кол-во месяцев в курсе - ${this.number_of_months * 60}` );
	}
	// рассчитывает кол-во дней в курсе
	calcDaysOfCourse () {
		// цифра `4` означает кол-во недель
		this.days_of_course = this.days_per_week * 4 * (this.number_of_months * 60);
		return this.prettyLog( `Кол-во дней в курсе - ${this.days_of_course}` );
	}
	// рассчитывает заработную плату
	calcNetSalary () {
		this.net_salary = this.hours_course * this.byn_rate;
		return this.prettyLog( `Зарплата чистыми - ${this.net_salary} byn или ${this.toDollars( this.net_salary )}` );
	}
	// конвертирует рубли в доллары
	toDollars(v) {
		return v / this.dollar_rate + '$';
	}
	// красивый вывод строки
	prettyLog(str) {
		this.n += 1;
		var s = '-'.repeat( str.length + String(this.n).length + 4 );
		return console.log( `${s}\n ${this.n}. ${str}\n${s}` );
	}
	// рассчитывает издержки
	calcCost () {
		for (let cost in this.costs) {
			let n = this.costs[cost];
			this.prettyLog( `Издержка ${cost} сумма издержки ${n}byn` );
		}
		const sum = Object.values( this.costs ).reduce( (x,y) => x + y );

		this.prettyLog( `Сумма издержок в день ${sum}byn или ${this.toDollars( sum )}` );
		this.prettyLog( `Сумма издержек за время курса ${( sum * this.days_of_course )}byn или ${this.toDollars(sum * this.days_of_course )}` );

		return sum;
	}
	// рассчитывает зарплату с издержками
	calcSalaryWithCost () {
		const salary_cost = this.net_salary - ( this.days_of_course * this.calcCost() );
		return this.prettyLog( `Зарплата с издержками - ${salary_cost}byn или ${this.toDollars( salary_cost )}` );
	}

}

const salary = new CalcSalary( 120, 4, 20, 2.0, { 'ticket': 12, 'eating': 5 } );
salary.setPairs( 24 );
salary.calcNumberOfMonths();
salary.calcDaysOfCourse();
salary.calcNetSalary();
salary.calcSalaryWithCost();