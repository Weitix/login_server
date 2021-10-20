const express = require("express");
const router = express.Router();

// mongodb user model
const User = require("./../models/User");

// Обработчик паролей
const bcrypt = require("bcrypt");

// Signup
router.post("/signup", (req, res) => {
  let {name, email, password, dateOfBirth } = req.body;
  name = name.trim();
  email = email.trim();
  password = password.trim();
  dateOfBirth = dateOfBirth.trim();

  if (name == "" || email == "" || password == "" || dateOfBirth == "") {
    res.json({
      status: "Ошибка",
      message: "Пустые поля ввода!",
    });
  } else if (!/^[a-zA-Z ]*$/.test(name)) {
    res.json({
      status: "Ошибка",
      message: "Введено неверное имя",
    });
  } else if (/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,4}$/.test(email)) {
    res.json({
      status: "Ошибка",
      message: "Введен неверный почтовый адрес",
    });
  } else if (!new Date(dateOfBirth).getTime()) {
    res.json({
      status: "Ошибка",
      message: "Введена неверная дата рождения",
    });
  } else if (password.length < 8) {
    res.json({
      status: "Ошибка",
      message: "Пароль слишком короткий!",
    });
  } else {
    // Проверка, существует ли уже пользователь
    User.find({ email })
      .then((result) => {
        if (result.length) {
          // Пользователь уже существует
          res.json({
            status: "Ошибка",
            message: "Пользователь с предоставленным электронным адресом уже существует",
          });
        } else {
          // Попробуйте создать нового пользователя

          // обработка паролей
          const saltRounds = 10;
          bcrypt
            .hash(password, saltRounds)
            .then((hashedPassword) => {
              const newUser = new User({
                name,
                email,
                password: hashedPassword,
                dateOfBirth,
              });

              newUser
                .save()
                .then((result) => {
                  res.json({
                    status: "Успех",
                    message: "Регистрация прошла успешно",
                    data: result,
                  });
                })
                .catch((err) => {
                  res.json({
                    status: "Ошибка",
                    message: "Произошла ошибка при сохранении учетной записи пользователя!",
                  });
                });
            })
            .catch((err) => {
              res.json({
                status: "Ошибка",
                message: "Произошла ошибка при хэшировании пароля!",
              });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.json({
          status: "Ошибка",
          message: "Произошла ошибка при проверке существующего пользователя!",
        });
      });
  }
});

// Signin
router.post("/signin", (req, res) => {
  let { email, password } = req.body;
  email = email.trim();
  password = password.trim();

  if (email == "" || password == "") {
    res.json({
      status: "Ошибка",
      message: "Предоставленные пустые учетные данные",
    });
  } else {
    // Проверьте, существует ли пользователь
    User.find({ email })
      .then((data) => {
        if (data.length) {
          // Пользователь существует

          const hashedPassword = data[0].password;
          bcrypt
            .compare(password, hashedPassword)
            .then((result) => {
              if (result) {
                // Совпадение пароля
                res.json({
                  status: "Успех",
                  message: "Регистрация прошла успешно",
                  data: data,
                });
              } else {
                res.json({
                  status: "Ошибка",
                  message: "Введен неверный пароль!",
                });
              }
            })
            .catch((err) => {
              res.json({
                status: "Ошибка",
                message: "При сравнении паролей произошла ошибка",
              });
            });
        } else {
          res.json({
            status: "Ошибка",
            message: "Введены неверные учетные данные!",
          });
        }
      })
      .catch((err) => {
        res.json({
          status: "Ошибка",
          message: "Произошла ошибка при проверке существующего пользователя",
        });
      });
  }
});

module.exports = router;
