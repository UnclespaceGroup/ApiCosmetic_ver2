
$(document).ready(() => {

    // Вход и авторизация
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
                location.reload();
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
                location.reload();
            },
            error: function (data) {
                alert('При логине возникла ошибка');
            }
        });
    });

    // Выход
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
                location.reload();
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
        $('#current-tags').val($('.tags_' + changeId).text());
        $('#current-im1').attr('src', '/Images/' + $('.image1_' + changeId).text());
        $('#current-im2').attr('src', '/Images/' + $('.image2_' + changeId).text());
        $('#current-im3').attr('src', '/Images/' + $('.image3_' + changeId).text());
    });
    $('.modifide_send').click(function () {
        const url = '/api/review/' + changeId;
        const data = {
            title: $('#current-title').val(),
            text: $('#current-text').val(),
            countryId: $('select#current-country').val(),
            brandId: $('select#current-brand').val(),
            tags: $('#current-tags').val(),
            UserId: '-1',
            image: ($('#current-im1').attr('class') === 'image-send image_enable') ? $('#current-im1').val() : 'none',
            image2: ($('#current-im2').attr('class') === 'image-send image_enable') ? $('#current-im2').val() : 'none',
            image3: ($('#current-im3').attr('class') === 'image-send image_enable') ? $('#current-im3').val() : 'none'
        };
        console.log(data);
        $.ajax({
            type: 'PUT',
            url: url,
            data: data,
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
    $('.image-send').click(function () {
        let a = $(this).attr('class');
        let cur = (a === 'image-send image_enable') ? 'image-send image_deleted' : 'image-send image_enable';
        $(this).attr('class', cur);
    });

    // Сделать активным
    $('.setActive').click(function () {
        const id = $(this).data('id');
        // const active = $('#active_' + id).val();
        const url = '/api/review/' + id;
        $.ajax({
            type: 'PUT',
            url: url,
            data: {
                active: true,
                UserId: '-1',
                BrandId: '-1',
                CountryId: '-1'
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
    // Удалить
    $('.delete').click(function () {
        const id = $(this).data('id');
        const url = '/api/review/' + id;

        const yes = confirm('Удалить???????');

        if (!yes) return;

        $.ajax({
            type: 'DELETE',
            url: url,
            data: {

            },
            beforeSend: (xhr) => {
                let token = sessionStorage.getItem(tokenKey);
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            dataType: 'json',
            success: (data) => {
                alert('Удалено');
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
    //$('.deleteCountry').click(function () {
    //    let a = confirm('Лучше не удаляй. Измени что нибудь. Все связанные с ним отзывы утеряются');
    //    if (0) {
    //        const url = '/api/country';
    //        const id = $(this).data('id');
    //        $.ajax({
    //            type: 'DELETE',
    //            url: url + '/' + id,
    //            success: () => {
    //                alert('Удалено');
    //                location.reload();
    //            },
    //            error: (e) => {
    //                alert('Ошибка');
    //                console.log(e);
    //            }
    //        });
    //    }
    //});
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
    //$('.deleteBrand').click(function () {
    //    let a = confirm('Лучше не удаляй. Измени что нибудь. Все связанные с ним отзывы утеряются');
    //    if (a) {
    //        const url = '/api/brand';
    //        const id = $(this).data('id');
    //        $.ajax({
    //            type: 'DELETE',
    //            url: url + '/' + id,
    //            success: () => {
    //                alert('Удалено');
    //                location.reload();
    //            },
    //            error: (e) => {
    //                alert('Ошибка');
    //                console.log(e);
    //            }
    //        });
    //    }
    //});

    // Изменить Бренд
    let changeBrandId;
    $('.changeBrand').click(function () {
        changeBrandId = $(this).data('id');
    });
    $('.brandModal_send').click(function () {
        const url = '/api/brand/' + changeBrandId;

        let fileName = downloadFile('brand-file');
        console.log(fileName);
        $.ajax({
            type: 'PUT',
            url: url,
            data: {
                Name: $('#brand-name').val(),
                CountryId: $('select#brand-country').val(),
                Image: fileName
            },
            beforeSend: (xhr) => {
                let token = sessionStorage.getItem(tokenKey);
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            dataType: 'json',
            success: (data) => {
                alert('Успешно Изменено');
                downloadFile('brand-file');
                // location.reload();
            },
            error: (e) => {
                console.log(e);
                alert('Не удалось');
            }
        });
    });
    downloadFile = (id) => {
        // var files = document.getElementById('uploadFile').files;
        var files = document.getElementById(id).files;
        let fileName;
        if (files.length > 0) {
            if (window.FormData !== undefined) {
                var data = new FormData();
                for (var x = 0; x < 1; x++) {
                    data.append("file" + x, files[x]);
                    fileName = files[x].name;
                }
                $.ajax({
                    type: "POST",
                    url: '/api/image',
                    contentType: false,
                    processData: false,
                    data: data,
                    success: function (result) {
                        alert(result);
                    },
                    error: function (xhr, status, p3) {
                        console.log(xhr);
                        alert(xhr.responseText);
                        fileName = null;
                    }
                });
            } else {
                alert("Браузер не поддерживает загрузку файлов HTML5!");
            }
        }
        return fileName;
    };

    $('.delete-comment').click(function () {
        let a = confirm('Удалить?');
        if (a) {
            const url = '/api/comment';
            const id = $(this).data('id');
            console.log(id);
            $.ajax({
                type: 'DELETE',
                url: url + '/' + id,
                beforeSend: (xhr) => {
                    let token = sessionStorage.getItem(tokenKey);
                    xhr.setRequestHeader("Authorization", "Bearer " + token);
                },
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
});
