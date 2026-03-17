# FSD Layers

This project uses Feature-Sliced Design layers.

- `app` - Next.js route and providers layer.
- `pages-layer` - FSD `pages` layer (named this way to avoid collision with Next.js `src/pages` routing).
- `widgets` - large UI blocks for pages.
- `features` - user actions and scenarios.
- `entities` - business entities.
- `shared` - reusable UI, config, libs, and utilities.

## Import Direction

Higher layers can depend only on lower layers:

`app -> pages -> widgets -> features -> entities -> shared`

## Path Aliases

Use layer aliases from `tsconfig.json`:

- `@/app/*`
- `@/pages/*`
- `@/widgets/*`
- `@/features/*`
- `@/entities/*`
- `@/shared/*`
