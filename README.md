# Тестовое задание в Озон Банк

## Задача

Разработать прототип блока Progress для использования в мобильных web-приложениях. Основное предназначение блока отображать процесс выполнения процессов и их прогресс выполнения.

## Реализация

- Решение задеплоено на GitHub Pages по адресу: https://evilsepxd.github.io/progress-loader/
- Основной блок реализован с использованием технологии веб-компонентов, что позволяет легко его переиспользовать, а также инкапсулировать внутренние стили и свойства.
- В приложении реализованы кнопки и поля ввода для взаимодействия с компонентом.
- Приложение адаптируется под разные размеры экрана в зависимости от ориентации (landscape, portrait).

## API компонента

С API компонента можно взаимодействовать через атрибуты HTML-тега или через поля класса.

- `value: number` - значение прогресса от 0 до 100. Определяет длину закрашенной дуги.
- `animate: boolean` - если `true`, то компонент вращается по часовой стрелке.
- `hide: boolean` - если `true`, то компонент скрыт со страницы.