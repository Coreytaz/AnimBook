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

Node.js >=24.15.0, pnpm 12.14.0. Версия pnpm закреплена в `package.json`.
Если pnpm ещё не установлен, активируйте его через `corepack enable pnpm`.

Зависимости фиксируются в `pnpm-lock.yaml`. Для воспроизводимой установки, в том числе в CI:

```sh
pnpm install --frozen-lockfile
```

Проверки: `pnpm typecheck`, `pnpm lint`, `pnpm build`.
