# Vue Accounts Manager

Форма управления учетными записями с валидацией и персистентностью.

## Функциональность

- Добавление/удаление учетных записей
- Валидация полей (логин, пароль, метки)
- Парсинг меток в массив объектов
- Уникальность логинов
- Временное состояние (изменения не сохраняются до подтверждения)
- Персистентность данных в localStorage

## Технологии

- **Vue.js 3** + Composition API
- **TypeScript**
- **Pinia** (state management)
- **Vuetify** (UI framework)
- **Yup** (валидация)
- **Vite** (сборка)

## Установка и запуск

```bash
# Установка зависимостей
npm install

# Разработка
npm run dev

# Сборка для продакшена
npm run build
```

## Структура проекта

```
src/
├── components/     # Vue компоненты
│   ├── AccountForm.vue
│   ├── AccountRow.vue
│   ├── ValidatedInput.vue
│   └── ...
├── stores/         # Pinia stores
│   └── accounts.ts
├── types/          # TypeScript типы
└── main.ts         # Точка входа
```