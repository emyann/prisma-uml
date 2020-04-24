<h1 align="center">Welcome to prisma-uml 👋</h1>

> A CLI to transform a Prisma schema to a PlantUML Entity RelationShip Diagram

[![npm](https://img.shields.io/npm/v/prisma-uml.svg?style=for-the-badge)](https://www.npmjs.com/package/prisma-uml) [![npm](https://img.shields.io/npm/dy/prisma-uml.svg?style=for-the-badge)](https://npm-stat.com/charts.html?package=prisma-uml) [![CircleCI (all branches)](https://img.shields.io/circleci/project/github/emyann/prisma-uml/master.svg?style=for-the-badge)](https://circleci.com/gh/emyann/prisma-uml)

- [Installation](#installation)
- [Commands](#commands)
  - [`prisma-uml <path> [options]`](#prisma-uml-path-options)
- [Image Rendering](#image-rendering)
  - [Using the official PlantUML server online](#using-the-official-plantuml-server-online)
  - [Using a local server with Docker](#using-a-local-server-with-docker)
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
prisma-uml <path> [--output] [--server] [--file]
```

**Argument**

| Name     | Description            |
| -------- | ---------------------- |
| **path** | Path to Prisma schema. |

**Options**

| Name         | Alias | Description                          | Type / Choices                       | Default                           |
| ------------ | ----- | ------------------------------------ | ------------------------------------ | --------------------------------- |
| **--output** | -o    | Output of the diagram                | string / [text \| svg \| png \| jpg] | text                              |
| **--server** | -s    | PlantUML Server URL                  | string                               | https://www.plantuml.com/plantuml |
| **--file**   | -f    | Filename or File full path to output | string                               |                                   |

<details><summary><strong>Examples</strong></summary>
<p>

```sh
# Output a plantUML Entity Relation Diagram as text
prisma-uml ./schema.prisma

# Save the diagram into a .plantuml file
prisma-uml ./schema.prisma > my-erd.plantuml

# Output a diagram as SVG
prisma-uml ./schema.prisma --output svg --file my-erd.svg

# Output a diagram as PNG
prisma-uml ./schema.prisma -o png -f my-erd.png

#  Use a plantUML custom server to render the image
prisma-uml ./schema.prisma --server http://localhost:8080
```

</p>
</details>

## Image Rendering

### Using the official PlantUML server online

PlantUML usually requires to have Java installed or a server to render the images. By default the official online server (https://www.plantuml.com/plantuml) is used to render the images. The plantUML diagram is first compressed then encoded ([plantUML encoding](https://plantuml.com/fr/code-javascript-synchronous)) and finally sent to the server to execute the rendering.

### Using a local server with Docker

You might want to avoid sending your diagram over the wire for some reason, `prisma-uml` allows you to specify a custom/local server. You could easily run your own local server using Docker:

```sh
docker run -d -p 8080:8080 plantuml/plantuml-server:jetty
```

You server is now available (depending of you Docker installation) at `http://localhost:8080`. You can then use `prisma-uml` as follow:

```sh
prisma-uml ./schema.prisma --server http://localhost:8080
```

## Demo

[![asciicast](https://asciinema.org/a/322572.svg)](https://asciinema.org/a/322572)

## Incoming changes

- [ ] Feat: Split attributes by entity (scalar, enum, navigation fields / external type).
- [ ] Feat: Group relations by entities.
- [ ] Feat: NextJs Preview that run the CLI on server to render a prisma schema to a plantUML ERD ?
- [ ] Feat: Display Version Number
- [ ] Feat: Handle `-o text -f my-erd.puml|.wsd|.plantuml...`
- [ ] Fix: Allow several field navigation toward the same entity (Discriminate ID generation)
- [ ] Fix: Left side / Start leaf have wrong order on `o|`
- [ ] Remove `--output` in favor of extension handling (.svg, .png, .jpg, .puml...) (?)

## Authors

👤 **Brendan Stromberger**

- Github: [@bstro](https://github.com/bstro)

👤 **Yann Renaudin**

- Github: [@emyann](https://github.com/emyann)

## Show your support

Give a ⭐️ if this project helped you!
