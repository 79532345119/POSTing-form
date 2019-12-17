// Form sender Отправка формы на сайт
// message for user / сообщения для пользователя    
let message = {                     
        loading: 'Загрузка...',
        success: 'Спасибо! Мы с Вами свяжемся',
        failure: 'Что-то пошло не так...'
    };
    
    let form = document.querySelector('.main-form'), // pick up form from html page / получаем форму с html странички
        input = form.getElementsByTagName('input'), 
        statusMessage = document.createElement('div'); // create div for message from user / создаем div, куда будем выводить сообщение для пользователя

        statusMessage.classList.add('status');

        form.addEventListener('submit', function (event) { // вешаем обработчик событий на форму
        event.preventDefault();                            // запрещаем стандартное поведение браузера (перезагрузку страницы после нажатия кнопки)
        form.appendChild(statusMessage);

        // create request / создаем запрос
        let request = new XMLHttpRequest(); 
        request.open('POST', 'server.php');
        //request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); раскомментировать ,если нужна отправка формы, а не json
        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8'); // закомментировать, если нужна отправка формы
        // create data for POSTing / формируем данные для POST запроса
        let formData = new FormData(form);

        let obj = {};                               //превращаем объект formData в обычный объект
        formData.forEach(function (value, key) {
            obj[key] = value;
        });
        let json = JSON.stringify(obj); // превратили обычный объект в JSON

        // request.send(formData); раскомментировать ,если нужна отправка formData
        request.send(json); // закомментировать ,если нужна отправка formData

        request.addEventListener('readystatechange', function () { // вешаем обработчик событий на ожидание ответа сервера
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if (request.readyState === 4 && request.status == 200) {
                statusMessage.innerHTML = message.success;
            } else {
                statusMessage.innerHTML = message.failure;
            }
        });
            for (let i = 0; i < input.length; i++) { // очищаем окошко input после отправки формы
            input[i].value = "";
        }
    });