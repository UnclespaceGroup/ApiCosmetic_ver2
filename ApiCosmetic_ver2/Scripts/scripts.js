﻿
$(document).ready(() => {
    console.log(sessionStorage);
    $('#submit').click(function (e) {
        e.preventDefault();
        var data = {
            Email: $('#email').val(),
            Password: $('#password').val(),
            ConfirmPassword: $('#confirmpassword').val()
        };

        $.ajax({
            type: 'POST',
            url: '/api/Account/Register',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            success: function (data) {
                alert("Регистрация пройдена");
            },
            error: function (data) {
                alert("В процесе регистрации возникла ошибка");
            }
        });
    });
    var tokenKey = "tokenInfo";
    $('#submitLogin').click(function (e) {
        e.preventDefault();
        var loginData = {
            grant_type: 'password',
            username: $('#emailLogin').val(),
            password: $('#passwordLogin').val()
        };

        $.ajax({
            type: 'POST',
            url: '/Token',
            data: loginData,
            success: function (data) {
                //$('.userName').text(data.userName);
                $('.userInfo').css('display', 'block');
                $('.loginForm').css('display', 'none');
                // сохраняем в хранилище sessionStorage токен доступа
                sessionStorage.setItem(tokenKey, data.access_token);
                console.log(sessionStorage);
                console.log(data.access_token);
            },
            error: function (data) {
                alert('При логине возникла ошибка');
            }
        });
    });

    $('#logOut').click(function (e) {
        e.preventDefault();
        // sessionStorage.removeItem(tokenKey);
        $.ajax({
            type: 'POST',
            url: 'api/Account/Logout',
            beforeSend: (xhr) => {
                let token = sessionStorage.getItem(tokenKey);
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: () => {
                sessionStorage.removeItem(tokenKey);
                alert('Вы вышли');
            },
            error: (e) => {
                console.log(e);
                alert('Не удалось');
            }
        });
    });

    //$('#iso').on('click', function (e) {
    //    e.preventDefault();
    //    var files = document.getElementById('uploadFile').files;
    //    if (files.length > 0) {
    //        if (window.FormData !== undefined) {
    //            var data = new FormData();
    //            for (var x = 0; x < files.length; x++) {
    //                data.append("file" + x, files[x]);
    //            }
    //            $.ajax({
    //                type: "POST",
    //                url: '/api/image',
    //                contentType: false,
    //                processData: false,
    //                data: data,
    //                success: function (result) {
    //                    console.log(result);
    //                    alert(result);
    //                },
    //                error: function (xhr, status, p3) {
    //                    console.log(xhr);
    //                    alert(xhr.responseText);
    //                }
    //            });
    //        } else {
    //            alert("Браузер не поддерживает загрузку файлов HTML5!");
    //        }
    //    }
    //});

    // Изменить запрос
    let changeId;
    $('.modifide').click(function () {
        changeId = $(this).data('id');
        $('#current-title').val($('.title_' + changeId).text());
        $('#current-text').val($('.text_' + changeId).text());
    });
    $('.modifide_send').click(function () {
        const url = '/api/review/' + changeId;
        const data = {
            title: $('#current-title').val(),
            text: $('#current-text').val(),
            countryId: $('select#current-country').val(),
            brandId: $('select#current-brand').val()
        };
        console.log(data);
        $.ajax({
            type: 'PUT',
            url: url,
            data: data,
            dataType: 'json',
            success: (data) => {
                alert('Изменено');
                // location.reload();
            },
            error: (e) => {
                console.log(e);
                alert('Не удалось');
            }
        });
    });

    // Сделать активным
    $('.setActive').click(function () {
        const id = $(this).data('id');
        const active = $('#active_' + id).val();
        const url = '/api/review/' + id;
        $.ajax({
            type: 'PUT',
            url: url,
            data: {

            },
            dataType: 'json',
            success: (data) => {
                alert('Изменено');
                location.reload();
            },
            error: (e) => {
                console.log(e);
                alert('Не удалось');
            }
        });
    });

    // Добавить страну
    $('#addCountry').click(function () {
        const url = '/api/country';
        const country = $('#country').val();
        console.log('df');
        $('#country').val('');
        $.ajax({
            type: 'POST',
            url: url,
            beforeSend: (xhr) => {
                let token = sessionStorage.getItem(tokenKey);
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            data: {
                Name: country
            },
            dataType: 'json',
            success: (data) => {
                console.log(data);
                alert('Данные успешно добавлены');
                location.reload();
            },
            error: (e) => {
                console.log(e);
                alert('Произошла ошибка. Обратитесь к администратору');
            }
        });
    });

    // Удалить страну
    $('.deleteCountry').click(function () {
        let a = confirm('Лучше не удаляй. Измени что нибудь. Все связанные с ним отзывы утеряются');
        if (a) {
            const url = '/api/country';
            const id = $(this).data('id');
            $.ajax({
                type: 'DELETE',
                url: url + '/' + id,
                success: () => {
                    alert('Удалено');
                    location.reload();
                },
                error: (e) => {
                    alert('Ошибка');
                    console.log(e);
                }
            });
        }
    });
    // Изменить Страну
    let changeCountryId;
    $('.changeCountry').click(function () {
        changeCountryId = $(this).data('id');
    });
    $('.countryModal_send').click(function () {
        const url = '/api/country/' + changeCountryId;
        $.ajax({
            type: 'PUT',
            url: url,
            beforeSend: (xhr) => {
                let token = sessionStorage.getItem(tokenKey);
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            data: {
                Name: $('#country-name').val()
            },
            dataType: 'json',
            success: (data) => {
                alert('Успешно Изменено');
                location.reload();
            },
            error: (e) => {
                console.log(e);
                alert('Не удалось');
            }
        });
    });

    // Добавить бренд
    $('#addBrand').click(function () {
        const url = '/api/brand';
        const brand = $('#brand').val();
        const country = $('#brand-country').val();
        $('#brand').val('');
        $.ajax({
            type: 'POST',
            url: url,
            beforeSend: (xhr) => {
                let token = sessionStorage.getItem(tokenKey);
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            data: {
                Name: brand,
                CountryId: country
            },
            dataType: 'json',
            success: (data) => {
                console.log(data);
                alert('Данные успешно добавлены');
                location.reload();
            },
            error: (e) => {
                console.log(e);
                alert('Произошла ошибка. Обратитесь к администратору');
            }
        });
    });

    // Удалить бренд
    $('.deleteBrand').click(function () {
        let a = confirm('Лучше не удаляй. Измени что нибудь. Все связанные с ним отзывы утеряются');
        if (a) {
            const url = '/api/brand';
            const id = $(this).data('id');
            $.ajax({
                type: 'DELETE',
                url: url + '/' + id,
                success: () => {
                    alert('Удалено');
                    location.reload();
                },
                error: (e) => {
                    alert('Ошибка');
                    console.log(e);
                }
            });
        }
    });

    // Изменить Бренд
    let changeBrandId;
    $('.changeBrand').click(function () {
        changeBrandId = $(this).data('id');
    });
    $('.brandModal_send').click(function () {
        const url = '/api/brand/' + changeBrandId;
        let a = $('select#brand-country').val();
        $.ajax({
            type: 'PUT',
            url: url,
            data: {
                Name: $('#brand-name').val(),
                CountryId: 2
            },
            beforeSend: (xhr) => {
                let token = sessionStorage.getItem(tokenKey);
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            dataType: 'json',
            success: (data) => {
                console.log(data);
                alert('Успешно Изменено');
                location.reload();
            },
            error: (e) => {
                console.log(e);
                alert('Не удалось');
            }
        });
    });
});
