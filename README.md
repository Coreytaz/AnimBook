# AnimBook 🔥

## 🛠 Технологии:

- **NextJS 16.4.2**
- **TypeScript**
- **Redux Toolkit** (хранение данных)
- **NextJS Router app** (навигация)
- **Axios** (отправка запроса на бэкенд)
- **RTC-Queary** (Cинхронизация данных)
- **React Hooks** (хуки)
- **Next-auth** (авторизация)
- CSS-Modules / SCSS / clsx / HeroUI 3(стилизация)
- React Content Loader (скелетон)

## Запуск Frontend: 👀

 ```shell
pnpm install
pnpm dev

```


## Менеджер пакетов

Node.js >=24.15.0 <25, pnpm 12.14.0. Версия pnpm закреплена в `package.json`.
Если pnpm ещё не установлен, активируйте его через `corepack enable pnpm`.

Зависимости фиксируются в `pnpm-lock.yaml`. Для воспроизводимой установки, в том числе в CI:

```sh
pnpm install --frozen-lockfile
```

Проверки: `pnpm typecheck`, `pnpm lint`, `pnpm build`.

## Vercel

`vercel.json` задаёт установку через `corepack pnpm install --frozen-lockfile`
и сборку через `corepack pnpm build`. Corepack использует версию pnpm из
`package.json`. Эти команды заменяют настройку `npm install --force` в Vercel.
