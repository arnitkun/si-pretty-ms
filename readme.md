# si-pretty-ms:  [https://github.com/sindresorhus/pretty-ms],
##  Fork of pretty-ms returns the time string as per the SI standard.

> Convert milliseconds to a human readable string: `1337000000` → `15d 11h 23m 20s`

## Install

```
$ npm install si-pretty-ms
```


## Usage

```js
const prettyMilliseconds = require('si-pretty-ms');

prettyMilliseconds(1337000000);
//=> '15 d 11 h 23 m 20 s'

prettyMilliseconds(1337);
//=> '1.3 s'

prettyMilliseconds(133);
//=> '133 ms'

// `compact` option
prettyMilliseconds(1337, {compact: true});
//=> '~1 s'

// `verbose` option
prettyMilliseconds(1335669000, {verbose: true});
//=> '15 days 11 hours 1 minute 9 seconds'

// `formatSubMilliseconds` option
prettyMilliseconds(100.400080, {formatSubMilliseconds: true})
//=> '100 ms 400 µs 80 ns'

// Can be useful for time durations
prettyMilliseconds(new Date(2014, 0, 1, 10, 40) - new Date(2014, 0, 1, 10, 5))
//=> '35m'
```


## API

### prettyMilliseconds(milliseconds, [options])

#### milliseconds

Type: `number`

Milliseconds to humanize.

#### options

Type: `object`

##### secondsDecimalDigits

Type: `number`<br>
Default: `1`

Number of digits to appear after the seconds decimal point.

##### millisecondsDecimalDigits

Type: `number`<br>
Default: `0`

Number of digits to appear after the milliseconds decimal point.

Useful in combination with [`process.hrtime()`](https://nodejs.org/api/process.html#process_process_hrtime).

##### keepDecimalsOnWholeSeconds

Type: `boolean`<br>
Default: `false`

Keep milliseconds on whole seconds: `13 s` → `13.0 s`.

Useful when you are showing a number of seconds spent on an operation and don't want the width of the output to change when hitting a whole number.

##### compact

Type: `boolean`<br>
Default: `false`

Only show the first unit: `1h 10m` → `~1h`.

Also ensures that `millisecondsDecimalDigits` and `secondsDecimalDigits` are both set to `0`.

##### unitCount

Type: `number`<br>
Default: `Infinity`

Number of units to show. Setting `compact` to `true` overrides this option.

##### verbose

Type: `boolean`<br>
Default: `false`

Use full-length units: `5h 1m 45s` → `5 hours 1 minute 45 seconds`

##### separateMilliseconds

Type: `boolean`<br>
Default: `false`

Show milliseconds separately. This means they won't be included in the decimal part of the seconds.

##### formatSubMilliseconds

Type: `boolean`<br>
Default: `false`

Show microseconds and nanoseconds.


## Related

- [si-pretty-ms-cli](https://github.com/sindresorhus/si-pretty-ms-cli) - CLI for this module
- [parse-ms](https://github.com/sindresorhus/parse-ms) - Parse milliseconds into an object
- [to-milliseconds](https://github.com/sindresorhus/to-milliseconds) - Convert an object of time properties to milliseconds


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
