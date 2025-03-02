Задание №1.

Описание проекта mesto.

Для реализации разбивки проекта на микрофронтенды выбран подход Webpack Module Federation, 
т.к. в рамках данного проекта не предполагается использование различных фреймворков, 
однако возможно понадобится использовать различные версии библиотек в разных микрофронтендах.

Проект разбит на 4 микрофронтенда+хост. 
1. auth-microfrontend - это модуль аутентификации/авторизации.
2. common-microfrontend - общий для всех, в него вынесены компоненты, которые используются другими модулями.
3. profile-microfrontend - профиль пользователя и аватар.
4. places-microfrontend - профиль картинок, и всё что с ними связано.
5. microfrontend - хост.

Компоненты:
1. auth. Участвует только в событиях авторизации, регистрации, проверки токена и выхода из системы. Не зависит от других частей приложения.
- Header - этот компонент содержит ссылку для выхода из системы, а также email пользователя
- Login - основной компонент авторизации
- Register - регистрация нового пользователя
- InfoTooltip - всплывающее сообщение, напрямую связанное с процессом успешного или нет входа в систему.
Для доступа к АПИ используется утилита auth.js
Адрес: http://localhost:8081, запуск: npm run start из директории frontend/auth-microfrontend.

2. common. Вспомогательные общие компоненты, не участвующие самостоятельно ни в какой деятельности.
- Footer - одинаков для всех, не содержит никакого динамического контента.
- PopupWithForm - общий компонент для модулей profile, places и хостового модуля.
Адрес: http://localhost:8084, запуск: npm run start из директории frontend/common-microfrontend.

3. profile. Всё, что связано с профилем.
- Profile - компонент отображения информации о профиле пользователя (аватар, имя, профессия), кнопки редактирования аватара и профиля.
- EditAvatarPopup - компонент редактирования аватара. Использует PopupWithForm из common-microfrontend
- EditProfilePopup - компонент редактирования профиля. Использует PopupWithForm из common-microfrontend
Имеет зависимость от common-microfrontend (описана в remotes).
Для доступа к АПИ используется утилита api.js с соответствующими методами для получения данных и редактирования
Адрес: http://localhost:8082, запуск: npm run start из директории frontend/profile-microfrontend.

4. places. Загруженные картинки и всё, что с ними связано.
- Places - основной компонент, размещает загруженные объекты "мест".
- Card - компонент картинки, включая отображение на ней лайков и кнопки delete
- AddPlacePopup - компонент добавления "места". Использует PopupWithForm из common-microfrontend
- ImagePopup. Компонент просмотра (увеличения) картинки.
Имеет зависимость от common-microfrontend (описана в remotes).
Для доступа к АПИ используется утилита api.js с соответствующими методами для получения "мест", добавления, удаления, обработки лайков.
Адрес: http://localhost:8083, запуск: npm run start из директории frontend/places-microfrontend.

5. Хост.
- App - основной компонент приложения
- Main - компонент размещения контента, объединяющий в себе данные профиля и "мест" из микрофронтендов profile и places соответственно.
Объединяет в себе зависимости от auth, common, profile, places (описана в remotes).
Адрес: http://localhost:8080, запуск: npm run start из директории frontend/microfrontend.

Реализованы все 3 уровня решения, проект успешно запускается, отличий в функционале от исходного проекта не обнаружено.



Задание №2.

Ссылка на файл draw.io: https://disk.yandex.ru/d/QFvVvORrGo5ZLw