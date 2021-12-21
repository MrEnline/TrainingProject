'use strict'

document.addEventListener('DOMContentLoaded', () => {
        /* Задания на урок:

    1) Удалить все рекламные блоки со страницы (правая часть сайта)

    2) Изменить жанр фильма, поменять "комедия" на "драма"

    3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
    Реализовать только при помощи JS

    4) Список фильмов на странице сформировать на основании данных из этого JS файла.
    Отсортировать их по алфавиту 

    5) Добавить нумерацию выведенных фильмов */

    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };

    //1
    //const deleteAdv = document.querySelector(".promo__adv");
    //deleteAdv.remove();
    const listPromo = document.querySelectorAll(".promo__adv img");
    console.log(listPromo);
    listPromo.forEach(item => {
        item.remove();
    })


    //2
    const promoBG = document.querySelector('.promo__bg'),
        changeGenre = promoBG.querySelector(".promo__genre");

    changeGenre.textContent = "ДРАМА";

    //3
    promoBG.style.backgroundImage = 'url("img/bg.jpg")';

    //console.log(promoBG.innerHTML);

    //4
    movieDB.movies.sort();
    const promoInt = document.querySelector(".promo__interactive-list"),
        promoIntList = promoInt.querySelectorAll(".promo__interactive-item");

    //1-й вариант
    // promoIntList.forEach((item, index) => {
    //     item.textContent = `${index + 1}. ` + movieDB.movies[index];
    // });

        //console.log(promoIntList);

    //2-й вариант
    promoInt.innerHTML = "";
    movieDB.movies.forEach((film, index) => {
        promoInt.innerHTML += `
        <li class="promo__interactive-item">${index + 1}. ${film}
            <div class="delete"></div>
        </li>
        `;
    });


    /* Задания на урок:

    1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
    новый фильм добавляется в список. Страница не должна перезагружаться.
    Новый фильм должен добавляться в movieDB.movies.
    Для получения доступа к значению input - обращаемся к нему как input.value;
    P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

    2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

    3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

    4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
    "Добавляем любимый фильм"

    5) Фильмы должны быть отсортированы по алфавиту */

    // мой вариант
    // let inputElement = document.querySelector('.adding__input');
    // let nameFilm = '';
    // inputElement.oninput = (e) => {
    //     nameFilm = e.target.value;
    // };

    // const addFilmsInDB = function (e) {
    //     if (movieDB.movies.includes(nameFilm) || nameFilm.length == 0) {
    //         alert('Такой фильм уже есть в вашем списке');
    //         return;
    //     }
    //     if (nameFilm.length > 21)
    //         nameFilm = nameFilm.slice(0,20) + "...";
    //     movieDB.movies.push(nameFilm);
    //     console.log(movieDB.movies);
    //     promoInt.innerHTML = "";
    //     movieDB.movies.forEach((film, index) => {
    //         promoInt.innerHTML += `
    //         <li class="promo__interactive-item">${index + 1}. ${film}
    //             <div class="delete"></div>
    //         </li>
    //         `;
    //     });
    //     e.preventDefault();
    // }

    // const btn = document.querySelector('.add button');
    // btn.addEventListener('click', addFilmsInDB);

    // чужой вариант
    const addForm = document.querySelector('form.add');
    const addInput = addForm.querySelector('.adding__input');
    const addChechbox = addForm.querySelector('[type = "checkbox"]');
    const addButton = addForm.querySelector('button');

    addForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const newFilm = addInput.value;
        const favouriteFilm = addChechbox.checked;
        if (containsFilm(newFilm, movieDB.movies))
            return;
        movieDB.movies.push(newFilm);
        sortArray(movieDB.movies);
        createMovieList(movieDB.movies, promoInt);
        if (favouriteFilm)
            console.log("Добавили Ваш любимый фильм");
        
        event.target.reset();
    })

    const sortArray = function(array) {
        return array.sort();
    }

    const createMovieList = function(films, parent) {
        parent.innerHTML = "";
        films.forEach((film, index) => {
            parent.innerHTML += `
            <li class="promo__interactive-item">${index + 1}. ${film}
                <div class="delete"></div>
            </li>
            `;
        });
    }    


    const containsFilm = (film, array) => {
        if (array.includes(film) || film.length == 0) {
            alert('Такой фильм уже есть в вашем списке');
                return true;
        }
        return false;
    } 


    const deleteList = document.querySelectorAll('.delete');
    console.log(deleteList);

    const indexRemove = -1;

    const deleteFilm = function(arr) {
        arr.forEach(item => {
            item.remove();
        })
    }

})


