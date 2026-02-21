# typekit

Typescript toolkit.

## How to use

### Installation

- npm

```sh
npm install ... // currently not published
```

- bun

```sh
bun add ... // currently not published
```

- pnpm

```sh
pnpm add ... // currently not published
```

- yarn

```sh
yarn add ... // currently not published
```

- deno

```sh
deno add ... // currently not published
```

### Basic usage

#### Result

```ts
import { Result } from "typekit/result";

const result = Result.ok<number, string>(1);
// ^ Result.Result<number, string>

if (Result.isOk(result)) {
  console.log(`result is ok: ${result.value}`); // "result is ok: 1"
} else {
  console.log(`result is err: ${result.error}`);
}

const mapped = result.pipe(
  Result.map((value) => value * 3),
  Result.map((value) => value + 2),
);

if (Result.isOk(mapped)) {
  console.log(`mapped is ok: ${mapped.value}`); // "mapped is ok: 5"
} else {
  console.log(`mapped is err: ${mapped.error}`);
}
```

## Development

### Requirements

[bun](https://bun.sh/) is used for package management and testing in this library. Other package managers(npm, yarn, pnpm) are not supported.

Check out installation guide for bun in their [website](https://bun.com/docs/installation).

### Project setup

- Install dependencies:

```bash
bun install
```

- Run the unit tests:

```bash
bun run test
```

- Build the library:

```bash
bun run build
```

- Watch in dev mode

```bash
bun run dev
```
