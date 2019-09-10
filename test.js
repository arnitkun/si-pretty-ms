import test from 'ava';
import prettyMilliseconds from '.';

test('prettify milliseconds', t => {
	t.is(prettyMilliseconds(0), '0ms');
	t.is(prettyMilliseconds(0.1), '1 ms');
	t.is(prettyMilliseconds(1), '1 ms');
	t.is(prettyMilliseconds(1000 + 400), '1.4 s');
	t.is(prettyMilliseconds((1000 * 2) + 400), '2.4 s');
	t.is(prettyMilliseconds(1000 * 55), '55 s');
	t.is(prettyMilliseconds(1000 * 67), '1 m 7 s');
	t.is(prettyMilliseconds(1000 * 60 * 5), '5 m');
	t.is(prettyMilliseconds(1000 * 60 * 67), '1 h 7 m');
	t.is(prettyMilliseconds(1000 * 60 * 60 * 12), '12 h');
	t.is(prettyMilliseconds(1000 * 60 * 60 * 40), '1 d 16 h');
	t.is(prettyMilliseconds(1000 * 60 * 60 * 999), '41 d 15 h');
	t.is(prettyMilliseconds(1000 * 60 * 60 * 24 * 465), '1 y 100 d');
	t.is(prettyMilliseconds(1000 * 60 * 67 * 24 * 465), '1 y 154 d 6 h');
});

test('have a compact option', t => {
	t.is(prettyMilliseconds(1000 + 4, {compact: true}), '~1 s');
	t.is(prettyMilliseconds(1000 * 60 * 60 * 999, {compact: true}), '~41 d');
	t.is(prettyMilliseconds(1000 * 60 * 60 * 24 * 465, {compact: true}), '~1 y');
	t.is(prettyMilliseconds(1000 * 60 * 67 * 24 * 465, {compact: true}), '~1 y');
});

test('have a unitCount option', t => {
	t.is(prettyMilliseconds(1000 * 60, {unitCount: 0}), '~1 m');
	t.is(prettyMilliseconds(1000 * 60, {unitCount: 1}), '~1 m');
	t.is(prettyMilliseconds(1000 * 60 * 67, {unitCount: 1}), '~1 h');
	t.is(prettyMilliseconds(1000 * 60 * 67, {unitCount: 2}), '~1 h 7 m');
	t.is(prettyMilliseconds(1000 * 60 * 67 * 24 * 465, {unitCount: 1}), '~1 y');
	t.is(prettyMilliseconds(1000 * 60 * 67 * 24 * 465, {unitCount: 2}), '~1 y 154 d');
	t.is(prettyMilliseconds(1000 * 60 * 67 * 24 * 465, {unitCount: 3}), '~1 y 154 d 6 h');
});

test('have a secondsDecimalDigits option', t => {
	t.is(prettyMilliseconds(10000), '10 s');
	t.is(prettyMilliseconds(33333), '33.3 s');
	t.is(prettyMilliseconds(33333, {secondsDecimalDigits: 0}), '33 s');
	t.is(prettyMilliseconds(33333, {secondsDecimalDigits: 4}), '33.3330 s');
});

test('have a millisecondsDecimalDigits option', t => {
	t.is(prettyMilliseconds(33.333), '34 ms');
	t.is(prettyMilliseconds(33.333, {millisecondsDecimalDigits: 0}), '34 ms');
	t.is(prettyMilliseconds(33.333, {millisecondsDecimalDigits: 4}), '33.3330 ms');
});

test('have a keepDecimalsOnWholeSeconds option', t => {
	t.is(prettyMilliseconds(1000 * 33, {secondsDecimalDigits: 2, keepDecimalsOnWholeSeconds: true}), '33.00 s');
	t.is(prettyMilliseconds(1000 * 33.00004, {secondsDecimalDigits: 2, keepDecimalsOnWholeSeconds: true}), '33.00 s');
});

