<h1 align="center">Welcome to prisma-uml 👋</h1>

> A CLI to transform a Prisma schema to a PlantUML Entity RelationShip Diagram

[![npm](https://img.shields.io/npm/v/prisma-uml.svg?style=for-the-badge)](https://www.npmjs.com/package/prisma-uml) [![npm](https://img.shields.io/npm/dy/prisma-uml.svg?style=for-the-badge)](https://npm-stat.com/charts.html?package=prisma-uml) [![CircleCI (all branches)](https://img.shields.io/circleci/project/github/emyann/prisma-plantuml/master.svg?style=for-the-badge)](https://circleci.com/gh/emyann/prisma-plantuml)

- [Installation](#installation)
- [Commands](#commands)
  - [`prisma-uml <path> [options]`](#prisma-uml-path-options)
- [Demo](#demo)
- [Incoming changes](#incoming-changes)
- [Authors](#authors)
- [Show your support](#show-your-support)

## Installation

**Using `npx`**

If you don't want to install the CLI but just execute it, you can use it through `npx` this way

```sh
npx prisma-uml --help
```

**Install with `npm`**

You can also install the CLI globally

```sh
npm i -g prisma-uml
prisma-uml --help
```

## Commands

### `prisma-uml <path> [options]`

> **Generate a plantUML from a Prisma schema**

```sh
prisma-uml <path> [--output]
```

**Argument**

| Name     | Description            |
| -------- | ---------------------- |
| **path** | Path to Prisma schema. |

**Options**

| Name         | Alias | Description | default |
| ------------ | ----- | ----------- | ------- |
| **--output** | -o    | text        | text    |

<details><summary><strong>Examples</strong></summary>
<p>

```sh
# Output a plantUML Entity Relation Diagram as text
prisma-uml ./schema.prisma
```

</p>
</details>

## Demo

[![asciicast](https://asciinema.org/a/322572.svg)](https://asciinema.org/a/322572)

## Incoming changes

- [ ] Allow to output UML as PNG, JPEG, SVG, WSD...
- [ ] Split fields into entity (scalar, enum, navigation fields / external type).
- [ ] Group relations by entities.
- [ ] NextJs Preview that run the CLI on server to render a prisma schema to a plantUML ERD ?
- [ ] Put `@prisma/sdk` as PeerDependencies (support starts a beta-2)

## Authors

👤 **Brendan Stromberger**

- Github: [@bstro](https://github.com/bstro)

👤 **Yann Renaudin**

- Github: [@emyann](https://github.com/emyann)

## Show your support

Give a ⭐️ if this project helped you!