test('have a verbose option', t => {
	const fn = milliseconds => prettyMilliseconds(milliseconds, {verbose: true});

	t.is(fn(0), '0 milliseconds');
	t.is(fn(0.1), '1 millisecond');
	t.is(fn(1), '1 millisecond');
	t.is(fn(1000), '1 second');
	t.is(fn(1000 + 400), '1.4 seconds');
	t.is(fn((1000 * 2) + 400), '2.4 seconds');
	t.is(fn(1000 * 5), '5 seconds');
	t.is(fn(1000 * 55), '55 seconds');
	t.is(fn(1000 * 67), '1 minute 7 seconds');
	t.is(fn(1000 * 60 * 5), '5 minutes');
	t.is(fn(1000 * 60 * 67), '1 hour 7 minutes');
	t.is(fn(1000 * 60 * 60 * 12), '12 hours');
	t.is(fn(1000 * 60 * 60 * 40), '1 day 16 hours');
	t.is(fn(1000 * 60 * 60 * 999), '41 days 15 hours');
	t.is(fn(1000 * 60 * 60 * 24 * 465), '1 year 100 days');
	t.is(fn(1000 * 60 * 67 * 24 * 465), '1 year 154 days 6 hours');
});

test('have a separateMilliseconds option', t => {
	t.is(prettyMilliseconds(1100, {separateMilliseconds: false}), '1.1 s');
	t.is(prettyMilliseconds(1100, {separateMilliseconds: true}), '1 s 100 ms');
});

test('have a formatSubMilliseconds option', t => {
	t.is(prettyMilliseconds(0.400, {formatSubMilliseconds: true}), '400 µs');
	t.is(prettyMilliseconds(0.123571, {formatSubMilliseconds: true}), '123 µs 571 ns');
	t.is(prettyMilliseconds(0.123456789, {formatSubMilliseconds: true}), '123 µs 456 ns');
	t.is(
		prettyMilliseconds((60 * 60 * 1000) + (23 * 1000) + 433 + 0.123456, {
			formatSubMilliseconds: true
		}),
		'1 h 23 s 433 ms 123 µs 456 ns'
	);
});

test('work with verbose and compact options', t => {
	const fn = milliseconds => prettyMilliseconds(milliseconds, {
		verbose: true,
		compact: true
	});

	t.is(fn(1000), '~1 second');
	t.is(fn(1000 + 400), '~1 second');
	t.is(fn((1000 * 2) + 400), '~2 seconds');
	t.is(fn(1000 * 5), '~5 seconds');
	t.is(fn(1000 * 55), '~55 seconds');
	t.is(fn(1000 * 67), '~1 minute');
	t.is(fn(1000 * 60 * 5), '~5 minutes');
	t.is(fn(1000 * 60 * 67), '~1 hour');
	t.is(fn(1000 * 60 * 60 * 12), '~12 hours');
	t.is(fn(1000 * 60 * 60 * 40), '~1 day');
	t.is(fn(1000 * 60 * 60 * 999), '~41 days');
	t.is(fn(1000 * 60 * 60 * 24 * 465), '~1 year');
	t.is(fn(1000 * 60 * 67 * 24 * 750), '~2 years');
});

test('work with verbose and unitCount options', t => {
	t.is(prettyMilliseconds(1000 * 60, {verbose: true, unitCount: 1}), '~1 minute');
	t.is(prettyMilliseconds(1000 * 60 * 67, {verbose: true, unitCount: 1}), '~1 hour');
	t.is(prettyMilliseconds(1000 * 60 * 67, {verbose: true, unitCount: 2}), '~1 hour 7 minutes');
	t.is(prettyMilliseconds(1000 * 60 * 67 * 24 * 465, {verbose: true, unitCount: 1}), '~1 year');
	t.is(prettyMilliseconds(1000 * 60 * 67 * 24 * 465, {verbose: true, unitCount: 2}), '~1 year 154 days');
	t.is(prettyMilliseconds(1000 * 60 * 67 * 24 * 465, {verbose: true, unitCount: 3}), '~1 year 154 days 6 hours');
});

test('work with verbose and secondsDecimalDigits options', t => {
	const fn = milliseconds => prettyMilliseconds(milliseconds, {
		verbose: true,
		secondsDecimalDigits: 4
	});

	t.is(fn(1000), '1 second');
	t.is(fn(1000 + 400), '1.4000 seconds');
	t.is(fn((1000 * 2) + 400), '2.4000 seconds');
	t.is(fn((1000 * 5) + 254), '5.2540 seconds');
	t.is(fn(33333), '33.3330 seconds');
});

test('work with verbose and millisecondsDecimalDigits options', t => {
	const fn = milliseconds => prettyMilliseconds(milliseconds, {
		verbose: true,
		millisecondsDecimalDigits: 4
	});

	t.is(fn(1), '1.0000 millisecond');
	t.is(fn(1 + 0.4), '1.4000 milliseconds');
	t.is(fn((1 * 2) + 0.400), '2.4000 milliseconds');
	t.is(fn((1 * 5) + 0.254), '5.2540 milliseconds');
	t.is(fn(33.333), '33.3330 milliseconds');
});

test('work with verbose and formatSubMilliseconds options', t => {
	t.is(
		prettyMilliseconds(0.4, {formatSubMilliseconds: true, verbose: true}),
		'400 microseconds'
	);
	t.is(
		prettyMilliseconds(0.123571, {
			formatSubMilliseconds: true,
			verbose: true
		}),
		'123 microseconds 571 nanoseconds'
	);
	t.is(
		prettyMilliseconds(0.123456789, {
			formatSubMilliseconds: true,
			verbose: true
		}),
		'123 microseconds 456 nanoseconds'
	);
	t.is(
		prettyMilliseconds(0.001, {formatSubMilliseconds: true, verbose: true}),
		'1 microsecond'
	);
});

test('compact option overrides unitCount option', t => {
	t.is(prettyMilliseconds(1000 * 60 * 67 * 24 * 465, {verbose: true, compact: true, unitCount: 1}), '~1 year');
	t.is(prettyMilliseconds(1000 * 60 * 67 * 24 * 465, {verbose: true, compact: true, unitCount: 2}), '~1 year');
	t.is(prettyMilliseconds(1000 * 60 * 67 * 24 * 465, {verbose: true, compact: true, unitCount: 3}), '~1 year');
});

test('work with separateMilliseconds and formatSubMilliseconds options', t => {
	t.is(
		prettyMilliseconds(1010.340067, {
			separateMilliseconds: true,
			formatSubMilliseconds: true
		}),
		'1 s 10 ms 340 µs 67 ns'
	);
	t.is(
		prettyMilliseconds((60 * 1000) + 34 + 0.000005, {
			separateMilliseconds: true,
			formatSubMilliseconds: true
		}),
		'1 m 34 ms 5 ns'
	);
});

test('throw on invalid', t => {
	t.throws(() => {
		prettyMilliseconds('foo');
	});

	t.throws(() => {
		prettyMilliseconds(NaN);
	});

	t.throws(() => {
		prettyMilliseconds(Infinity);
	});
});

test('properly rounds milliseconds with secondsDecimalDigits', t => {
	const fn = milliseconds =>
		prettyMilliseconds(milliseconds, {
			verbose: true,
			secondsDecimalDigits: 0
		});
	t.is(fn(179700), '3 minutes');
	t.is(fn((365 * 24 * 3600 * 1e3) - 1), '1 year');
	t.is(fn((24 * 3600 * 1e3) - 1), '1 day');
	t.is(fn((3600 * 1e3) - 1), '1 hour');
	t.is(fn((2 * 3600 * 1e3) - 1), '2 hours');
});
